import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const createdUser = await UserModel.register(email, password);
        const token = createToken(createdUser._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const authenticatedUser = await UserModel.login(email, password);
        const token = createToken(authenticatedUser._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// curl -X POST http://localhost:4000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "mantap@gmail.com", "password": 12345}'
