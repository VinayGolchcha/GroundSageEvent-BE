import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {createDynamicUpdateQuery} from '../../helpers/functions.js'
import {createEventQuery, deleteEventQuery, getAllEventsQuery, getEventQuery, getLastEventIdQuery, getLastTeamIdQuery, getRoleIdQuery, insertUserEventQuery, insertUserTeamQuery, updateEventQuery} from '../model/eventQuery.js'
import { addTeamQuery } from "../../team/model/teamQuery.js"
dotenv.config();

export const createEventTeamAndReferralCode = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { event_name, event_description, start_date, end_date, team_name, team_size, user_id, role_name } = req.body;
        await createEventQuery([event_name, event_description, start_date, end_date])
        const [event_id] = await getLastEventIdQuery();
        await addTeamQuery([team_name, team_size, event_id[0].id]);
        await insertUserEventQuery([user_id, event_id[0].id]);
        const [team_data] = await getLastTeamIdQuery();
        const [role_id] = await getRoleIdQuery([role_name]);
        await insertUserTeamQuery([user_id, team_data[0].id, role_id[0]._id]);
        return successResponse(res,"", 'Event and team created successfully.');
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
        let table = 'events';

        const condition = {
            id: id
        };
        const [data] = await getEventQuery([id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
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
        const [data] = await getEventQuery([event_id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
        await deleteEventQuery([event_id]);
        return successResponse(res, 'Event deleted successfully.');
    } catch (error) {
        next(error);
    }
}
