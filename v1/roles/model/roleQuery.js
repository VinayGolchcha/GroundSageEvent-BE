import pool from "../../../config/db.js"

export const createRoleQuery= async(array)=>{
    try {
        let query = `INSERT INTO roles (role_name, read_access, write_access, edit_access, delete_access) VALUES (?, ?, ?, ?, ?)`
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing createRoleQuery:", error);
        throw error;
    }
}
export const updateRoleQuery= async(query, array)=>{
    try {
        return pool.query(query, array);
    } catch (error) {
        console.error("Error executing updateRoleQuery:", error);
        throw error;
    }
}