import pool from "../../../config/db.js";

export const addRoleQuery = (array) => {
  try {
    let query = `INSERT INTO roles (role_name,read_access,write_access,edit_access,delete_access) VALUES (?,?,?,?,?) `;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing addRoleQuery:", error);
    throw error;
  }
};
export const fetchAllRolesQuery = async() => {
  try {
    let query = `SELECT * FROM roles`;
    return pool.query(query);
  } catch (error) {
    console.error("Error executing fetchAllRolesQuery:", error);
    throw error;
  }
};
export const fetchRoleQuery = (array) => {
  try {
    console.log("_id", array);
    let query = `SELECT *  FROM roles WHERE _id = ?`;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing fetchRoleQuery:", error);
    throw error;
  }
};

export const getLastRolesIdQuery = () => {
  try {
    let query = `SELECT _id FROM roles ORDER BY _id DESC LIMIT 1`;
    return pool.query(query);
  } catch (error) {
    console.error("Error executing getLastRolesIdQuery:", error);
    throw error;
  }
};
export const deleteRoleQuery = async (_id) => {
  try {
    let query = `DELETE FROM roles WHERE _id = ?`;
    return await pool.query(query, [_id]);
  } catch (error) {
    console.error("Error executing deleteRoleQuery:", error);
    throw error;
  }
};
export const updateRoleQuery = (query, array) => {
  try {
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing updateRoleQuery:", error);
    throw error;
  }
};
