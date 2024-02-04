import express, { response } from "express"
import { addUser, searchUserById, loginUser } from "../controllers/UserController.js";


const router = express.Router();


router.post('/login', loginUser);


// *Create User 
router.post('/signup', addUser);
router.post('/login', loginUser);










export default router;