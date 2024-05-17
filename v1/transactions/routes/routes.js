import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import { addTransaction, deleteTransaction, fetchAllTransactionsBasedOnEvent, fetchOutstandingBalanceForIncomeAndExpense, fetchTransactionsBasedOnEvent, updateTransaction,fetchYearlyData,fetchAllYearsData,fetchTenantsReportData } from '../controller/transactionController.js';
import {addTransactionVal,updateTransactionVal, fetchTransactionVal, fetchAllTransactionVal, deleteTransactionVal, fetchOutstandingBalanceForIncomeAndExpenseVal,fetchYearlyDataVal,fetchAllYearsDataVal,fetchTenantsReportDataVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/add-transaction',addTransactionVal, addTransaction);
app.put('/update-transaction/:id/:event_id',updateTransactionVal, updateTransaction);
app.delete('/delete-transaction/:id/:event_id',deleteTransactionVal, deleteTransaction);
app.post('/fetch-transaction',fetchTransactionVal, fetchTransactionsBasedOnEvent);
app.post('/fetch-all-transaction',fetchAllTransactionVal, fetchAllTransactionsBasedOnEvent);
app.post('/fetch-outstanding-balance',fetchOutstandingBalanceForIncomeAndExpenseVal, fetchOutstandingBalanceForIncomeAndExpense);
app.post('/fetch-yearly-data',fetchYearlyDataVal, fetchYearlyData);
app.post('/fetch-all-years-data',fetchAllYearsDataVal, fetchAllYearsData);
app.post('/fetch-tenants-report-data',fetchTenantsReportDataVal,fetchTenantsReportData);

app.use("/", router);

export default app;