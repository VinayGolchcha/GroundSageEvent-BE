import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse, internalServerErrorResponse } from "../../../utils/response.js";
import { createNoteQuery, fetchNoteQuery, updateNoteQuery, deleteNoteQuery } from "../model/noteQuery.js";
import { incrementId, createDynamicUpdateQuery } from "../../helpers/functions.js";
dotenv.config();

export const createNote= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    try {
      const {event_id,user_id,notes_heading,notes_description,date} = req.body;
      const [data] = await createNoteQuery([event_id,user_id,notes_heading,notes_description,date]);
      return successResponse(res, {note_id:data.insertId}, "Notes successfully created");
    } catch (error) {
      return internalServerErrorResponse(res, error);
    }
  };

export const fetchNotesById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const user_id = req.params.id
    const event_id = req.params.event_id
     const [data] = await fetchNoteQuery([event_id, user_id]);
    if (data.length == 0) {
      return notFoundResponse(res, "", "Data not found.");
    }
    return await successResponse(res, data, "Notes data fetched successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const req_data = req.body; 
    const _id = req.params.id;
    const condition = {
       _id: _id
    };
   const query_values = await createDynamicUpdateQuery("notes", condition, req_data);
   await updateNoteQuery(query_values.updateQuery, query_values.updateValues);
   return successResponse(res, "notes updated successfully");
   } catch (error) {
     return internalServerErrorResponse(res, error);
   }
 };

export const deleteNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const  {ids}  = req.body;
    const data = await deleteNoteQuery(ids);
    console.log(data);
    return successResponse(res, "", " notes deleted successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};


