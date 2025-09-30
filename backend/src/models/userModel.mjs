import mongoose from "mongoose";
// import { type } from "os";

const userSchema = new mongoose.Schema({
    //  id: { type: mongoose.Schema.Types.ObjectId, 
    //     required: true },
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
        default: Date.now,
        // index: {
        //     expires: '45m'
        // }
    
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    
        token:{
            type:String
            // required: true
        }
    
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User