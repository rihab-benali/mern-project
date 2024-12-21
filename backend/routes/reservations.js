import express from "express";
import Reservations from "../models/Reservations.js";

const router = express.Router();

//GET ALL Reservations

router.get("/", async (req, res) => {
  try {
    const reservations = await Reservations.find();
    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

export default router;
