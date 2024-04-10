import pool from "../../../config/db.js"

export const userDetailQuery = (array) => {
    let query = `SELECT * FROM profiles WHERE email = ? AND is_registered = 1`
    return pool.query(query, array);
}

export const userRegistrationQuery = (array) => {
    let query = `INSERT INTO profiles (
        username,
        email,
        password,
        is_registered
        ) VALUES (?,?,?,?);`
    return pool.query(query, array);
}

export const insertTokenQuery = (array) => {
    let query = `UPDATE profiles SET auth_token = ? WHERE id = ? AND is_registered = 1`
    return pool.query(query, array);
}

export const updateUserPasswordQuery = (array) => {
    let query = `UPDATE profiles SET password = ? WHERE email = ? AND is_registered = 1`
    return pool.query(query, array);
}

export const insertOtpQuery = (array) => {
    let query = `UPDATE profiles SET otp = ? WHERE email = ? AND is_registered = 1`
    return pool.query(query, array);
}

export const getOtpQuery = (array) => {
    let query = `SELECT otp FROM profiles WHERE email = ? AND is_registered = 1`
    return pool.query(query, array);
}

export const userEmailVerificationQuery = (array) => {
    let query = `UPDATE profiles SET is_email_verified = ?, otp = null WHERE email = ? AND is_registered = 1`
    return pool.query(query, array);
}