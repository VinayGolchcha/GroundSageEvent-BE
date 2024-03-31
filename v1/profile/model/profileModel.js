const profileTable = `
CREATE TABLE IF NOT EXISTS profiles (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role_id int NOT NULL,
    team_id int NOT NULL,
    otp int DEFAULT NULL,
    is_registered tinyint(1) NOT NULL,
    is_email_verified boolean DEFAULT false,
    auth_token varchar(255) DEFAULT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY email (email),
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (team_id) REFERENCES teams (id)
) AUTO_INCREMENT = 1111`;

export default profileTable;

//add team_id and role_id as array
