import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/userRoute.mjs";

dotenv.config();
const app = express();
//middleware allows json and cross origin requests
app.use(cors());
app.use(express.json());
console.log(process.env.PORT);


app.get("/",(req,res)=>{console.log("get route started")
    res.send("backend is working");
})
app.use("/register",router);


mongoose.connect(process.env.MONGO_URI || "")
.then(()=>{
    console.log("Mongodb Connected")
    app.listen(process.env.PORT, ()=>{
        console.log("serve running on PORT",process.env.PORT);
    })
})
.catch((error)=>{
    console.log("db connection failed---",error)
})