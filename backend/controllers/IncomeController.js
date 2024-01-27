import mongoose from 'mongoose'
import Income from '../models/IncomeModel.js'

// *GET ALL INCOME

const getIncome = async (req, res) => {
    try {
        const income = await Income.find({}).sort({ createdAt: -1 })
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
    const { user_id, description, amount, type } = req.body

    try {
        const income = await Income.create({
            user_id, description, amount, type
        })
        res.status(200).json(income)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

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