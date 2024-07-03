import pool from "../../../config/db.js";


export const addRentalAndTenantAgreementQuery = async (array2) => {
  try {
    let query2 = `INSERT INTO rentalagreements (shop_id,tenant_id,start_date,end_date,rent_amount,rent_mode,event_id) VALUES (?,?,?,?,?,?,?)`;
    return pool.query(query2, array2);
  } catch (error) {
    console.error("Error executing addRentalAndTenantAgreementQuery:", error);
    throw error;
  }
};

export const updateShopStatusQuery = async (array) => {
  try {
    let query = `UPDATE shops SET status = 'occupied' WHERE id = ?`;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing updateShopStatusQuery:", error);
    throw error;
  }
};

export const addTenantQuery = async (array1) =>{
  try {
    let query1 = `INSERT INTO tenants(name,email,phone_number,address) VALUES (?,?,?,?)`;
    return pool.query(query1, array1);
  } catch (error) {
    console.error("Error executing addTenantQuery:", error);
    throw error;
  }
}

export const checkShopExistsQuery = async (array) =>{
  try {
    let query = `SELECT COUNT(*) as count FROM shops where id = ? `;
    return pool.query(query, array);
  } catch (error) {
    console.error("Error executing checkShopExistsQuery:", error);
    throw error;
  }
}

export const fetchRentalAgreementQuery = (array) => {
  try {
    let query = `SELECT 
     ra._id as agreement_id,
     ra.tenant_id, 
     t.name AS tenant_name,
     t.email AS tenant_email,
     t.phone_number AS tenant_phone_number,
     t.address AS tenant_address,
     ra.event_id,
     e.event_name,
     ra.start_date,
     ra.end_date,
     ra.rent_mode,
     ra.rent_amount,
     d.file_name,
     d.buffer
    FROM rentalagreements AS ra
    LEFT JOIN tenants AS t ON ra.tenant_id = t._id
    LEFT JOIN events AS e ON ra.event_id = e.id
    LEFT JOIN documents AS d ON ra._id = d.rental_agreement_id
    WHERE shop_id = ? AND event_id = ?`;
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

export const uploadFilesQuery = async(array)=>{
  try {
      let query = `INSERT INTO documents (file_name, tenant_id, rental_agreement_id, buffer) VALUES (?,?,?,?)`;
      return await pool.query(query, array);
  } catch (error) {
      console.error("Error executing uploadFilesQuery:", error);
      throw error;
  }
}