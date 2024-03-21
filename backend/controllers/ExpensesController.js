import mongoose from 'mongoose'
import Expenses from '../models/ExpensesModel.js'
import User from "../models/UserModel.js"

// *GET ALL EXPENSES

const getExpenses = async (req, res) => {

    const page = req.query.page || 0;
    const limit = 6


    try {
        const user_id = req.user._id.toString()
        const skip = (page - 1) * limit
        const count = await Expenses.estimatedDocumentCount({ user_id })

        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);

        console.log(req.query.page)
        console.log(req.query.month)
        console.log(req.query.year)
        // console.log(new Date(year, month - 1, 1))
        // console.log(new Date(year, month, 0))


        // const expenses = await Expenses.find({ user_id })
        //     .limit(limit)
        //     .skip(skip)
        //     .sort({ createdAt: -1 })






        const expenses = await Expenses.aggregate([
            {
                $match: {
                    user_id: user_id,
                    createdAt: {
                        $gte: new Date(year, month - 1, 1), // Start of the month
                        $lte: new Date(year, month, 0)     // End of the month
                    }
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }

        ]);

        console.log(user_id)
        // console.log(new Date(year, month - 1, 1))
        // console.log(new Date(year, month, 0))

        res.status(200).json(expenses)

    }
    catch (error) {
        res.status(400).json(error)
        // console.log(new Date(year, month - 1, 1))
        // console.log(new Date(year, month, 0))
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
    const { title, description, amount: expenseAmount, category, account } = req.body
    console.log(category)

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!expenseAmount) {
        emptyFields.push('amount')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (!account) {
        emptyFields.push('accounters')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please Fill in all the fields', emptyFields })
    }

    try {

        const user_id = req.user._id
        const ExpensedUser = await User.findById(user_id);
        console.log(ExpensedUser)

        const accountIndex = ExpensedUser.userData.accounts.findIndex(obj => obj.title === account);

        if (ExpensedUser.userData.accounts[accountIndex].amount < expenseAmount) {
            return res.status(400).json({ error: `Cannot Process Expense: Insufficient Amount of Money in ${account}`, emptyFields })
        }

        console.log('AMOUNT VALIDATION RAN')
        const expenses = await Expenses.create({
            user_id, title, description, amount: expenseAmount, category, account
        })




        ExpensedUser.userData.availableBalance -= expenseAmount;
        ExpensedUser.userData.accounts[accountIndex].amount -= expenseAmount;
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