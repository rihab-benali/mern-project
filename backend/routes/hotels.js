
import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getOneHotel,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js";
import { verifyAdmin} from "../utils/verifyToken.js";
import Hotel from "../models/Hotel.js";



const router = express.Router();

//create
router.post("/", verifyAdmin, createHotel);
//update
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);
//get single
router.get("/find/:id", getOneHotel);
//get all
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id",getHotelRooms);

export default router;