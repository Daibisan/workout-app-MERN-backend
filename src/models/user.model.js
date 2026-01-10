import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import AppError from "../utils/appError.util.js";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// static register method
userSchema.statics.register = async function (email, password) {
    // check empty input
    if (!email || !password) {
        throw new AppError("All fields must be filled", 400);
    }

    // check password format
    if (!validator.isStrongPassword(password)) {
        throw new AppError("Password not strong enough", 400);
    }

    // check email invalid & email not found
    email = email.toLowerCase();

    if (!validator.isEmail(email)) {
        throw new AppError("Email is not valid", 400);
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw new AppError("Email already in use", 409);
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // add user to mongoDB
    const user = await this.create({ email, password: hash });

    return user._id;
};

// static login method
userSchema.statics.login = async function (email, password) {
    // check empty input
    if (!email || !password) {
        throw new AppError("All fields must be filled", 400);
    }

    // check email not found
    email = email.toLowerCase();

    const user = await this.findOne({ email });
    if (!user) {
        throw new AppError("Invalid login credentials", 401);
    }

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new AppError("Invalid login credentials", 401);
    }

    return user._id;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
