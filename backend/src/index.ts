import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
//middleware allows json and cross origin requests
app.use(cors());
app.use(express.json());
console.log(process.env.PORT);
// test route to check backend is working
app.get("/",(req,res)=>{
    res.send("backend is working");
})
// const PORT = 7700;
// connect to mongodb
const dbcheck = process.env.MONGO_URI
console.log("dbcheck---------------=-=-=2e--3=2=3=2",dbcheck)
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