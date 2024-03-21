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

const addNewAccount = async (req, res) => {

    const user_id = req.user._id
    const { accountName, initialAmount } = req.body

    let emptyFields = []

    if (!accountName) {
        emptyFields.push('accountName')
    }
    if (!initialAmount) {
        emptyFields.push('initialAmount')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please Fill in all the fields', emptyFields })
    }


    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }


    const user = await User.findById(user_id)


    if (!user) {

        return res.status(404).json({ error: 'DOES NOT EXIST' });

    } else {

        try {
            const newAccount = {
                title: accountName,
                amount: initialAmount
            };

            user.userData.accounts.push(newAccount);
            await user.save();

            return res.status(200).json({ message: 'Account added successfully' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Something Went Wrong' });
        }

        // ADD new Account to existing object in database named userData.Accounts

    }



}



export { addUser, getUserData, loginUser, addNewAccount };
