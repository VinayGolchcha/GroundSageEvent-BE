const feedbackTable = `
CREATE TABLE IF NOT EXISTS feedbacks (
    id int NOT NULL AUTO_INCREMENT,
    sender_email varchar(255) NOT NULL,
    receiver_email varchar(255) NOT NULL,
    feedback varchar(300) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1111`;

export default feedbackTable;

