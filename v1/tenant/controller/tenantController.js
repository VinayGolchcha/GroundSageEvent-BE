import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import {  fetchTenantsDataQuery} from "../model/tenantQuery.js";
import { incrementId, createDynamicUpdateQuery } from "../../helpers/functions.js";
dotenv.config();

export const fetchTenantsData= async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), "");
      }
      const { event_id,from_date,to_date} = req.body;
       const [data] = await fetchTenantsDataQuery([event_id,from_date,to_date]);
      if (data.length == 0) {
        return errorResponse(res, "", "Data not found.");
      }
      return await successResponse(res, data, "Tenants data fetched successfully");
    } catch (error) {
      next(error);
    }
  };