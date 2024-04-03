const userEventTable = `
CREATE TABLE IF NOT EXISTS user_events (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    event_id int NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES profiles(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
) AUTO_INCREMENT = 1111`;

export default userEventTable;