import pool from "../../../config/db.js"

export const createEventQuery=(array) =>{
    try {
        let query = `INSERT INTO events (user_id, event_name, event_description, start_date, end_date) VALUES(?,?,?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing createEventQuery:", error);
        throw error;
    }
}

export const updateEventQuery = (query, array)=> {
    try {
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateEventQuery:", error);
        throw error;
    }
}

export const getAllEventsQuery = async() =>{
    try {
        let query = `SELECT * FROM events`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getAlleventsQuery:", error);
        throw error;
    }
}
export const getEventQuery = async(array) =>{
    try {
        let query = `SELECT * FROM events WHERE id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getEventQuery:", error);
        throw error;
    }
}

export const deleteEventQuery = async(array)=>{
    try {
        let query = `DELETE FROM events WHERE id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing deleteEventQuery:", error);
        throw err
    }
}
