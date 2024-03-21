import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from 'validator'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    userData: {
        availableBalance: {
            type: Number,
            required: true
        },
        categories: {
            type: [String]
        },
        accounts: {
            type: [{
                title: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number
                }

            }]
        },
        netWorth: {
            type: Number
        }
    }



}, { timestamps: true })


//Static signup method
userSchema.statics.signup = async function (email, username, password) {

    //Validation Check
    if (!email || !username || !password) {
        throw Error('all Fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const defaultValues = {
        availableBalance: 0,
        categories: ["Food", "Transportation", "Entertainment", "Utilities", "Healthcare", "Clothing", "Travel", "PersonalCare"],
        accounts: [{ title: "Cash", amount: 0 }]
    }

    const user = await this.create({ email, username, password: hash, userData: defaultValues })

    return user

}

//Static Login Method

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('all Fields must be filled')
    }

    const user = await this.findOne({ email })
    console.log(user)

    if (!user) {
        throw Error('Email does not exist')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect Password')
    }

    return user

}



const UserModel = mongoose.model("User", userSchema);
export default UserModel;