import pool from "../../../config/db.js"

export const fetchUserDataQuery =(array) =>{
    try {
        let query = `SELECT id, username FROM profiles WHERE id = ?`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchUserDataQuery:", error);
        throw error;
    }
}

export const fetchLiveEventsDataQuery =(array) =>{
    try {
        let query = `SELECT
                        e.id,
                        e.event_name,
                        e.event_description,
                        DATE_FORMAT(e.start_date, '%Y-%m-%d') AS start_date,
                        DATE_FORMAT(e.end_date, '%Y-%m-%d') AS end_date,
                        i.image_url,
                        i.public_id,
                        i.original_filename
                    FROM
                        events e
                    JOIN
                        userEvents ue ON e.id = ue.event_id
                    LEFT JOIN
                        images i ON i._id = (
                            SELECT _id
                            FROM images
                            WHERE event_id = e.id
                            LIMIT 1
                        )
                    WHERE
                        ue.user_id = ?
                        AND e.end_date > CURRENT_DATE
                        AND e.start_date <= CURRENT_DATE;`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing fetchLiveEventsDataQuery:", error);
        throw error;
    }
}

export const getTenantCoordinatorQuery =(array) =>{
    try {
        let query = `SELECT p2.email AS coordinator_email, p1.username AS sender_name
        FROM profiles p1
        JOIN userTeams ut1 ON p1.id = ut1.user_id
        JOIN userTeams ut2 ON ut1.team_id = ut2.team_id
        JOIN profiles p2 ON ut2.user_id = p2.id
        JOIN roles r ON ut2.role_id = r._id
        WHERE p1.email = ? AND r.role_name = 'coordinator'
        ORDER BY ut2.created_at DESC LIMIT 1;
        `
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing getTenantCoordinatorQuery:", error);
        throw error;
    }
}

export const insertUserFeedbackQuery =(array) =>{
    try {
        let query = `INSERT INTO feedbacks (sender_email, receiver_email, feedback) VALUES (?,?,?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertUserFeedbackQuery:", error);
        throw error;
    }
}