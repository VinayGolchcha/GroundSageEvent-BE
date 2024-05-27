import express, { Router } from 'express';
const app = express()
const router = Router();

import { addTransaction, deleteTransaction, fetchAllTransactionsBasedOnEvent, fetchOutstandingBalanceForIncomeAndExpense, fetchTransactionsBasedOnEvent, updateTransaction } from '../controller/transactionController.js';
import {addTransactionVal,updateTransactionVal, fetchTransactionVal, fetchAllTransactionVal, deleteTransactionVal, fetchOutstandingBalanceForIncomeAndExpenseVal} from '../../../utils/validation.js';
import {authenticateToken} from '../../../middlewares/roleAuth.js';

app.post('/add-transaction',authenticateToken, addTransactionVal, addTransaction);
app.put('/update-transaction/:id/:event_id',authenticateToken, updateTransactionVal, updateTransaction);
app.delete('/delete-transaction/:id/:event_id',authenticateToken, deleteTransactionVal, deleteTransaction);
app.post('/fetch-transaction',authenticateToken, fetchTransactionVal, fetchTransactionsBasedOnEvent);
app.post('/fetch-all-transaction',authenticateToken,fetchAllTransactionVal, fetchAllTransactionsBasedOnEvent);
app.post('/fetch-outstanding-balance',authenticateToken, fetchOutstandingBalanceForIncomeAndExpenseVal, fetchOutstandingBalanceForIncomeAndExpense);
app.use("/", router);

export default app;