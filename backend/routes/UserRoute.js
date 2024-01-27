import express, { response } from "express"
import { addUser, searchUserById } from "../controllers/UserController.js";


const router = express.Router();


// *Create User 
router.post('/', addUser);
router.get('/:id', searchUserById)







export default router;