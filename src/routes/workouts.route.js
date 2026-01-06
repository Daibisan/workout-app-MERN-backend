import express from "express";
import { createWorkout, deleteWorkout, getWorkout, getWorkouts } from "../controllers/workout.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const workoutsRoutes = express.Router();

// protect routes
workoutsRoutes.use(requireAuth);

// GET all workouts
workoutsRoutes.get("/", getWorkouts);

// GET a single workout
workoutsRoutes.get("/:id", getWorkout);

// POST a new workout
workoutsRoutes.post("/", createWorkout);

// DELETE a single workout
workoutsRoutes.delete("/:id", deleteWorkout);

export default workoutsRoutes;
