const userTeamTable = `
CREATE TABLE IF NOT EXISTS userTeams (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    team_id int NOT NULL,
    role_id int NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (team_id) REFERENCES teams (id),
    FOREIGN KEY (user_id) REFERENCES profiles (id),
    FOREIGN KEY (role_id) REFERENCES roles (_id)
) AUTO_INCREMENT = 1111`;

export default userTeamTable;