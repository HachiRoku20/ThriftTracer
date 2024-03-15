import mongoose from "mongoose"
import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })

}



const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {


        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({ username: user.username, token })

    } catch (error) {
        res.status(400).json(error.message);
    }

}



const addUser = async (req, res) => {
    const { email, username, password } = req.body;


    try {


        const user = await User.signup(email, username, password)

        const token = createToken(user._id)

        res.status(200).json({ username, token })

    } catch (error) {
        res.status(400).json(error.message);
    }
}


// const checkToken = async (req, res) => {
//     const { user_id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'DOES NOT EXIST' });
//     }

//     const user = await User.findById(id)

//     if (!user) {
//         return res.status(404).json({ error: 'DOES NOT EXIST' });
//     } else {
//         res.status(200).json(user)
//     }

// }

const getUserData = async (req, res) => {

    const user_id = req.user._id

    console.log(user_id)

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const user = await User.findById(user_id)


    if (!user) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        const userData = user.userData
        res.status(200).json(userData)
    }

}

export { addUser, getUserData, loginUser };
