import express, { response } from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import ExpensesRoute from './routes/expensesRoute.js';
import IncomeRoute from './routes/incomeRoute.js';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';
import session from 'express-session'


// *DOT ENV
dotenv.config();
const app = express();

// *MIDDLEWARE

app.use(cors());
app.use(express.json());




app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

var sess = {
    secret: 'jxGdX7Iahzrtvj9H',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

app.use(session(sess))


// ^Get Request Test (Express)
// app.get('/', (req, res) => {

//     return res.status(234).send(`${process.env.PORT}`)
// });


// *Connects MongoDB Atlas
mongoose.connect(process.env.mongodbURL)
    .then(() => {
        console.log('App connected');

        // *Listens For Requests (Express)
        app.listen(process.env.PORT, () => {
            console.log(`app is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })

// *ROUTES
app.use('/expenses', ExpensesRoute)
app.use('/income', IncomeRoute)
app.use('/user', UserRoute)
