import pool from "../../../config/db.js"

export const userDetailQuery = (array) => {
    try {
        let query = `SELECT * FROM profiles WHERE email = ? AND is_registered = 1`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing userDetailQuery:", error);
        throw error;
    }
}

export const userRegistrationQuery = (array) => {
    try {
        let query = `INSERT INTO profiles (
            username,
            email,
            password,
            is_registered
            ) VALUES (?,?,?,?);`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing userRegistrationQuery:", error);
        throw error;
    }
}

export const insertTokenQuery = (array) => {
    try {
        let query = `UPDATE profiles SET auth_token = ? WHERE id = ? AND is_registered = 1`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertTokenQuery:", error);
        throw error;
    }
}
export const getUserEventAndRoleDataQuery = (array) => {
    try {
        array = [1111]
        let query = `SELECT e.id as event_id, e.event_name, ut.role_id, r.role_name
        FROM events e
        JOIN userEvents ue ON e.id = ue.event_id
        JOIN teams t ON e.id = t.event_id
        JOIN userTeams ut ON t.id = ut.team_id AND ue.user_id = ut.user_id
        JOIN roles r ON r._id = ut.role_id
        WHERE ue.user_id = ?
        AND e.end_date >= CURDATE()
        ORDER BY ue.created_at DESC
        LIMIT 1;`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getUserEventAndRoleDataQuery:", error);
    }
}

export const updateUserPasswordQuery = (array) => {
    try {
        let query = `UPDATE profiles SET password = ? WHERE email = ? AND is_registered = 1`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateUserPasswordQuery:", error);
        throw error;
    }
}

export const insertOtpQuery = (array) => {
    try {
        let query = `UPDATE profiles SET otp = ? WHERE email = ? AND is_registered = 1`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertOtpQuery:", error);
        throw error;
    }
}

export const getOtpQuery = (array) => {
    try {
        let query = `SELECT otp FROM profiles WHERE email = ? AND is_registered = 1`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getOtpQuery:", error);
        throw error;
    }
}

export const userEmailVerificationQuery = (array) => {
    try {
        let query = `UPDATE profiles SET is_email_verified = ?, otp = null WHERE email = ? AND is_registered = 1`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing userEmailVerificationQuery:", error);
        throw error;
    }
}

export const getUserCurrentTeamAndEventDataQuery = (array) => {
    try {
        let query = `SELECT ue.id AS user_event_id, ue.user_id, ue.event_id,
        e.event_name,
        ut.id AS user_team_id,
        ut.user_id, ut.team_id, ut.role_id,
        t.team_name,
        r.role_name,
        p.username, p.email
 FROM userEvents ue
 JOIN events e ON ue.event_id = e.id
 JOIN userTeams ut ON ue.user_id = ut.user_id
 JOIN teams t ON ut.team_id = t.id
 JOIN roles r ON ut.role_id = r._id
 JOIN profiles p ON ue.user_id = p.id
 WHERE ue.user_id = ?;
 `
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getUserCurrentTeamAndEventDataQuery:", error);
        throw error;
    }
}

export const getAllEventsForUserQuery = (array) => {
    try {
        let query = `SELECT e.id AS event_id, e.event_name, e.start_date, e.end_date
        FROM events e
        JOIN userEvents ue ON e.id = ue.event_id
        WHERE ue.user_id = ?;
        `
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getAllEventsForUserQuery:", error);
        throw error;
    }
}

export const getUserEventAndTeamCountQuery = async(array)=>{
    try {
        let query = `SELECT
        (SELECT COUNT(DISTINCT event_id) FROM userEvents WHERE user_id = ?) AS event_count,
        (SELECT COUNT(DISTINCT team_id) FROM userTeams WHERE user_id = ?) AS team_count;`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getUserEventAndTeamCountQuery:", error);
        throw error
    }
}

export const getUserNameOfTeamMembersQuery = async (array) => {
    try {
        let query = `SELECT
        p.username,
        e.event_name,
        t.team_name
    FROM profiles p
    JOIN userTeams ut ON p.id = ut.user_id
    JOIN teams t ON ut.team_id = t.id
    JOIN events e ON t.event_id = e.id
    WHERE ut.team_id IN (
        SELECT team_id
        FROM userTeams
        WHERE user_id = ?
    );`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getUserNameOfTeamMembersQuery:", error);
        throw error
    }
}