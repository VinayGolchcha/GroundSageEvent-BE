
const eventTable = `
CREATE TABLE IF NOT EXISTS events (
    id int NOT NULL AUTO_INCREMENT,
    event_name varchar(255) NOT NULL,
    event_description LONGTEXT NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1111`;

export default eventTable;

