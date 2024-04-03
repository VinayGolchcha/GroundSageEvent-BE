const shopImagesTable = `CREATE TABLE IF NOT EXISTS shop_images (
    id int NOT NULL AUTO_INCREMENT,
    shop_id int NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);`;

export default shopImagesTable;