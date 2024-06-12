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
            if(tag == "income"){
                query = `SELECT 
                YEAR(created_at) AS year,
                SUM(outstanding_amount) AS total,
                SUM(CASE WHEN type = 'shop rental' THEN outstanding_amount ELSE 0 END) AS shop_rental_total,
                SUM(CASE WHEN type = 'others' THEN outstanding_amount ELSE 0 END) AS other_total
            FROM transactions
            WHERE 
                event_id = ? 
                AND tag = 'income'
            GROUP BY YEAR(created_at)
            ORDER BY YEAR(created_at) ASC;`
            }
            if(tag == "expense"){
                query = `SELECT 
                YEAR(created_at) AS year,
                SUM(outstanding_amount) AS total,
                SUM(CASE WHEN type = 'staff salary' THEN outstanding_amount ELSE 0 END) AS staff_salary_total,
                SUM(CASE WHEN type = 'others' THEN outstanding_amount ELSE 0 END) AS other_total
            FROM transactions
            WHERE 
                event_id = ? 
                AND tag = 'expense'
            GROUP BY YEAR(created_at)
            ORDER BY YEAR(created_at) ASC;`
            }
        }
        if (flag == "month") {
            if(tag =="income"){
                query = `SELECT 
                CONCAT(DATE_FORMAT(month_year, '%M %Y')) AS month,
                SUM(shop_rental_total) AS shop_rental_total,
                SUM(other_total) AS other_total,
                SUM(total) AS total
            FROM (
                SELECT 
                    DATE_FORMAT(created_at, '%Y-%m-01') AS month_year,
                    SUM(outstanding_amount) AS total,
                    SUM(CASE WHEN type = 'shop rental' THEN outstanding_amount ELSE 0 END) AS shop_rental_total,
                    SUM(CASE WHEN type = 'others' THEN outstanding_amount ELSE 0 END) AS other_total
                FROM transactions
                WHERE 
                    event_id = ?
                    AND tag = 'income'
                    AND created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                    AND created_at <= LAST_DAY(CURRENT_DATE())
                GROUP BY month_year
            ) AS subquery
            GROUP BY month_year
            ORDER BY month_year ASC;`
            }
            if(tag =="expense"){
                query = `SELECT 
                CONCAT(DATE_FORMAT(month_year, '%M %Y')) AS month,
                SUM(staff_salary_total) AS staff_salary_total,
                SUM(other_total) AS other_total,
                SUM(total) AS total
            FROM (
                SELECT 
                    DATE_FORMAT(created_at, '%Y-%m-01') AS month_year,
                    SUM(outstanding_amount) AS total,
                    SUM(CASE WHEN type = 'staff salary' THEN outstanding_amount ELSE 0 END) AS staff_salary_total,
                    SUM(CASE WHEN type = 'others' THEN outstanding_amount ELSE 0 END) AS other_total
                FROM transactions
                WHERE 
                    event_id = ?
                    AND tag = 'expense'
                    AND created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                    AND created_at <= LAST_DAY(CURRENT_DATE())
                GROUP BY month_year
            ) AS subquery
            GROUP BY month_year
            ORDER BY month_year ASC;`
            }
        }
        return pool.query(query, [event_id]);
    } catch (error) {
        console.error("Error executing fetchOutstandingBalanceForIncomeAndExpenseQuery:", error);
        throw error;
    }
}

export const fetchYearlyDataQuery = async(array) => {
    try{
        let query;
        if(array[1]=="income"){
            query =`SELECT 
            YEAR(created_at) AS year,
            SUM(entered_amount) AS total,
            SUM(CASE WHEN type = 'shop rental' THEN entered_amount ELSE 0 END) AS shop_rental_total,
            SUM(CASE WHEN type = 'others' THEN entered_amount ELSE 0 END) AS others_total
        FROM 
            transactions
        WHERE 
            YEAR(created_at) = ? AND tag = ? AND event_id = ?
        GROUP BY 
            YEAR(created_at);`
        }else{
            query =`SELECT 
            YEAR(created_at) AS year,
            SUM(entered_amount) AS total,
            SUM(CASE WHEN type = 'staff salary' THEN entered_amount ELSE 0 END) AS staff_salary_total,
            SUM(CASE WHEN type = 'others' THEN entered_amount ELSE 0 END) AS others_total
        FROM 
            transactions
        WHERE 
            YEAR(created_at) = ? AND tag = ? AND event_id = ?
        GROUP BY 
            YEAR(created_at);`
        }
    return await pool.query(query, array);
} catch (error) {
    console.error("Error executing fetchYearlyDataQuery:", error);
    throw error;
}
}

export const fetchAllYearsDataQuery = async (event_id, tag, flag) => {
    try {
        let query;
        const params = [event_id];

        if (flag === "year") {
            if (tag === "income") {
                query = `
                    SELECT 
                        YEAR(created_at) AS year,
                        SUM(entered_amount) AS total,
                        SUM(CASE WHEN type = 'shop rental' THEN entered_amount ELSE 0 END) AS shop_rental_total,
                        SUM(CASE WHEN type = 'others' THEN entered_amount ELSE 0 END) AS other_total
                    FROM transactions
                    WHERE 
                        event_id = ?
                        AND tag = 'income'
                    GROUP BY YEAR(created_at)
                    ORDER BY YEAR(created_at) ASC;
                `;
            } else if (tag === "expense") {
                query = `
                    SELECT 
                        YEAR(created_at) AS year,
                        SUM(entered_amount) AS total,
                        SUM(CASE WHEN type = 'staff salary' THEN entered_amount ELSE 0 END) AS staff_salary_total,
                        SUM(CASE WHEN type = 'others' THEN entered_amount ELSE 0 END) AS other_total
                    FROM transactions
                    WHERE 
                        event_id = ?
                        AND tag = 'expense'
                    GROUP BY YEAR(created_at)
                    ORDER BY YEAR(created_at) ASC;
                `;
            }
        } else if (flag === "month") {
            if (tag === "income") {
                query = `
                    SELECT 
                        DATE_FORMAT(month_year, '%M %Y') AS month,
                        SUM(shop_rental_total) AS shop_rental_total,
                        SUM(other_total) AS other_total,
                        SUM(total) AS total
                    FROM (
                        SELECT 
                            DATE_FORMAT(created_at, '%Y-%m-01') AS month_year,
                            SUM(entered_amount) AS total,
                            SUM(CASE WHEN type = 'shop rental' THEN entered_amount ELSE 0 END) AS shop_rental_total,
                            SUM(CASE WHEN type = 'others' THEN entered_amount ELSE 0 END) AS other_total
                        FROM transactions
                        WHERE 
                            event_id = ?
                            AND tag = 'income'
                            AND created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                            AND created_at <= LAST_DAY(CURRENT_DATE())
                        GROUP BY month_year
                    ) AS subquery
                    GROUP BY month
                    ORDER BY month ASC;
                `;
                params.push(event_id);
            } else if (tag === "expense") {
                query = `
                    SELECT 
                        DATE_FORMAT(month_year, '%M %Y') AS month,
                        SUM(staff_salary_total) AS staff_salary_total,
                        SUM(other_total) AS other_total,
                        SUM(total) AS total
                    FROM (
                        SELECT 
                            DATE_FORMAT(created_at, '%Y-%m-01') AS month_year,
                            SUM(entered_amount) AS total,
                            SUM(CASE WHEN type = 'staff salary' THEN entered_amount ELSE 0 END) AS staff_salary_total,
                            SUM(CASE WHEN type = 'others' THEN entered_amount ELSE 0 END) AS other_total
                        FROM transactions
                        WHERE 
                            event_id = ?
                            AND tag = 'expense'
                            AND created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                            AND created_at <= LAST_DAY(CURRENT_DATE())
                        GROUP BY month_year
                    ) AS subquery
                    GROUP BY month
                    ORDER BY month ASC;
                `;
                params.push(event_id);
            }
        }
        return pool.query(query, params);
    } catch (error) {
        console.error("Error executing fetchAllYearsDataQuery:", error);
        throw error;
    }
}

export const fetchTenantsReportDataQuery = (array) => {
    try {
      let query = `
            SELECT
            rentalagreements.tenant_id AS tenant_id,
            tenants.name AS tenant_name,
            DATE_FORMAT(start_date, '%d-%m-%y') AS start_date,
            DATE_FORMAT(end_date, '%d-%m-%y') AS end_date
        FROM
            rentalagreements
        LEFT JOIN
            tenants ON rentalagreements.tenant_id = tenants._id
        WHERE
            rentalagreements.event_id = ?
            AND end_date >= ?
            AND end_date <= ?;
        `
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchTenantsDataQuery:", error);
        throw error;
    }
};