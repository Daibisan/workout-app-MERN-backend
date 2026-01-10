import WorkoutModel from "../models/workout.model.js";
import AppError from "../utils/appError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";

export const getWorkouts = asyncHandler(async (req, res) => {
    const user_id = req.user._id;

    // find workouts
    const workouts = await WorkoutModel.find({ user_id }).sort({
        createdAt: -1,
    });

    res.status(200).json({ workouts });
});

export const getWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    // find a workout
    const workout = await WorkoutModel.findOne({ _id: id, user_id });

    // check workout not found
    if (!workout) {
        throw new AppError("No such workout", 404);
    }

    res.status(200).json({ workout });
});

export const createWorkout = asyncHandler(async (req, res) => {
    const { title, reps, load } = req.body;

    // check empty input
    if (!title || reps === undefined || load === undefined) {
        throw new AppError("All fields must be filled", 400);
    }

    // create workout
    const user_id = req.user._id;
    const createdWorkout = await WorkoutModel.create({
        user_id,
        title,
        reps,
        load,
    });

    res.status(201).json({
        message: "Workout created!",
        workout: createdWorkout,
    });
});

export const deleteWorkout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;

    // delete workout
    const deletedWorkout = await WorkoutModel.findOneAndDelete({
        _id: id,
        user_id,
    });

    // check workout not found
    if (!deletedWorkout) {
        throw new AppError("Delete workout: Workout not found!", 404);
    }

    res.status(200).json({
        message: "Workout deleted!",
        workout: deletedWorkout,
    });
});

// curl -X POST -H "Content-Type: application/json" -d '{"title": "plank", "reps": 10, "load": 65}' http://localhost:4000/api/workouts

// curl http://localhost:4000/api/workouts

// curl http://localhost:4000/api/workouts/{id}

// curl -X PATCH -H "Content-Type: application/json" -d '{"title": "pull-up", "reps": 200, "load": 10}' http://localhost:4000/api/workouts/{id}

// curl -X DELETE http://localhost:4000/api/workouts/{id}
