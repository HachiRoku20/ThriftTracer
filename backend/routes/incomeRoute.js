import express, { response } from "express"
import { createIncome, getIncome, getIdIncome, deleteIdIncome, updateIdIncome } from "../controllers/IncomeController.js";
import { requireAuth } from '../middleware/requireAuth.js'


const router = express.Router();

router.use(requireAuth);


// *GET All (Income)
router.get('/', getIncome);

// *GET One (Income)
router.get('/:id', getIdIncome);

// *POST New (Income)
router.post('/', createIncome);

// *DELETE One (Income)
router.delete('/:id', deleteIdIncome);

// *UPDATE existing(Income)
router.patch('/:id', updateIdIncome);





export default router;