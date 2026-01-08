import express from "express";
import cors from "cors";

import workoutsRoutes from "./routes/workouts.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// dev logger
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log(req.method, req.path);
        next();
    });
}

// routes
app.use("/api/workouts", workoutsRoutes);
app.use("/api/auth", authRoutes);

export default app;
