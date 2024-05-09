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

export const fetchUserTeamQuery = (array) =>{
    try{
        let query = `SELECT  profiles.username, profiles.team_id,teams.team_name,teams.event_id
        FROM profiles 
        INNER JOIN teams ON profiles.team_id = teams.id
        WHERE  teams.event_id = ? `;
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchUserTeamQuery:",error);
        throw error;
    }

    }

export const getUserEventTeamQuery = (array) =>{
    try{
        let query = `SELECT
        COUNT(DISTINCT teams.id) AS team_count,
        COUNT(DISTINCT events.id) AS event_count
    FROM
        profiles
    INNER JOIN
        teams ON profiles.team_id = teams.id
    INNER JOIN
        events ON teams.event_id = events.id
    WHERE
        events.user_id = ?`;
        return pool.query(query ,array);
    }catch (error){
        console.error("Error executing getUserEventTeamQuery : ",error);
        throw(error);
    }
}

export const fetchUsersAndTeamsQuery = (array) =>{
    try{
        let query = `SELECT teams.event_id,profiles.username,teams.team_name
        FROM userteams
        INNER JOIN profiles ON userteams.user_id = profiles.id
        INNER JOIN teams ON userteams.team_id = teams.id
        WHERE teams.event_id =?; `
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchUsersAndTeamQuery:",error);
        throw error;
    }
    }

    export const getTotalTeamsAndEventsQuery = (array) =>{
        try{
            let query = `SELECT
            COUNT(DISTINCT teams.id) AS team_count,
            COUNT(DISTINCT events.id) AS event_count
        FROM
            userTeams
        INNER JOIN
            teams ON userTeams.team_id = teams.id
        INNER JOIN
            events ON teams.event_id = events.id
        WHERE
            userTeams.user_id = ?`;
            return pool.query(query ,array);
        }catch (error){
            console.error("Error executing getTotalTeamsAndeventsQuery : ",error);
            throw(error);
        }
    }
    
    