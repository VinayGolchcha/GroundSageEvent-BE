import express, { Router } from 'express';
const app = express()
const router = Router();

import { addTransaction, deleteTransaction, fetchAllTransactionsBasedOnEvent, fetchOutstandingBalanceForIncomeAndExpense, fetchTransactionsBasedOnEvent, updateTransaction,fetchYearlyData,fetchAllYearsData,fetchTenantsReportData } from '../controller/transactionController.js';
import {addTransactionVal,updateTransactionVal, fetchTransactionVal, fetchAllTransactionVal, deleteTransactionVal, fetchOutstandingBalanceForIncomeAndExpenseVal,fetchYearlyDataVal,fetchAllYearsDataVal,fetchTenantsReportDataVal} from '../../../utils/validation.js';
import {authenticateToken} from '../../../middlewares/roleAuth.js';

app.post('/add-transaction',authenticateToken, addTransactionVal, addTransaction);
app.put('/update-transaction/:id/:event_id',authenticateToken, updateTransactionVal, updateTransaction);
app.delete('/delete-transaction/:id/:event_id',authenticateToken, deleteTransactionVal, deleteTransaction);
app.post('/fetch-transaction',authenticateToken, fetchTransactionVal, fetchTransactionsBasedOnEvent);
app.post('/fetch-all-transaction',authenticateToken,fetchAllTransactionVal, fetchAllTransactionsBasedOnEvent);
app.post('/fetch-outstanding-balance',authenticateToken, fetchOutstandingBalanceForIncomeAndExpenseVal, fetchOutstandingBalanceForIncomeAndExpense);
app.post('/fetch-yearly-data',authenticateToken, fetchYearlyDataVal, fetchYearlyData);
app.post('/fetch-all-years-data',authenticateToken, fetchAllYearsDataVal, fetchAllYearsData);
app.post('/fetch-tenants-report-data',authenticateToken, fetchTenantsReportDataVal,fetchTenantsReportData);

app.use("/", router);

export default app;