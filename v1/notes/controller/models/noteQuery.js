import pool from "../../../config/db.js";

export const createNotesQuery = (array) => {
  try {
    let query = `INSERT INTO roles (role_name,read_access,write_access,edit_access,delete_access) VALUES (?,?,?,?,?) `;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing addRolesQuery:", error);
    throw error;
  }
};

export const viewNotesQuery = () => {
  try {
    let query = `SELECT _id FROM notes ORDER BY _id DESC LIMIT 1`;
    return pool.query(query);
  } catch (error) {
    console.error("Error executing viewNotesQuery:", error);
    throw error;
  }
};
export const deleteNotesQuery = async (_id) => {
  try {
    let query = `DELETE FROM notes WHERE _id = ?`;
    return await pool.query(query, [_id]);
  } catch (error) {
    console.error("Error executing deleteNotesQuery:", error);
    throw error;
  }
};
export const updateNotesQuery = (query, array) => {
  try {
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing updateNotesQuery:", error);
    throw error;
  }
};
