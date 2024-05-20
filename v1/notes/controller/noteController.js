import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
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
      await createNoteQuery([event_id,user_id,notes_heading,notes_description,date]);
      return successResponse(res, "", "Notes successfully created");
    } catch (error) {
      next(error);
    }
  };

export const fetchNotes = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
     const [data] = await fetchNoteQuery();
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    return await successResponse(res, data, "Notes data view successfully");
  } catch (error) {
    next(error);
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
     next(error);
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
    next(error);
  }
};


