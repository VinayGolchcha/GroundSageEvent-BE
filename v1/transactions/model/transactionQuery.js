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

export const fetchYearlyDataQuery = async(array) => {
    try{
        let query =`SELECT 
        YEAR(created_at) AS year,
        tag AS type,
        SUM(CASE WHEN type= 'shop rental' THEN entered_amount ELSE 0 END) AS shop_rental_total,
        SUM(CASE WHEN type = 'shop rental' THEN (decided_amount + outstanding_amount) ELSE 0 END) AS others_total,
        SUM(entered_amount + decided_amount + outstanding_amount) AS total
    FROM 
        transactions
    WHERE 
        year(created_at) = ? AND type = ?
    GROUP BY 
        YEAR(created_at),
        TYPE IN ('income','expense');`
    return await pool.query(query, array);
} catch (error) {
    console.error("Error executing fetchYearlyDataQuery:", error);
    throw error;
}
}

export const fetchAllYearsDataQuery = async(array) => {
    try{
        let query =`  SELECT
        YEAR(created_at) AS year,
        MONTH(created_at) AS month,
        TYPE(tag) AS type,
        SUM(CASE WHEN tag = 'Income' THEN entered_amount ELSE 0 END) AS shop rental total,
        SUM(CASE WHEN tag = 'Income' THEN (deciding_amount + outstanding_amount)ELSE 0 END) AS others total,
        SUM(entered_amount +deciding_amount  + outstanding_amount) AS  total,
        SUM(CASE WHEN tag = 'Expense' THEN entered_amount ELSE 0 END) AS staff salary total,
        SUM(CASE WHEN tag = 'Expense' THEN (decided_amount + outstanding_amount) ELSE 0 END) AS others total,
        SUM(entered_amount + deciding_amount  + outstanding_amount) AS total
    FROM
        transactions
    WHERE
        event_id = 1112
        AND YEAR(created_at) <=?
        OR
        AND MONTH(created_at) =?
        AND type = ?
    GROUP BY
        YEAR(created_at),
        MONTH(created_at),
        TYPE IN ('income','expense')
    ORDER BY
        YEAR(created_at),
        MONTH(created_at),
        TYPE IN ('income','expense');`
    return await pool.query(query, array);
} catch (error) {
    console.error("Error executing fetchAllYearsDataQuery:", error);
    throw error;
}
}



