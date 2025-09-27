import userController from "../controllers/userController.mjs"
import User from "../models/userModel.mjs"
const saveData = async(dataTosave) => {
    const user = await User.insertOne(dataTosave)
    console.log("user---service",user)
    return user
}
const findUser = async(id) => {console.log("i am inside find ser-------")
    const user = await User.findById(id)
    return user
}

export default saveData;