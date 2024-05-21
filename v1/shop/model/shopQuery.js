import pool from "../../../config/db.js"

export const createShopQuery=(array) =>{
    try {
        let query = `INSERT INTO shops (event_id, shop_number, description, area, rent, dome, location, status) VALUES(?,?,?,?,?,?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing createShopQuery:", error);
        throw error;
    }
}

export const getLastShopDataQuery = () => {
    try {
        let query = `SELECT shop_number FROM shops ORDER BY id DESC LIMIT 1`;
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getLastShopDataQuery:", error);
        throw error;
    }
}

export const checkShopNumberQuery = (shopNumber) => {
    try {
        let query = `SELECT COUNT(*) AS count FROM shops WHERE shop_number = ?`;
        return pool.query(query, [shopNumber]);
    } catch (error) {
        console.error("Error executing checkShopNumberQuery:", error);
        throw error;
    }
}

export const updateShopQuery = (query, array)=> {
    try {
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateShopQuery:", error);
        throw error;
    }
}

export const getAllShopsByEventIdQuery = async(array) =>{
    try {
        let query = `SELECT * FROM shops WHERE event_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getAllShopsByEventIdQuery:", error);
        throw error;
    }
}
export const getShopsQuery = async(array) =>{
    try {
        let query = `SELECT * FROM shops  WHERE id = ? AND event_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getShopsQuery:", error);
        throw error;
    }
}

export const deleteShopQuery = async(array)=>{
    try {
        let query = `DELETE FROM shops WHERE id = ? AND event_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing deleteShopQuery:", error);
        throw err
    }
}

export const getShopOccupancyDetailsQuery = async(flag, array)=>{
    try {
        let query;
        if (flag === 'shop') {
            query = `
            SELECT 
                s.id AS shop_id, 
                s.shop_number,
                CASE WHEN s.status = 'available' THEN 'no' ELSE 'yes' END AS rented,
                CASE WHEN s.status = 'available' THEN 'yes' ELSE 'no' END AS vacant
            FROM 
                shops s
            LEFT JOIN 
                rentalagreements ra ON s.id = ra.shop_id AND ra.event_id = ?
            JOIN 
                (SELECT 
                    shop_id,
                    MAX(created_at) AS latest_created_at
                FROM 
                    rentalagreements
                GROUP BY 
                    shop_id) latest_rental ON ra.shop_id = latest_rental.shop_id AND ra.created_at = latest_rental.latest_created_at
            WHERE 
                s.event_id = ?;
          `;
        } else if (flag === 'month') {
            query = `
            SELECT 
                CONCAT(MONTHNAME(m.month), ' ', YEAR(m.month)) AS month_year,
                COUNT(DISTINCT s.id) AS total_shops,
                COUNT(DISTINCT CASE WHEN s.status = 'available' THEN NULL ELSE s.id END) AS occupied,
                COUNT(DISTINCT CASE WHEN s.status = 'available' THEN s.id ELSE NULL END) AS vacant
            FROM 
                (SELECT 
                    ADDDATE('2024-01-01', INTERVAL m MONTH) AS month
                FROM 
                    (SELECT @row := @row + 1 AS m
                    FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) t1,
                        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) t2,
                        (SELECT @row := 0) r
                    ) months) m
            LEFT JOIN 
                rentalagreements ra ON YEAR(ra.start_date) = YEAR(m.month) AND MONTH(ra.start_date) <= MONTH(m.month) AND YEAR(ra.end_date) = YEAR(m.month) AND MONTH(ra.end_date) >= MONTH(m.month) AND ra.event_id = ?
            LEFT JOIN 
                shops s ON s.id = ra.shop_id
            WHERE
                ra.event_id = ?
            GROUP BY
                CONCAT(MONTHNAME(m.month), ' ', YEAR(m.month)),
                YEAR(m.month),
                MONTH(m.month)
            HAVING
                total_shops > 0
            ORDER BY
                YEAR(m.month),
                MONTH(m.month);
          `;
        }
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getShopOccupancyDetailsQuery:", error);
        throw err
    }
}

export const getLastActivityIdQuery = () =>{
    let query = `SELECT id FROM shops ORDER BY id DESC LIMIT 1`
    return pool.query(query);
}