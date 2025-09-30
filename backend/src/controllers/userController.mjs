import mongoose from "mongoose";
import User from "../models/userModel.mjs";
import otpGenerator from "otp-generator";
import saveData from "../services/userService.mjs"
import Twilio from "twilio";
import jwt from "jsonwebtoken"
import { json } from "stream/consumers";
// import findUser from '../services/userService.mjs';



const signUp = async (req, res) => {

    try {
        console.log("req.bdoy", req.body)
        if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password) {
            console.log("All fields are required")
            res.status(400).send("All fields are required")
        }

        else {

            const phoneNo = req.body.phone
            const existedUser = await User.findOne({ phone: phoneNo })

            if (existedUser) {
                return res.status(400).send("user already existed")
            }
            else {
                {
                    const dataTosave = {
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: req.body.password,
                        otpExpireAt: new Date(Date.now() + 45 * 60 * 1000)
                    }
                    const generateOTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });

                    dataTosave.otp = generateOTP



                    const user = await saveData(dataTosave)

                    res.status(200).send("User successfully created", user)


                    var accountSid = process.env.TWILIO_ACCOUNT_SID
                    var authToken = process.env.TWILIO_AUTH_TOKEN;
                    const client = Twilio(accountSid, authToken, {
                        logLevel: "debug",
                        region: "us1",
                        edge: "singapore"

                    });

                    const message = client.messages.create({
                        messagingServiceSid: process.env.MessagingServiceSid,
                        body: `Your OTP is ${generateOTP}`,

                        to: "+917042754766"
                    }).then((message) => { console.log("message sent successfully", message) })
                        .catch((error) => {
                            console.log("error", error)
                        })



                }

            }

        }
    }
    catch (error) {
        console.log("error", error)
        res.status(400).send("error", error)

    }
}

const verifyOtp = async (req, res) => {
    console.log("controller started-----", req.body);
    try {
        const phone = req.body.phone
        const user = await User.findOne({ phone: phone });
        console.log("user", user)
        if (!user) {
            return res.status(400).send("user does not exist")
        }
        else {
            if (!user.otpExpireAt || new Date() > user.otpExpireAt){
                return res.status(400).send("otp expired")

            }
            else{console.log(user.otp,req.body.otp)
            if (user.otp !== req.body.otp) {
                return res.status(400).send("invalid otp");
            }
            else {//console.log("req",req)
                const accessToken = generateToken(user._id)
                console.log("accessToken", accessToken)
                const dataToupdate = {
                    $set: {
                        isVerified: true,
                        token: accessToken
                    }
                }
                console.log("dataToupdate---", dataToupdate)
                const verify = await User.updateOne({ "_id": user._id }, {
                    $set: {
                        isVerified: true,
                        token: accessToken
                    }
                })
                console.log("verify---", verify)
                return res.status(200).send(verify, "otp verified");
                // generate Auth Token

            }
            }
        }
    } catch (error) {
        console.log("error", error)
        res.status(400).send("error", error)
    }

}
const generateToken = (userId) => {
    //   const privateKey = process.env.privateKey;
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { algorithm: "HS256" });
    console.log("token------------------", token)
    return token
};

// export default signUp
export default verifyOtp