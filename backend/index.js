import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true,  // Allow cookies if necessary
}));
app.use(express.json());  // Parse JSON request bodies
app.use(cookieParser());  // Parse cookies

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to database");
  } catch (error) {
    throw error; 
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });

//middlewares  

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
   
 });


app.listen(8800, () => {
    connect()
    console.log("Connected to backend");
});