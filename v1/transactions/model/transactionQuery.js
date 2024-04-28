import pool from "../../../config/db.js"

export const addTransactionQuery = (array) => {
    try {
        let query = `INSERT INTO transactions (event_id, tag, type, item, decided_amount, entered_amount, outstanding_amount, remarks) VALUES (?,?,?,?,?,?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing addTransactionQuery:", error);
        throw error;
    }
}
export const fetchAllTransactionsQuery = (array) => {
    try {
        let query = `SELECT * FROM transactions WHERE event_id = ? ORDER BY created_at DESC`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchAllTransactionsQuery:", error);
        throw error;
    }
}
export const fetchTransactionQuery = (array) => {
    try {
        let query = `SELECT * FROM transactions WHERE _id = ? AND event_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchTransactionQuery:", error);
        throw error;
    }
}

export const deleteTransactionQuery = async (array) => {
    try {
        let query = `DELETE FROM transactions WHERE _id = ? AND event_id`;
        return await pool.query(query, array);
    } catch (error) {
        console.error("Error executing deleteTransactionQuery:", error);
        throw error;
    }
}

export const updateTransactionQuery = (query, array) => {
    try {
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateTransactionQuery:", error);
        throw error;
    }
}

export const fetchOutstandingBalanceForIncomeAndExpenseQuery = (event_id, tag, flag) => {
    try {
        let query;
        if (flag == "year") {
            query = `SELECT YEAR(created_at) AS year,
            type,
            event_id,
            SUM(outstanding_amount) AS total_outstanding_amount,
            SUM(decided_amount) AS total,
            SUM(entered_amount) AS total_received_amount
     FROM transactions
     WHERE event_id = ?
       AND (
           (tag = ? AND (type = 'shop rental' OR type = 'others'))
           OR
           (tag = ? AND (type = 'staff salary' OR type = 'others'))
       )
     GROUP BY YEAR(created_at), type;`;
        }
        if (flag == "month") {
            query = `SELECT MONTH(created_at) AS month,
            type,
            event_id,
            SUM(outstanding_amount) AS total_outstanding_amount,
            SUM(decided_amount) AS total,
            SUM(entered_amount) AS total_received_amount
     FROM transactions
     WHERE event_id = ?
       AND (
           (tag = ? AND (type = 'shop rental' OR type = 'others'))
           OR
           (tag = ? AND (type = 'staff salary' OR type = 'others'))
       )
     GROUP BY MONTH(created_at), type;`;
        }
        return pool.query(query, [event_id, tag, tag]);
    } catch (error) {
        console.error("Error executing fetchOutstandingBalanceForIncomeAndExpenseQuery:", error);
        throw error;
    }
}
