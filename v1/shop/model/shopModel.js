const shopTable = `
CREATE TABLE IF NOT EXISTS shops (
    id int NOT NULL AUTO_INCREMENT,
    event_id int NOT NULL,
    shop_number int NOT NULL UNIQUE,
    description text NOT NULL,
    area varchar(255) NOT NULL,
    rent int NOT NULL,
    location varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (event_id) REFERENCES events(id)
) AUTO_INCREMENT = 1111`;

export default shopTable;