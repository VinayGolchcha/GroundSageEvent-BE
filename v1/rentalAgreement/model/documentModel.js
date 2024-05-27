const documentsTable = 
`CREATE TABLE IF NOT EXISTS documents (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT,
    rental_agreement_id INT,
    file_name varchar(255) NOT NULL,
    buffer lONGBLOB NOT NULL
) AUTO_INCREMENT = 1111`;
export default documentsTable;