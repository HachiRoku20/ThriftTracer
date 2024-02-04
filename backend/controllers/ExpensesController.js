import mongoose from 'mongoose'
import Expenses from '../models/ExpensesModel.js'
import User from "../models/UserModel.js"

// *GET ALL EXPENSES

const getExpenses = async (req, res) => {
    try {
        const user_id = req.user._id
        const expenses = await Expenses.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(expenses)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

// *GET EXPENSES BY ID

const getIdExpenses = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const expenses = await Expenses.findById(id)

    if (!expenses) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(expenses)
    }

}

// *CREATE NEW EXPENSES


const createExpenses = async (req, res) => {
    const { title, description, amount, category } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please Fill in all the fields', emptyFields })
    }

    try {

        const user_id = req.user._id
        const ExpensedUser = await User.findById(user_id);
        if (ExpensedUser.userMoney < amount) {
            return res.status(400).json({ error: 'Cannot Process Expense: Insufficient Amount of Money', emptyFields })
        }

        const expenses = await Expenses.create({
            user_id, title, description, amount, category
        })


        ExpensedUser.userMoney -= amount;
        await ExpensedUser.save(); // Save the updated user

        res.status(200).json(expenses)

    } catch (error) {
        res.status(500).json({ error: error.message, })
    }
};


// *DELETE EXPENSES BY ID

const deleteIdExpenses = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const expenses = await Expenses.findOneAndDelete({ _id: id })

    if (!expenses) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(expenses)
    }

}

// *UPDATE EXPENSES BY ID

const updateIdExpenses = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const expenses = await Expenses.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!expenses) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(expenses)
    }

}


export { createExpenses, getExpenses, getIdExpenses, deleteIdExpenses, updateIdExpenses };