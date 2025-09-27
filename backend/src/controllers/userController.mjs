import mongoose from "mongoose";
import User from "../models/userModel.mjs";
import otpGenerator from "otp-generator";
import saveData from "../services/userService.mjs"
import Twilio from "twilio";
// import findUser from '../services/userService.mjs';


const signUp = async (req, res) => { 
    console.log("conrtroller called-----")
    try{
        console.log("req.bdoy",req.body)
        if(!req.body.name || !req.body.email || !req.body.phone || !req.body.password){
            console.log("All fields are required")
            res.status(400).send("All fields are required")
        }
        
        else{
            console.log("else-----")
            const dataTosave = {name:req.body.name,
                age: req.body.age,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            }

            
            const generateOTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            console.log("generateOTP-----",generateOTP)
            dataTosave.otp = generateOTP
            console.log("dataTosave",dataTosave);
            var accountSid = process.env.TWILIO_ACCOUNT_SID
            var authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = Twilio(accountSid, authToken,{
                logLevel: "debug";
            });

            // const user = await User.save(dataTosave,{lean:true},{new:true});
            // check if user already existed
            const phoneNo = req.body.phone
            const existedUser  = await User.findOne({phone:phoneNo}) 
              console.log("existedUser",existedUser)
            if (existedUser){//console.log("generateOTP22-----",generateOTP)
                return res.status(400).send("user already existed")
            }
            
            else{

                const user = await saveData(dataTosave )
            console.log("user---out--",user)
            return res.status(200).send("User successfully created",user)
            }
          
            // res.status(200).send("User successfully created",user)    
        }
    }
    catch(error){console.log("error",error)
        res.status(400).send("error",error)

    }
}
// exports default userController

// module.exports = {signUp}
export default  signUp