import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true, strict: true }
);

const WorkoutModel = mongoose.model("Workout", workoutSchema);
export default WorkoutModel;
