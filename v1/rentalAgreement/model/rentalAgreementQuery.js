import pool from "../../../config/db.js";


export const addRentalAndTenantAgreementQuery = async (array1, array2) => {
  try {
    let query1 = `INSERT INTO tenants(name,email,phone_number,address,id_document) VALUES (?,?,?,?,?)`;
    let query2 = `INSERT INTO Rentalagreements (shop_id,tenant_id,start_date,end_date,rent_amount,rent_mode,event_id) VALUES (?,?,?,?,?,?,?)`;
    pool.query(query1, array1);
    pool.query(query2, array2);
  } catch (error) {
    console.error("Error executing addRentalAndTenantAgreementQuery:", error);
    throw error;
  }
};

export const fetchRentalAgreementQuery = (array) => {
  try {
    let query = `SELECT start_date,end_date,rent_mode,rent_amount FROM rentalagreements WHERE _id = ?  AND shop_id = ?`;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing fetchrentalAgreementQuery:", error);
    throw error;
  }
};

export const editRentalAgreementQuery = (query, value) => {
  try {
    return pool.query(query, value);
  } catch (error) {
    console.error("Error executing editRentalAgreementQuery:", error);
    throw error;
  }
};

export const deleteRentalAgreementQuery = async (_id) => {
  try {
    let query = `DELETE FROM rentalagreements WHERE  _id = ?  `;
    return await pool.query(query, [_id]);
  } catch (error) {
    console.error("Error executing deleteRentalAgreementQuery :", error);
    throw error;
  }
};