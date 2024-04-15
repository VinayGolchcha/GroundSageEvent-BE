import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import {createNotesQuery,updateNotesQuery,deleteNotesQuery,viewNotesQuery  } from "../model/noteQuery.js";
import {incrementId,createDynamicUpdateQuery} from "../../helpers/functions.js";
dotenv.config();
export const createNotes= async (req, res, next) => {
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

export const deleteNotes = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array(), "");
  }

  try {
    const { _id } = req.body;
    await deleteNotesQuery(_id);
    return successResponse(res, "", "notes deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const viewNotes= async (req, res, next) => {//view notes in descending order
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { _id } = req.body;
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
    const condition = {
      _id: id,
    };
    const query_values = await createDynamicUpdateQuery("Notes", condition, req_data);
    await updateNotesQuery(query_values.updateQuery, query_values.updateValues);
    return successResponse(res, "notes updated successfully");
  } catch (error) {
    next(error);
  }
};
