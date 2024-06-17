const activationCodeTable = `
CREATE TABLE IF NOT EXISTS activationCodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activation_code VARCHAR(255) NOT NULL,
    count INT NOT NULL,
    used_count INT DEFAULT 0 NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (activation_code),
    CHECK (count >= 0),
    CHECK (used_count >= 0),
    CHECK (used_count <= count)
) AUTO_INCREMENT = 1111;
`;

export default activationCodeTable;

