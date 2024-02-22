import mongoose from "mongoose";

const Schema = mongoose.Schema

const budgetSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    limit: {
        type: number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    currentAmount: {
        type: number
    }


}, { timestamps: true })

const ExpensesModel = mongoose.model("budget", budgetSchema);
export default ExpensesModel;