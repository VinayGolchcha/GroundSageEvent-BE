import pool from "../../../config/db.js"

export const createShopQuery=(array) =>{
    try {
        let query = `INSERT INTO shops (event_id, shop_number, description, area, rent, location, status) VALUES(?,?,?,?,?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing createShopQuery:", error);
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

export const getAllShopsQuery = async() =>{
    try {
        let query = `SELECT * FROM shops`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getAllShopsQuery:", error);
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