import mongoose from 'mongoose';
import AppError from '../utils/appError.util.js';

// to check request id is a mongoDB ObjectId
export default function validateObjectId(req, res, next) {
    const { id } = req.params;

    // check invalid mongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("No such workout", 404);
    }
    next();
}