import dotenv from "dotenv"
import { validationResult } from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse, internalServerErrorResponse } from "../../../utils/response.js";
import{ fetchUserDataQuery, fetchLiveEventsDataQuery, getTenantCoordinatorQuery, insertUserFeedbackQuery } from "../model/homeQuery.js"
import { userDetailQuery } from "../../profile/model/profileQuery.js";
import { sendMail } from "../../../config/nodemailer.js";


export const homePage = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }

        const user_id = req.params.id
        const [data] = await fetchUserDataQuery([user_id]);
        if (data.length == 0) {
            return notFoundResponse(res, '', 'Data not found.');
        }

        let event_data = await fetchLiveEventsDataQuery([user_id])
        data.push(event_data[0])
        return successResponse(res, data, 'Data Fetched successfully.');
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

export const userFeedback = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {email, feedback} = req.body;
        const [user_data] = await userDetailQuery([email]);
        if (user_data.length == 0) {
            return notFoundResponse(res, '', 'User not found');
        }
        const [data] = await getTenantCoordinatorQuery([email]);
        if(data.length == 0 || data[0].coordinator_email == email ) {
            return notFoundResponse(res, '', 'You cannot send an email.');
        }
        await insertUserFeedbackQuery([email, data[0].coordinator_email, feedback])
        await sendMail(data[0].coordinator_email, `${feedback}`, 'Feedback received', data[0].sender_name);
        return successResponse(res, "", 'Feedback sent successfully.')
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}