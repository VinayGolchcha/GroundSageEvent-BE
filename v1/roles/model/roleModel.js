const roleTable = `
CREATE TABLE IF NOT EXISTS roles (
    id int NOT NULL AUTO_INCREMENT,
    role_name varchar(255) NOT NULL,
    read_access TINYINT(1) NOT NULL CHECK (read_access IN (0, 1)),
    write_access TINYINT(1) NOT NULL CHECK (write_access IN (0, 1)),
    edit_access TINYINT(1) NOT NULL CHECK (edit_access IN (0, 1)),
    delete_access TINYINT(1) NOT NULL CHECK (delete_access IN (0, 1)),
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1111`;

export default roleTable;
