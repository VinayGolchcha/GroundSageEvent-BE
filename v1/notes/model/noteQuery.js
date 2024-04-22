import pool from "../../../config/db.js";

export const createNoteQuery = (array) => {
  try {
    let query = `INSERT INTO notes(event_id,user_id,notes_heading,notes_description,date) VALUES (?,?,?,?,?) `;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing addNoteQuery:", error);
    throw error;
  }
};

export const fetchNoteQuery = () => {
  try {
    let query = `SELECT * FROM notes ORDER BY created_at DESC`;
    return pool.query(query);
  } catch (error) {
    console.error("Error executing viewNoteQuery:", error);
    throw error;
  }
};
export const deleteNoteQuery = async (_id) => {
  try {
    let query = `DELETE FROM notes WHERE _id = ?`;
    return await pool.query(query, [_id]);
  } catch (error) {
    console.error("Error executing deleteNoteQuery:", error);
    throw error;
  }
};
export const updateNoteQuery = (query, array) => {
  try {
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing updateRoleQuery:", error);
    throw error;
  }
};
