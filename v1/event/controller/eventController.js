import dotenv from "dotenv"
import { validationResult } from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import { createDynamicUpdateQuery, generateReferralCode } from '../../helpers/functions.js'
import {
    createEventQuery, getEventQuery, getEventsByUserId, getRoleIdQuery, insertUserEventQuery, insertUserTeamQuery,
    updateEventQuery, fetchLastEventQuery
} from '../model/eventQuery.js'
import { addTeamQuery } from "../../team/model/teamQuery.js"
import { uploadImageToCloud, deleteImageFromCloud } from '../../helpers/cloudinary.js';
import { insertImageForEventQuery, deleteImageQuery, fetchImagesBasedOnIdForEventQuery } from '../../images/imagesQuery.js';
import {
    addReferralCodeQuery, checkReferralCode, inactiveReferralCodeQuery, fetchUserDetailsByUserIdQuery, fetchEventDetailsByUserIdQuery,
    fetchReferralCodesByEventAndTeamIdQuery
} from "../model/referralCodesQuery.js"
dotenv.config();

export const createEventTeamAndReferralCode = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }

        let response = []
        const files = req.files;
        const { event_name, event_description, start_date, end_date, team_name, team_size, user_id, role_name = "coordinator", coordinator_count, staff_members_count, helpers_count } = req.body;
        const [role_id] = await getRoleIdQuery([role_name]);
        if (role_id.length == 0) {
            return notFoundResponse(res, '', "Role with this name doesn't exists.");
        }

        if (parseInt(team_size) < (parseInt(coordinator_count) + parseInt(staff_members_count) + parseInt(helpers_count))) {
            return notFoundResponse(res, '', "Team size given and different roles count given does not match, pls check the data again.");
        }

        await createEventQuery([event_name, event_description, start_date, end_date])
        const [event_data] = await fetchLastEventQuery()
        const team_data = await addTeamQuery([team_name, team_size, event_data[0].id]);
        await insertUserEventQuery([user_id, event_data[0].id]);
        await insertUserTeamQuery([user_id, team_data[0].insertId, role_id[0]._id]);

        async function generateReferralCodesForRole(role_type, count) {
            for (let i = 0; i < count; i++) {
                let referral_code = generateReferralCode(10);
                let [role_id] = await getRoleIdQuery([role_type]);
                await addReferralCodeQuery([referral_code, event_data[0].id, team_data[0].insertId, role_id[0]._id]);
            }
        }

        for (let image of files) {
            const imageBuffer = image.buffer;
            let uploaded_data = await uploadImageToCloud(imageBuffer);
            await insertImageForEventQuery(["event", uploaded_data.secure_url, uploaded_data.public_id, event_data[0].id, image.originalname])
        }

        await generateReferralCodesForRole("coordinator", coordinator_count);
        await generateReferralCodesForRole("staff_member", staff_members_count);
        await generateReferralCodesForRole("helper", helpers_count);

        let [role_data] = await fetchReferralCodesByEventAndTeamIdQuery([event_data[0].id, team_data[0].insertId]);

        let data = {
            event_id: event_data[0].id,
            event_name: event_data[0].event_name,
            roles: role_data
        }
        response.push(data)
        return successResponse(res, response, 'Event and team created successfully.');
    } catch (error) {
        next(error);
    }
}

export const updateEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const id = req.params.id;
        const files = req.files;
        const req_data = req.body;

        if ((req_data.public_ids).length > 0) {
            const public_ids = JSON.parse(req_data.public_ids);
            //delete image
            for (let public_id of public_ids) {
                await deleteImageFromCloud(public_id);
                let [image_data] = await deleteImageQuery([public_id])
            }
        }

        delete req_data.public_ids;
        delete req_data.files;
        let table = 'events';

        const condition = {
            id: id
        };
        const [data] = await getEventQuery([id]);
        if (data.length == 0) {
            return errorResponse(res, '', 'Data not found.');
        }

        let query_values = await createDynamicUpdateQuery(table, condition, req_data)
        await updateEventQuery(query_values.updateQuery, query_values.updateValues);

        //Upload new images to cloudinary and database
        for (let image of files) {
            const imageBuffer = image.buffer;
            let uploaded_data = await uploadImageToCloud(imageBuffer);
            await insertImageForEventQuery(["event", uploaded_data.secure_url, uploaded_data.public_id, id, image.originalname])
        }
        return successResponse(res, 'Event updated successfully.');
    } catch (error) {
        next(error);
    }
}

export const getAllUserEvents = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const [data] = await getEventsByUserId([user_id]);
        if (data.length == 0) {
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

export const joinUserTeamWithReferralCode = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const { user_id, referral_code } = req.body;

        let [exist_referral_code] = await checkReferralCode([referral_code]);
        let [exist_user] = await fetchUserDetailsByUserIdQuery([user_id]);
        if (exist_user.length == 0) {
            return notFoundResponse(res, '', 'User not found.');
        }
        if (exist_referral_code.length == 0) {
            return notFoundResponse(res, '', 'Referral Code is Incorrect.');
        }

        const [referral_data] = await checkReferralCode([referral_code]);
        let [exist_event_for_same_user] = await fetchEventDetailsByUserIdQuery([user_id, referral_data[0].event_id])

        if (exist_event_for_same_user.length > 0) {
            return notFoundResponse(res, '', 'User has already joined the event.');
        }

        await insertUserEventQuery([user_id, referral_data[0].event_id]);
        await insertUserTeamQuery([user_id, referral_data[0].team_id, referral_data[0].role_id]);
        await inactiveReferralCodeQuery([referral_code]);

        let data = {
            event_id: referral_data[0].event_id,
            event_name: referral_data[0].event_name,
            role_id: referral_data[0].role_id,
            team_id: referral_data[0].team_id,
            user_id: user_id
        }
        return successResponse(res, data, 'User joined event and team successfully.')
    } catch (error) {
        next(error);
    }
}