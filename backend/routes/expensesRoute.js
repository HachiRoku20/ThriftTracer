import express, { response } from "express"
import { createExpenses, getExpenses, getIdExpenses, deleteIdExpenses, updateIdExpenses } from "../controllers/ExpensesController.js";
import { requireAuth } from '../middleware/requireAuth.js'


const router = express.Router();

router.use(requireAuth);


// *GET All (Expenses)
router.get('/', getExpenses);

// *GET One (Expenses)
router.get('/:id', getIdExpenses);

// *POST New (Expenses)
router.post('/', createExpenses);

// *DELETE One (Expenses)
router.delete('/:id', deleteIdExpenses);

// *UPDATE existing(Expenses)
router.patch('/:id', updateIdExpenses);





export default router;