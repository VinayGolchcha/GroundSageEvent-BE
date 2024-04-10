import pool from "../../../config/db.js"

export const addTeamQuery = (array) => {
    try {
        let query = `INSERT INTO teams (team_name, team_size, event_id) VALUES (?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing addTeamQuery:", error);
        throw error;
    }
}
export const fetchAllTeamsQuery = () => {
    try {
        let query = `SELECT team_id, team_name, team_size FROM teams`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing fetchAllTeamQuery:", error);
        throw error;
    }
}
export const fetchTeamQuery = (array) => {
    try {
        let query = `SELECT team_name, team_size FROM teams WHERE id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchTeamQuery:", error);
        throw error;
    }
}

export const getLastTeamIdQuery = () =>{
    try {
        let query = `SELECT * FROM teams ORDER BY team_id DESC LIMIT 1`
        return pool.query(query);
    } catch (error) {
        console.error("Error executing getLastTeamIdQuery:", error);
        throw error;
    }
}

export const updatedTeamQuery = (array) =>{
    try {
        let query = `UPDATE teams SET team_name = ?, team_size = ? WHERE team_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updatedTeamQuery:", error);
        throw error;
    }
}

export const deleteTeamQuery = async (teamId) => {
    try {
        let query = `DELETE FROM teams WHERE id = ?`;
        return await pool.query(query, [teamId]);
    } catch (error) {
        console.error("Error executing deleteTeamQuery:", error);
        throw error;
    }
}

export const updateTeamQuery = (query, array) => {
    try {
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateTeamQuery:", error);
        throw error;
    }
}