import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import { addTeamQuery, fetchAllTeamsQuery, getLastTeamIdQuery, fetchTeamQuery, updateTeamQuery, deleteTeamQuery, fetchUserTeamQuery, getUserEventTeamQuery } from "../model/teamQuery.js";
import { incrementId, createDynamicUpdateQuery } from "../../helpers/functions.js";
dotenv.config();

export const addTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { team_name, team_size } = req.body;
    const [data] = await addTeamQuery([team_name, team_size]);
    return successResponse(res, data, "Team successfully registered");
  } catch (error) {
    next(error);
  }
};

export const fetchAllTeams = async (req, res, next) => {
  try {
    const [data] = await fetchAllTeamsQuery();
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    return successResponse(res, data, "All teams fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const fetchTeams = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { team_id } = req.body;
    const [data] = await fetchTeamQuery([team_id]);
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    return successResponse(res, data, "Team data fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const req_data = req.body; // team_name, team_size
    const team_id = req.params.id;
    const condition = {
      id: team_id,
    };
    const query_values = await createDynamicUpdateQuery("teams", condition, req_data);
    console.log(query_values)
    await updateTeamQuery(query_values.updateQuery, query_values.updateValues);
    return successResponse(res, "Team updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { team_id } = req.body;
    await deleteTeamQuery([team_id]);
    return successResponse(res, "", "Team deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getUserEventTeamCount = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const [data] = await getUserEventTeamQuery([req.body?.user_id]);
    return successResponse(res, "", "list of event and team get successfully");
  } catch (error) {
    next(error);
  }
};

export const fetchUserTeams = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { event_id } = req.body;
    const [data] = await fetchUserTeamQuery([event_id]);
    return successResponse(res, "", "list of event and team get successfully");
  } catch (error) {
    next(error);
  }
};
