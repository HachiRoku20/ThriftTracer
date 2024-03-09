import express, { response } from "express"
import { addUser, getUserMoney, loginUser } from "../controllers/UserController.js";
import { requireAuth } from '../middleware/requireAuth.js'



const router = express.Router();


var app = express()



// *Create User 
router.post('/signup', addUser);
router.post('/login', loginUser);

router.use(requireAuth);

router.get('/', getUserMoney)










export default router;