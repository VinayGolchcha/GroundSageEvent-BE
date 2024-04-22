 const rentalAgreementTable = 
`CREATE TABLE IF NOT EXISTS rentalagreements (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    shop_id INT,
    tenant_id INT,
    start_date DATE,
    end_date DATE,
    rent_amount INT,
    rent_mode ENUM('day', 'week', 'month'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    event_id INT,
    FOREIGN KEY (shop_id) REFERENCES shops(id),
    FOREIGN KEY (tenant_id) REFERENCES tenants(_id),
    FOREIGN KEY (event_id) REFERENCES events(id)
) AUTO_INCREMENT = 1111`;
export default rentalAgreementTable;

