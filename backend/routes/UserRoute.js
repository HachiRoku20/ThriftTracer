import express, { response } from "express"
import { addUser, getUserData, loginUser, addNewAccount } from "../controllers/UserController.js";
import { requireAuth } from '../middleware/requireAuth.js'



const router = express.Router();


var app = express()



// *Create User 
router.post('/signup', addUser);
router.post('/login', loginUser);

router.use(requireAuth);

router.get('/', getUserData)
router.post('/accounts', addNewAccount)










export default router;