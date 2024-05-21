import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import { addTransaction, deleteTransaction, fetchAllTransactionsBasedOnEvent, fetchOutstandingBalanceForIncomeAndExpense, fetchTransactionsBasedOnEvent, getUploadedFiles, updateTransaction, uploadFiles } from '../controller/transactionController.js';
import {addTransactionVal,updateTransactionVal, fetchTransactionVal, fetchAllTransactionVal, deleteTransactionVal, fetchOutstandingBalanceForIncomeAndExpenseVal} from '../../../utils/validation.js';
router.use(authenticateToken);
import multer from 'multer';

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/add-transaction',addTransactionVal, addTransaction);
app.put('/update-transaction/:id/:event_id',updateTransactionVal, updateTransaction);
app.delete('/delete-transaction/:id/:event_id',deleteTransactionVal, deleteTransaction);
app.post('/fetch-transaction',fetchTransactionVal, fetchTransactionsBasedOnEvent);
app.post('/fetch-all-transaction',fetchAllTransactionVal, fetchAllTransactionsBasedOnEvent);
app.post('/fetch-outstanding-balance',fetchOutstandingBalanceForIncomeAndExpenseVal, fetchOutstandingBalanceForIncomeAndExpense);
app.post("/googlefile",upload.array('files', 10), uploadFiles)
app.post("/getfile", getUploadedFiles)
app.use("/", router);

export default app;