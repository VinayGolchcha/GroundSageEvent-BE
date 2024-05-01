import pool from "../../../config/db.js";

export const fetchTenantsDataQuery = (array) => {
    try {
      let query = `SELECT
      rentalagreements.tenant_id AS tenant_id,
      tenants.name AS tenant_name,
      DATE_FORMAT(start_date, '%d/%m/%y') AS start_date,
      DATE_FORMAT(end_date, '%d/%m/%y') AS end_date
  FROM
      rentalagreements
  INNER JOIN
      tenants ON rentalagreements.tenant_id = tenants._id
  WHERE
  rentalagreements.event_id = ?
  AND DATE_FORMAT(start_date, '%d/%m/%y') >= ? 
AND DATE_FORMAT(end_date, '%d/%m/%y') <= ?;`
      return pool.query(query, array);
    } catch (error) {
      console.error("Error executing fetchTenantsDataQuery:", error);
      throw error;
    }
  };