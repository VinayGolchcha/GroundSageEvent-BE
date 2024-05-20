const imagesTable = `CREATE TABLE IF NOT EXISTS images (
    _id int NOT NULL AUTO_INCREMENT,
    type ENUM('shop', 'event') NOT NULL,
    shop_id int DEFAULT NULL,
    event_id int DEFAULT NULL,
    image_url VARCHAR(255) NOT NULL,
    public_id varchar(255) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (_id)
);`;

export default imagesTable;