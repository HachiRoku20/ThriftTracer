import mongoose from 'mongoose'
import Expenses from '../models/ExpensesModel.js'
import User from "../models/UserModel.js"

// *GET ALL EXPENSES

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find({}).sort({ createdAt: -1 })
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
    const { user_id, description, amount, category } = req.body

    let emptyFields = []

    if (!user_id) {
        emptyFields.push('user_id')
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


        const expenses = await Expenses.create({
            user_id, description, amount, category
        })

        res.status(200).json(expenses)

    } catch (error) {
        res.status(500).json({ error: error.message, })
    }
};


// const createExpenses = async (req, res) => {
//     const { user_id, description, amount, category } = req.body

//     const { id } = req.params

//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(404).json({ error: 'User does not exist' });
//         }

//         const ExpensedUser = await User.findById(id);

//         if (!ExpensedUser) {
//             return res.status(404).json({ error: 'User does not exist' });
//         } else {
//             ExpensedUser.userMoney -= amount;
//             await ExpensedUser.save(); // Save the updated user

//             const expenses = await Expenses.create({
//                 user_id, description, amount, category
//             });

//             res.status(200).json({
//                 message: `Amount: ${amount} removed from user's account`,
//                 expenses
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


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