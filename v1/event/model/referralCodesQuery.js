import pool from "../../../config/db.js"

export const addReferralCodeQuery=(array) =>{
    try {
        let query = `INSERT INTO referralCodes (referral_code, event_id, team_id, role_id) VALUES (?, ?, ?, ?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing addReferralCodeQuery:", error);
        throw error;
    }
}

export const checkReferralCode =(array) =>{
    try {
        let query = `SELECT 
                        rc.*,
                        e.event_name
                    FROM 
                        referralCodes rc
                    JOIN 
                        events e ON rc.event_id = e.id
                    WHERE 
                        rc.referral_code = ? 
                        AND rc.status = 'active';`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing checkReferralCode:", error);
        throw error;
    }
}

export const inactiveReferralCodeQuery =(array) =>{
    try {
        let query = `UPDATE referralCodes SET status = 'inactive' WHERE referral_code = ? AND status = 'active'`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing inactiveReferralCodeQuery:", error);
        throw error;
    }
}

export const fetchUserDetailsByUserIdQuery = (array) => {
    try {
        let query = `SELECT * FROM profiles WHERE id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchUserDetailsByUserIdQuery:", error);
        throw error;
    }
}

export const fetchEventDetailsByUserIdQuery = (array) => {
    try {
        let query = `SELECT * FROM userEvents WHERE user_id = ? AND event_id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchUserDetailsByUserIdQuery:", error);
        throw error;
    }
}

export const fetchReferralCodesByEventAndTeamIdQuery = (array) => {
    try {
        let query = `SELECT 
                    rc.referral_code,
                    rc.role_id,
                    r.role_name
                FROM 
                    referralCodes rc
                JOIN 
                    roles r ON rc.role_id = r._id
                WHERE 
                    rc.event_id = ? AND rc.team_id = ?;`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchUserDetailsByUserIdQuery:", error);
        throw error;
    }
}