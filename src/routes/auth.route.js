import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

// register
authRoutes.post("/register", register);

// login
authRoutes.post("/login", login);

export default authRoutes;
