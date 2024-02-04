import mongoose from "mongoose";

const Schema = mongoose.Schema

const incomeSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    amount: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

}, { timestamps: true })

const IncomeModel = mongoose.model("Income", incomeSchema);
export default IncomeModel;