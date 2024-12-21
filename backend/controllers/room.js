import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Reservation from "../models/Reservations.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  const newRoom = new Room({
    title: req.body.title,
    description: req.body.desc,
    price: req.body.price,
    roomNumbers: [...req.body.roomNumbers],
    maxPeople: req.body.maxPeople,
  });

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  const user = req.headers["user"];

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const { dates, roomId, user } = req.body;

    const parsedUser = JSON.parse(user); // Parse the user string into an object
    console.log(roomId);
    // Update room availability
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": dates,
        },
      }
    );

    // Find the room and its associated hotel
    const room = await Room.findOne({ "roomNumbers._id": roomId });

    if (!room) return res.status(404).json({ message: "Room not found" });

    const hotel = await Hotel.findOne({ rooms: room._id });

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Calculate the number of nights and the total price
    const nights =
      (new Date(dates[dates.length - 1]) - new Date(dates[0])) /
      (1000 * 60 * 60 * 24); // Convert milliseconds to days
    const totalPrice = room.price * nights;

    // Create the reservation
    const newReservation = new Reservation({
      user: parsedUser.otherDetails._id,
      room: room._id,
      hotel: hotel._id,
      totalPrice,
      checkInDate: new Date(dates[0]),
      checkOutDate: new Date(dates[dates.length - 1]),
    });

    console.log("new reservation: ", newReservation);

    await newReservation.save();

    res.status(200).json({
      message: "Room status has been updated and reservation created.",
      reservation: newReservation,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
