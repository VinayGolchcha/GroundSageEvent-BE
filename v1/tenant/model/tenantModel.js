const tenantTable = `
CREATE TABLE IF NOT EXISTS tenants (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number BIGINT(15),
    address VARCHAR(255),
    id_document VARCHAR(255),
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP
) AUTO_INCREMENT = 1111
`;
export default   tenantTable;

