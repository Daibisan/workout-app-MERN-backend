import WorkoutModel from "../models/workout.model.js";
import mongoose from "mongoose";

// get all workouts
export const getWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id;
        const workouts = await WorkoutModel.find({ user_id }).sort({
            createdAt: -1,
        });
        res.status(200).json({ workouts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get a workout
export const getWorkout = async (req, res) => {
    const { id } = req.params;

    // check invalid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    try {
        const workout = await WorkoutModel.findById(id);

        // check null workout
        if (!workout) {
            return res.status(404).json({ error: "No such workout" });
        }

        res.status(200).json({ workout });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// create new workout
export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const user_id = req.user._id;
        const createdWorkout = await WorkoutModel.create({
            user_id,
            title,
            reps,
            load,
        });
        res.status(201).json({ message: "Workout created!", createdWorkout });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// delete workout
export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // check invalid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    try {
        const deletedWorkout = await WorkoutModel.findByIdAndDelete(id);
        if (!deletedWorkout) {
            res.status(404).json({
                error: "Delete workout: Workout not found!",
            });
            return;
        }
        res.status(200).json({ message: "Workout deleted!", deletedWorkout });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// curl -X POST -H "Content-Type: application/json" -d '{"title": "plank", "reps": 10, "load": 65}' http://localhost:4000/api/workouts

// curl http://localhost:4000/api/workouts

// curl http://localhost:4000/api/workouts/{id}

// curl -X PATCH -H "Content-Type: application/json" -d '{"title": "pull-up", "reps": 200, "load": 10}' http://localhost:4000/api/workouts/{id}

// curl -X DELETE http://localhost:4000/api/workouts/{id}
