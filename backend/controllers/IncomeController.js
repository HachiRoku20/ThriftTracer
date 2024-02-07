import mongoose from 'mongoose'
import Income from '../models/IncomeModel.js'
import User from "../models/UserModel.js"

// *GET ALL INCOME

const getIncome = async (req, res) => {

    const page = req.query.page || 1;
    const limit = 5

    try {
        const user_id = req.user._id.toString()
        const skip = (page - 1) * limit
        const count = await Income.estimatedDocumentCount({ user_id })

        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);

        const income = await Income.aggregate([
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

        res.status(200).json(income)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

// *GET INCOME BY ID

const getIdIncome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const income = await Income.findById(id)

    if (!income) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(income)
    }

}

// *CREATE NEW INCOME

const createIncome = async (req, res) => {
    const { title, description, amount, type } = req.body
    console.log(amount)

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please Fill in all the fields', emptyFields })
    }

    try {

        const user_id = req.user._id
        const IncomedUser = await User.findById(user_id);

        const income = await Income.create({
            user_id, title, description, amount, type
        })

        console.log(IncomedUser.userMoney)
        IncomedUser.userMoney += amount;
        await IncomedUser.save(); // Save the updated user


        res.status(200).json(income)

    } catch (error) {
        res.status(500).json({ error: error.message, })
    }
};




// *DELETE INCOME BY ID

const deleteIdIncome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const income = await Income.findOneAndDelete({ _id: id })

    if (!income) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(income)
    }

}

// *UPDATE Income BY ID

const updateIdIncome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    }

    const income = await Income.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!income) {
        return res.status(404).json({ error: 'DOES NOT EXIST' });
    } else {
        res.status(200).json(income)
    }

}


export { createIncome, getIncome, getIdIncome, deleteIdIncome, updateIdIncome };