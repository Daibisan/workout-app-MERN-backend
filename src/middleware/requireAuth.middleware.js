import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import AppError from "../utils/appError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";

// to prevent unauthorized request
const requireAuth = asyncHandler(async (req, res, next) => {
    // check header
    const { authorization } = req.headers;
    if (!authorization) {
        throw new AppError("Authorization token required", 401);
    }

    // check auth format
    if (!authorization.startsWith("Bearer ")) {
        throw new AppError("Invalid auth format", 401);
    }

    try {
        // verify token
        const token = authorization.split(" ")[1];
        const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);

        // verify user_id
        const user = await UserModel.findOne({ _id }).select("_id");
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        // save user_id to request
        req.user = { _id, role };
        next();
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log(error);
        }

        throw new AppError("Request is not authorized", 401);
    }
});

export default requireAuth;
