const transactionTable = `
CREATE TABLE IF NOT EXISTS transactions (
    _id INT NOT NULL AUTO_INCREMENT,
    event_id INT NOT NULL,
    tag varchar(255) NOT NULL,
    type varchar(50) NOT NULL,
    item varchar(255) NOT NULL,
    decided_amount INT NULL,
    entered_amount INT NOT NULL,
    outstanding_amount INT NULL,
    remarks varchar(255),
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (_id),
    FOREIGN KEY (event_id) REFERENCES events (id)
) AUTO_INCREMENT = 1111`;

export default transactionTable;

