import mongoose from "mongoose";

const Schema = mongoose.Schema

const expensesSchema = new Schema({
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
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }

}, { timestamps: true })

const ExpensesModel = mongoose.model("Expenses", expensesSchema);
export default ExpensesModel;