import express from "express";
import cors from "cors";

import workoutsRoute from "./routes/workouts.route.js";
import authRoute from "./routes/auth.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// CORS
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));

// to get request payload and save it to req.body
app.use(express.json());

// dev logger
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log(req.method, req.path);
        next();
    });
}

// routes
app.use("/api/auth", authRoute);
app.use("/api/workouts", workoutsRoute);

// error handler
app.use(errorHandler);

export default app;
