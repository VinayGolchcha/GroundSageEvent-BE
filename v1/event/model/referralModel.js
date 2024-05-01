const referralCodesTable = `
CREATE TABLE IF NOT EXISTS referralCodes (
    _id int NOT NULL AUTO_INCREMENT,
    referral_code VARCHAR(255) NOT NULL,
    event_id int NOT NULL,
    team_id int NOT NULL,
    role_id int NOT NULL,
    status VARCHAR(10) DEFAULT 'active',
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (_id),
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (team_id) REFERENCES teams (id),
    FOREIGN KEY (role_id) REFERENCES roles (_id)
) AUTO_INCREMENT = 1111`;

export default referralCodesTable;