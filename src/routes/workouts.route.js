import express from "express";
import {
    createWorkout,
    deleteWorkout,
    getWorkout,
    getWorkouts,
} from "../controllers/workout.controller.js";
import requireAuth from "../middleware/requireAuth.middleware.js";
import validateObjectId from "../middleware/validateObjectId.middleware.js";

const router = express.Router();

// protect routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", validateObjectId, getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a single workout
router.delete("/:id", validateObjectId, deleteWorkout);

export default router;
