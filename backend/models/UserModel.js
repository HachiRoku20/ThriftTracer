import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    userMoney: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema);
export default UserModel;