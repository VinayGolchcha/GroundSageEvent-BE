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