const noteTable =
    `CREATE TABLE IF NOT EXISTS notes (
            _id INT NOT NULL  AUTO_INCREMENT,
            event_id INT,
            user_id INT,
            notes_heading VARCHAR(255),
            notes_description VARCHAR(255),
            date DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (_id),
            FOREIGN KEY (event_id) REFERENCES events(id),
            FOREIGN KEY (user_id) REFERENCES profiles(id)   
    ) AUTO_INCREMENT = 1111`;
export default noteTable;