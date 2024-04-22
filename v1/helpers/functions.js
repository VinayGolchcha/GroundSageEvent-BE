export const incrementId = async(id)=>{

    if (typeof id !== 'string' || !/^[A-Za-z]+(\d+)$/.test(id)) {
        throw new Error('Invalid input format');
    }
    
    const [, prefix, number] = id.match(/^([A-Za-z]+)(\d+)$/);
    const incrementedNumber = String(Number(number) + 1).padStart(number.length, '0');
    console.log(`${prefix}${incrementedNumber}`);
    return `${prefix}${incrementedNumber}`;
      
}

export const createDynamicUpdateQuery = async(table, condition, req_data)=>{

    let updateQuery = 'UPDATE ' + table + ' SET ';
    let updateValues = [];

    Object.keys(req_data).forEach((key, index, array) => {
    updateQuery += `${key} = ?`;
    updateValues.push(req_data[key]);

    if (index < array.length - 1) {
        updateQuery += ', ';
    }
    });

    updateQuery += ' WHERE ';

    Object.keys(condition).forEach((key, index, array) => {
    updateQuery += `${key} = ?`;
    updateValues.push(condition[key]);

    if (index < array.length - 1) {
        updateQuery += ' AND ';
    }
    });
    return {updateQuery, updateValues};
}

export const generateReferralCode = (length)=> {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
}