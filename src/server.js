import mongoose from "mongoose";
import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        // connect DB
        await mongoose.connect(process.env.MONGO_URI);

        // start server
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
}
startServer();
