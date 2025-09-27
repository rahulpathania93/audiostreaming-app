import mongoose from "mongoose";
// import { type } from "os";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    otpExpireAt: {
        type: Date,
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User