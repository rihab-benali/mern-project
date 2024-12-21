import express from "express";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers/user.js";
import User from "../models/User.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*router.get("/checkauthentification", verifyToken, (req, res) => {
    res.send("hello user, you are logged in");
})

router.get("/checkuser/:id", verifyUser, (req, res) => {
    res.send("hello user, you are logged in and you can delete your account");
})

router.get("/checkAdmin/:id", verifyAdmin, (req, res) => {
    res.send("hello user, you are logged in and you can delete all accounts");
})*/

//update
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyAdmin, deleteUser);

//get single
router.get("/:id", verifyUser, getOneUser);

//get all
router.get("/", verifyAdmin, getAllUsers);

export default router;
