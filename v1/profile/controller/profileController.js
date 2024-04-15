import dotenv from "dotenv"
import {validationResult} from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendMail } from "../../../config/nodemailer.js"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import { userDetailQuery, userRegistrationQuery, insertTokenQuery, updateUserPasswordQuery, insertOtpQuery, getOtpQuery, userEmailVerificationQuery} from "../model/profileQuery.js"
dotenv.config();


export const userRegistration = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { username, email, password } = req.body;
        const [existingUser] = await userDetailQuery([email]);
        if (existingUser.length) {
            return errorResponse(res, '', 'User with this email already exists.');
        }
        const password_hash = await bcrypt.hash(password.toString(), 12);
        await userRegistrationQuery([
            username,
            email,
            password_hash,
            1,
            new Date(),
            new Date(),
        ]);
        return successResponse(res, "", 'User successfully registered');
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        let is_email_verified = true;
        const { email, password } = req.body;
        const [user] = await userDetailQuery([email]);
        if (!user.length) {
            return errorResponse(res, '', 'User not found');
        }
        const currentUser = user[0];
        if (currentUser.is_email_verified===0) {
            is_email_verified = false;
            return errorResponse(res, {is_email_verified:is_email_verified}, 'Please verify your email first before proceeding.');
        }
        let message = '';
        let token = '';
        if (email && password) {
            const isPasswordValid = await bcrypt.compare(password, currentUser.password);
            if (isPasswordValid) {
                message = 'You are successfully logged in';
            } else {
                return unAuthorizedResponse(res, '', 'Authentication failed');
            }
        } else {
            return errorResponse(res, '', 'Input fields are incorrect!');
        }
        token = jwt.sign({ id: currentUser.id, name: currentUser.first_name }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
        await insertTokenQuery([token, currentUser.id]);
        return successResponse(res, [{ user_id: currentUser.id, user_name: currentUser.username + " " , is_email_verified: is_email_verified, token: token }], message);
    } catch (error) {
        next(error);
    }
};

export const userLogout = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        await insertTokenQuery(["", user_id]);
        return successResponse(res, '', `You have successfully logged out!`);
    } catch (error) {
        next(error);
    }
}

export const updateUserPassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { email, password, confirm_password } = req.body;
        let [user_data] = await userDetailQuery([email]);
        if (user_data.length == 0) {
            return errorResponse(res, '', 'User not found');
        }
        if (password === confirm_password) {
            const password_hash = await bcrypt.hash(password.toString(), 12);
            await updateUserPasswordQuery([password_hash, email]);
            return successResponse(res,"", 'User password updated successfully');
        } else {
            return errorResponse(res, '', 'Password and confirm password must be same, please try again.');
        }
    } catch (error) {
        next(error);
    }
}

export const sendOtpForEmailVerification = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { email } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
        const otpdata = await insertOtpQuery([otp, email])
        if (otpdata[0].changedRows === 0) {
            return errorResponse(res, '', 'Sorry, user not found. Please take a moment to register for an account.');
        } else {
            const data = await sendMail(email, `${otp} is the OTP for email verification!\n\n\n\nRegards,\nAmarya Business Consultancy`, 'Email Verification');
            return successResponse(res, data, 'OTP for email verification has been sent successfully.');
        }
    } catch (error) {
        next(error);
    }
}

export const verifyEmail = async (req, res, next) => {
    try {
        let { otp, email } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        otp = parseInt(otp, 10);
        const [user_otp] = await getOtpQuery([email]);
        if (otp === user_otp[0].otp) {
            await userEmailVerificationQuery([true, email]);
            return successResponse(res, '', 'Email verification successful.');
        } else {
            return errorResponse(res, '', 'Invalid OTP');
        }
    } catch (error) {
        next(error);
    }
}

export const checkEmailVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        let [user_data] = await userDetailQuery([email]);
        if (user_data.length == 0) {
            return errorResponse(res, '', 'User not found');
        }
        user_data = user_data[0];
        return successResponse(res, { is_email_verified: user_data.is_email_verified }, 'Email verification status.');
    } catch (error) {
        next(error);
    }
}