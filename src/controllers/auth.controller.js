import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import AppError from "../utils/appError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";

// create jwt token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const register = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check empty input
    if (!email || !password) {
        throw new AppError("All fields must be filled", 400);
    }

    // create user & token
    const createdUser = await UserModel.register(email, password);
    const token = createToken(createdUser._id);

    res.status(201).json({ email, token });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check empty input
    if (!email || !password) {
        throw new AppError("All fields must be filled", 400);
    }

    // create user & token
    const authenticatedUser = await UserModel.login(email, password);
    const token = createToken(authenticatedUser._id);

    res.status(200).json({ email, token });
});

// curl -X POST http://localhost:4000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "mantap@gmail.com", "password": 12345}'
