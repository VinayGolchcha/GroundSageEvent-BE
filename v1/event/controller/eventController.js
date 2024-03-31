import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {createDynamicUpdateQuery} from '../../helpers/functions.js'
import {createEventQuery, deleteEventQuery, getAllEventsQuery, updateEventQuery} from '../model/eventQuery.js'
dotenv.config();

export const createEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {user_id, event_name, event_description, start_date, end_date} = req.body;
        await createEventQuery([user_id, event_name, event_description, start_date, end_date])
        return successResponse(res, 'Event created successfully.');
    } catch (error) {
        next(error);
    }
}

export const updateEvent = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const id = req.params.id;
        const user_id = req.params.user_id;
        let table = 'events';

        const condition = {
            id: id,
            user_id: user_id
        };
        const req_data = req.body;
        let query_values = await createDynamicUpdateQuery(table, condition, req_data)
        await updateEventQuery(query_values.updateQuery, query_values.updateValues);
        return successResponse(res, 'Event updated successfully.');
    } catch (error) {
        next(error);
    }
}

export const getAllEvents = async (req, res, next) => {
    try {
        const [data] = await getAllEventsQuery();
        return successResponse(res, data, 'Events fetched successfully.');
    } catch (error) {
        next(error);
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const event_id = req.params.id;
        const user_id = req.params.user_id;
        await deleteEventQuery([event_id, user_id]);
        return successResponse(res, 'Event deleted successfully.');
    } catch (error) {
        next(error);
    }
}