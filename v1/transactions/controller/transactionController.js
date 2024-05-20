import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {addTransactionQuery, fetchAllTransactionsQuery, fetchTransactionQuery, updateTransactionQuery, deleteTransactionQuery, fetchOutstandingBalanceForIncomeAndExpenseQuery, uploadFilesQuery, getUploadFilesQuery} from "../model/transactionQuery.js"
import {incrementId, createDynamicUpdateQuery} from "../../helpers/functions.js"
dotenv.config();

export const addTransaction = async(req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {event_id, tag, type, item, decided_amount, entered_amount, outstanding_amount, remarks} = req.body;
        const [data]= await addTransactionQuery([event_id, tag, type, item, decided_amount, entered_amount, outstanding_amount, remarks]);
        return successResponse(res, data, 'Transaction successfully registered');
    } catch (error) {
        next(error);
    }
}

export const fetchAllTransactionsBasedOnEvent = async (req, res, next) => {
    try {
        const {event_id} = req.body;
        const [data] = await fetchAllTransactionsQuery([event_id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
        return successResponse(res, data, 'All transactions fetched successfully');
    } catch (error) {
        next(error);
    }
}

export const fetchTransactionsBasedOnEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {transaction_id, event_id} = req.body;
        const [data] = await fetchTransactionQuery([transaction_id, event_id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
        return successResponse(res, data, 'Transaction data fetched successfully');
    } catch (error) {
        next(error);
    }
}

export const updateTransaction = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const req_data = req.body; 
        const transaction_id = req.params.id;
        const event_id = req.params.event_id;
        const condition = {
            _id: transaction_id,
            event_id:event_id
        };
        const [data] = await fetchTransactionQuery([transaction_id, event_id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
        const query_values = await createDynamicUpdateQuery("transactions", condition, req_data);
        await updateTransactionQuery(query_values.updateQuery, query_values.updateValues)
        return successResponse(res, 'Transaction updated successfully');
    } catch (error) {
        next(error);
    }
}

export const deleteTransaction = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const transaction_id = req.params.id;
        const event_id = req.params.event_id;
        const [data] = await fetchTransactionQuery([transaction_id, event_id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
        await deleteTransactionQuery([transaction_id, event_id]);
        return successResponse(res, "", 'Transaction deleted successfully');
    } catch (error) {
        next(error);
    }
}

export const fetchOutstandingBalanceForIncomeAndExpense = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "");
        }
        const { flag, type, event_id } = req.body;
        const [data] = await fetchOutstandingBalanceForIncomeAndExpenseQuery(event_id, type, flag)
        if (data.length == 0) {
            return errorResponse(res, '', 'Data not found.');
        }
        return successResponse(res, data, `${flag + "ly"} ${type} outstanding fetched successfully.`);
    } catch (error) {
        next(error);
    }
};

export const uploadFiles= async(req, res, next) => {
    try {
        const files = req.files;
        const file_buffer = files[0].buffer
        console.log("file_buffer", file_buffer);
        const file_name = files[0].originalname
        const [data] = await uploadFilesQuery([file_name,file_buffer])
        res.status(200).json({ status_code: 200, status: 'success', data: data });
    }catch(error){
        res.status(500).json({ status_code: 500, status: 'failure', message: error.stack });
    }
}
export const getUploadedFiles= async(req, res, next) => {
    try {
        const [data] = await getUploadFilesQuery()
        res.status(200).json({ status_code: 200, status: 'success', data: data });
    }catch(error){
        res.status(500).json({ status_code: 500, status: 'failure', message: error.stack });
    }
}