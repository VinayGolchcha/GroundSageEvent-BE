import pool from "../../../config/db.js"

export const insertActivationCodeQuery = (array) => {
    try {
        let query = `INSERT INTO activationCodes (activation_code, count) VALUES (?, ?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing insertActivationCodeQuery:", error);
        throw error;
    }
}