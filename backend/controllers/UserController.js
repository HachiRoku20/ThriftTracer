import mongoose from "mongoose"
import User from "../models/UserModel.js"


const addUser = async (req, res) => {
    const { user_id, username, password, userMoney } = req.body;

    try {
        const user = await User.create({
            user_id, username, password, userMoney
        })
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json(error)
    }
}


const searchUserById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(user)
    }

}

export { addUser, searchUserById };
