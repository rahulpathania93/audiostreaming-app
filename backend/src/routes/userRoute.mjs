import express from "express";
import signUp from "../controllers/userController.mjs"
import verifyOtp from "../controllers/userController.mjs"
import signIn from "../controllers/userController.mjs";
const router = express.Router();
// app.use(express.json());
console.log("userRoute loaded-------")
router.post('/',signUp, async (req, res)=>{
    try {
        // const user = await userController.signUp(req.body)
        res.status(200).send("success--get---route")
    }
    catch (error){
        res.status(400).send("error",error)
    }
})

router.post('/verifyOtp', verifyOtp,async (req, res)=>{
    try {
        // const user = await userController.signUp(req.body)
        res.status(200).send("success--post---route")
    }
    catch (error){
        res.status(400).send("error",error)
    }
})
router.post('/login', signIn,async (req, res)=>{
    try {console.log("req.body",req.body)
        // const user = await userController.signUp(req.body)
        res.status(200).send("success--post---route")
    }
    catch (error){
        res.status(400).send("error",error)
    }
})
// module.exports = router
export default router