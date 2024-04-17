import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import { addRolesQuery, fetchAllRolesQuery, getLastRolesIdQuery, fetchRolesQuery, updateRolesQuery, deleteRolesQuery } from "../model/roleQuery.js";
import {incrementId,createDynamicUpdateQuery} from "../../helpers/functions.js";
dotenv.config();

export const addRoles = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array(), "");
  }
  try {
    const {role_name,read_access, write_access, edit_access,delete_access } = req.body;
    await addRolesQuery([role_name,read_access,write_access,edit_access,delete_access]);
    return successResponse(res, "", "Roles successfully registered");
  } catch (error) {
    next(error);
  }
};

export const fetchAllRoles = async (req, res, next) => {
  try {
    const roles = await fetchAllRolesQuery();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const deleteRoles = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array(), "");
  }

  try {
    const { _id } = req.body;
    await deleteRolesQuery(_id);
    return successResponse(res, "", "roles deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const fetchRoles = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const _id  = req.params.id;
    const [data] = await fetchRolesQuery(_id);
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    return successResponse(res, data, "Roles data fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateRoles= async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const req_data = req.body;
    const id = req.params.id;
    const [data] = await fetchRolesQuery(id);
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    const condition = {
      _id: id,
    };
    const query_values = await createDynamicUpdateQuery("roles", condition, req_data);
    await updateRolesQuery(query_values.updateQuery, query_values.updateValues);
    return successResponse(res, "roles updated successfully");
  } catch (error) {
    next(error);
  }
};
