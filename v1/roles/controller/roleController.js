import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {createDynamicUpdateQuery} from '../../helpers/functions.js'
import {createRoleQuery, updateRoleQuery} from '../model/roleQuery.js'
dotenv.config();

export const createRole = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {role_name,read_access, write_access, edit_access, delete_access} = req.body;
        await createRoleQuery([role_name,read_access, write_access, edit_access, delete_access])
        return successResponse(res, 'Role created successfully.');
    } catch (error) {
        next(error);
    }
}

export const updateRole = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const id = req.params.id;
        const role_name = req.body.role_name;
        let table = 'roles';

        const condition = {
            id: id,
            role_name: role_name
        };
        const req_data = req.body;
        let query_values = await createDynamicUpdateQuery(table, condition, req_data)
        await updateRoleQuery(query_values.updateQuery, query_values.updateValues);
        return successResponse(res, 'Event updated successfully.');
    } catch (error) {
        next(error);
    }
}