import dotenv from "dotenv"
import { validationResult } from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse, internalServerErrorResponse } from "../../../utils/response.js";
import{ fetchUserDataQuery, fetchLiveEventsDataQuery } from "../model/homeQuery.js"


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

        let [event_data] = await fetchLiveEventsDataQuery([user_id])
        event_data.push(data[0])
        return successResponse(res, event_data, 'Data Fetched successfully.');
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}