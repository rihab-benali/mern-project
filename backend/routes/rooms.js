import express from "express";
import {
  createRoom,
  deleteRoom,
  getOneRoom,
  getAllRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", createRoom);

//UPDATE

router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getOneRoom);
//GET ALL

router.get("/", getAllRooms);

export default router;
