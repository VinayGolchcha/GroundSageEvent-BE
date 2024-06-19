import dotenv from "dotenv"
import {validationResult} from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendMail } from "../../../config/nodemailer.js"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse, internalServerErrorResponse } from "../../../utils/response.js"
import { userDetailQuery, userRegistrationQuery, insertTokenQuery, updateUserPasswordQuery, insertOtpQuery, getOtpQuery, userEmailVerificationQuery, getUserCurrentTeamAndEventDataQuery, getAllEventsForUserQuery, getUserEventAndTeamCountQuery, getUserNameOfTeamMembersQuery, getUserEventAndRoleDataQuery, getCoordinatorRole, getUserAboutPageDetailsQuery, updateUsernameQuery, isValidActivationCodeQuery, insertActivationCountQuery} from "../model/profileQuery.js"
dotenv.config();


export const userRegistration = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { username, email, password, activation_code } = req.body;
        const [existingUser] = await userDetailQuery([email]);
        if (existingUser.length) {
            return errorResponse(res, '', 'User with this email already exists.');
        }

        const [activation_data] = await isValidActivationCodeQuery([activation_code]);
        if (!activation_data.length || activation_data[0].used_count >= activation_data[0].count) {
            return notFoundResponse(res, '', 'Invalid or fully used activation code.');
        }
        const new_used_count = activation_data[0].used_count + 1;
        await insertActivationCountQuery(new_used_count, activation_code);

        const password_hash = await bcrypt.hash(password.toString(), 12);
        await userRegistrationQuery([
            username,
            email,
            password_hash,
            1
        ]);
        return successResponse(res, "", 'User successfully registered');
    } catch (error) {
        return internalServerErrorResponse(res, error);
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
        const [user_event_data] = await getUserEventAndRoleDataQuery([currentUser.id]);
        const [default_role] = await getCoordinatorRole()
        const { event_id = "", event_name = "", role_id = default_role[0].role_id, role_name = default_role[0].role_name } = user_event_data[0] || {};
        return successResponse(res, [{
            user_id: currentUser.id,
            user_name: currentUser.username,
            email: email,
            is_email_verified: is_email_verified,
            token: token,
            event_id: event_id,
            event_name: event_name,
            role_id: role_id,
            role_name: role_name
        }],
            message);
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
};

export const userLogout = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        await insertTokenQuery(["", user_id]);
        return successResponse(res, '', `You have successfully logged out!`);
    } catch (error) {
        return internalServerErrorResponse(res, error);
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
            return notFoundResponse(res, '', 'User not found');
        }
        if (password === confirm_password) {
            const password_hash = await bcrypt.hash(password.toString(), 12);
            await updateUserPasswordQuery([password_hash, email]);
            return successResponse(res,"", 'User password updated successfully');
        } else {
            return errorResponse(res, '', 'Password and confirm password must be same, please try again.');
        }
    } catch (error) {
        return internalServerErrorResponse(res, error);
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
        const otp_data = await insertOtpQuery([otp, email])
        if (otp_data[0].changedRows === 0) {
            return errorResponse(res, '', 'Sorry, user not found. Please take a moment to register for an account.');
        } else {
            const data = await sendMail(email, `${otp} is the OTP for email verification!\n\n\n\nRegards,\nEvent Sage Community`, 'Email Verification');
            return successResponse(res, data, 'OTP for email verification has been sent successfully.');
        }
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

export const verifyEmail = async (req, res, next) => {
    try {
        let { otp, email } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const [user] = await userDetailQuery([email]);
        if (!user.length) {
            return errorResponse(res, '', 'User not found');
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
        return internalServerErrorResponse(res, error);
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
            return notFoundResponse(res, '', 'User not found');
        }
        user_data = user_data[0];
        return successResponse(res, { is_email_verified: user_data.is_email_verified }, 'Email verification status.');
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

export const getCurrentEventTeamAndRoleBasedOnUserId = async(req, res, next)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {user_id} = req.body;
        const [data] = await getUserCurrentTeamAndEventDataQuery([user_id]);
        if (data.length == 0) {
            return notFoundResponse(res, '', 'Data not found');
        }
        return successResponse(res,data, 'Data fetched successfully.')
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

export const getAllEventsBasedOnUserId = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {user_id} = req.body;
        const [data] = await getAllEventsForUserQuery([user_id]);
        if (data.length == 0) {
            return notFoundResponse(res, '', 'Data not found');
        }
        return successResponse(res, data, 'Data fetched successfully.')
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

export const getUserEventAndTeamCount = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {user_id} = req.body;
        const [count] = await getUserEventAndTeamCountQuery([user_id, user_id])
        const [event_data] = await getUserNameOfTeamMembersQuery([user_id])
        const events = event_data.reduce((acc, row) => {
            const { username, event_name } = row;
            if (!acc[event_name]) {
                acc[event_name] = new Set();
            }
            acc[event_name].add(username);
            return acc;
        }, {});
        const result = Object.keys(events).map(event_name => {
            const members = Array.from(events[event_name])
            return {
            event_name,
            members,
            member_count: members.length
        }});
        return successResponse(res, {count: count[0], event_data:result}, 'Events and teams count fetched successfully.')
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

export const getAboutPageDetails = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {user_id, username} = req.body;
        if(username){
            await updateUsernameQuery([username, user_id]);
        }
        const [user_data] = await getUserAboutPageDetailsQuery([user_id])
        if (user_data.length == 0) {
            return notFoundResponse(res, '', 'Data not found');
        }
        return successResponse(res, user_data, 'User about page data fetched successfully.')
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}