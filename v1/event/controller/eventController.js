import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {createDynamicUpdateQuery, generateReferralCode} from '../../helpers/functions.js'
import {createEventQuery, getEventQuery, getEventsByUserId, getRoleIdQuery, insertUserEventQuery, insertUserTeamQuery, updateEventQuery} from '../model/eventQuery.js'
import { addTeamQuery } from "../../team/model/teamQuery.js"
import { addReferralCodeQuery, checkReferralCode, inactiveReferralCodeQuery, fetchUserDetailsByUserIdQuery,fetchEventDetailsByUserIdQuery } from "../model/referralCodesQuery.js"
dotenv.config();

export const createEventTeamAndReferralCode = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { event_name, event_description, start_date, end_date, team_name, team_size, user_id, role_name="coordinator", coordinator_count, staff_members_count, helpers_count } = req.body;
        const [role_id] = await getRoleIdQuery([role_name]);
        if(role_id.length==0){
            return notFoundResponse(res, '', "role with this name doesn't exists.");
        }
        const event_data = await createEventQuery([event_name, event_description, start_date, end_date])
        const team_data = await addTeamQuery([team_name, team_size, event_data[0].insertId]);
        await insertUserEventQuery([user_id, event_data[0].insertId]);
        await insertUserTeamQuery([user_id, team_data[0].insertId, role_id[0]._id]);

        async function generateReferralCodesForRole(role_type, count) {
            for (let i = 0; i < count; i++) {
                let referral_code = generateReferralCode(10); 
                let [role_id] = await getRoleIdQuery([role_type]);
                await addReferralCodeQuery([referral_code, event_data[0].insertId, team_data[0].insertId, role_id[0]._id ]);
            }
        }

        await generateReferralCodesForRole("coordinator", coordinator_count);
        await generateReferralCodesForRole("staff_member", staff_members_count);
        await generateReferralCodesForRole("helper", helpers_count);

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

export const getAllUserEvents = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const [data] = await getEventsByUserId([user_id]);
        if (data.length==0) {
            return errorResponse(res, '', 'Data not found.');
        }
        return successResponse(res, data, 'Events fetched successfully.');
    } catch (error) {
        next(error);
    }
}

// export const deleteEvent = async (req, res, next) => {
//     try {
//         const event_id = req.params.id;
//         const [data] = await getEventQuery([event_id]);
//         if (data.length==0) {
//             return errorResponse(res, '', 'Data not found.');
//         }
//         await deleteEventQuery([event_id]);
//         return successResponse(res, 'Event deleted successfully.');
//     } catch (error) {
//         next(error);
//     }
// }

export const joinUserTeamWithReferralCode = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {user_id, referral_code} = req.body;

        let [exist_referral_code] = await checkReferralCode([referral_code]);
        let [exist_user] = await fetchUserDetailsByUserIdQuery([user_id]);
        if(exist_user.length == 0){
            return notFoundResponse(res, '', 'User not found.');
        }
        if(exist_referral_code.length == 0){
            return notFoundResponse(res, '', 'Referral Code is Incorrect.');
        }
       
        const [referral_data] = await checkReferralCode([referral_code]);
        let [exist_event_for_same_user] = await fetchEventDetailsByUserIdQuery([user_id, referral_data[0].event_id])

        if(exist_event_for_same_user.length > 0){
            return notFoundResponse(res, '', 'User has already joined the event.');
        }

        await insertUserEventQuery([user_id, referral_data[0].event_id]);
        await insertUserTeamQuery([user_id, referral_data[0].team_id, referral_data[0].role_id]);
        await inactiveReferralCodeQuery([referral_code]);
        return successResponse(res, '', 'User joined event and team successfully.')
    } catch (error) {
        next(error);
    }
}