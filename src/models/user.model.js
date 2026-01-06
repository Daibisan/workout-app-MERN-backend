import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// static register method
userSchema.statics.register = async function(email, password) {
    // input validation
    if (!email || !password) {
        throw new Error("All fields must be filled");
    } 
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password not strong enough");
    }

    // check email
    const exists = await this.findOne({email});
    if (exists) {
        throw new Error("Email already in use");
    }
     
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // add user to mongoDB
    const user = await this.create({email, password: hash});
    return user;
}

// static login method
userSchema.statics.login = async function (email, password) {
    // input validation
    if (!email || !password) {
        throw new Error("All fields must be filled");
    } 

    // check email
    const user = await this.findOne({email});
    if (!user) {
        throw new Error("Invalid login credentials");
    } 

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid login credentials");
    }

    return user;
}

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
