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
    return pool.query(query, array);
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

export const deleteEventQuery = async(array)=>{
    try {
        let query = `DELETE FROM events WHERE id = ? AND user_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing deleteEvent:", error);
        throw err
    }
}