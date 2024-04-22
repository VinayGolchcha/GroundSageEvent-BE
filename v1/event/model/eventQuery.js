import pool from "../../../config/db.js"

export const createEventQuery=(array) =>{
    try {
        let query = `INSERT INTO events (event_name, event_description, start_date, end_date) VALUES(?,?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing createEventQuery:", error);
        throw error;
    }
}
export const insertUserEventQuery=(array) =>{
    try {
        let query = `INSERT INTO userEvents (user_id, event_id) VALUES(?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertUserEventQuery:", error);
        throw error;
    }
}

export const insertUserTeamQuery=(array) =>{
    try {
        let query = `INSERT INTO userTeams (user_id, team_id, role_id) VALUES(?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertUserTeamQuery:", error);
        throw error;
    }
}
export const getLastEventIdQuery=() =>{
    try {
        let query = `SELECT id FROM events ORDER BY id DESC LIMIT 1`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getLastEventIdQuery:", error);
        throw error;
    }
}
export const getLastTeamIdQuery=() =>{
    try {
        let query = `SELECT id FROM teams ORDER BY id DESC LIMIT 1`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getLastTeamIdQuery:", error);
        throw error;
    }
}
export const getRoleIdQuery= async(array) =>{
    try {
        let query = `SELECT _id FROM roles WHERE role_name = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getRoleIdQuery:", error);
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
