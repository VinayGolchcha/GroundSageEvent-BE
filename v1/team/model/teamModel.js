const teamTable = `
CREATE TABLE IF NOT EXISTS teams (
    id int NOT NULL AUTO_INCREMENT,
    team_name varchar(255) NOT NULL,
    team_size int NOT NULL,
    event_id int NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,,
    FOREIGN KEY (event_id) REFERENCES events(id),
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1111`;

export default teamTable;
//remove team_id
//add event_id as a foreign key