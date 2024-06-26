import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse, internalServerErrorResponse } from "../../../utils/response.js";
import { addRoleQuery, fetchAllRolesQuery, getLastRolesIdQuery, fetchRoleQuery, updateRoleQuery, deleteRoleQuery } from "../model/roleQuery.js";
import {incrementId,createDynamicUpdateQuery} from "../../helpers/functions.js";
dotenv.config();


export const addRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const {role_name,read_access, write_access, edit_access,delete_access } = req.body;
    await addRoleQuery([role_name,read_access,write_access,edit_access,delete_access]);
    return successResponse(res, "", "Roles successfully registered");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

export const fetchAllRoles = async (req, res, next) => {
  try {
    const [data] = await fetchAllRolesQuery();
      if(data.length==0){
          return notFoundResponse(res, "", "Data not found.");
      }
    return successResponse(res, data, "Roles successfully fetched");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

export const deleteRole = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array(), "");
  }
  try {
    const { _id } = req.body;
    await deleteRoleQuery(_id);
    return successResponse(res, "", "role deleted successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

export const fetchRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const id  = req.params.id;
    const [data] = await fetchRoleQuery([id]);
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    return successResponse(res, data, "Role data fetched successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

export const updateRole= async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const req_data = req.body;
    const id = req.params.id;
    const [data] = await fetchRoleQuery([id]);
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    const condition = {
      _id: id,
    };
    const query_values = await createDynamicUpdateQuery("roles", condition, req_data);
    await updateRoleQuery(query_values.updateQuery, query_values.updateValues);
    return successResponse(res, "", "Role updated successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};
