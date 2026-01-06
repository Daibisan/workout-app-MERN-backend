import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import workoutsRoutes from "./routes/workouts.route.js";
import authRoutes from "./routes/auth.route.js";

// express app
const app = express();

// Define allowed origins
const corsOptions = {
  origin: ['http://localhost:5173'], // Only allow these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true // Allow cookies/credentials
};

// middleware
app.use(cors(corsOptions)); // cors
app.use(express.json()); // req.payload -> req.body
app.use((req, res, next) => { // console req method & path
    console.log(req.method, req.path);
    next();
});

// routes
app.use("/api/workouts", workoutsRoutes);
app.use("/api/auth", authRoutes);

try {
    // connect DB
    await mongoose.connect(process.env.MONG_URI);

    // start server
    app.listen(process.env.PORT, () => {
        console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
    });
} catch (error) {
    console.log(error);
}
