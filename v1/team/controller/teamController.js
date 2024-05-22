import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import { addTeamQuery, fetchAllTeamsQuery, fetchTeamQuery, updateTeamQuery, deleteTeamQuery, fetchUserTeamQuery, getUserEventTeamQuery } from "../model/teamQuery.js";
import { incrementId, createDynamicUpdateQuery } from "../../helpers/functions.js";
dotenv.config();

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

export const fetchTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { id } = req.body;
    const [data] = await fetchTeamQuery([id]);
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
      return errorResponse(res, errors.array(), "")
    }
    const req_data = req.body; // team_name, team_size
    const team_id = req.params.id;
    const condition = {
      id: team_id
    };
    const [data] = await fetchTeamQuery([team_id]);
    if (data.length == 0) {
      return errorResponse(res, '', 'Data not found.');
    }
    const query_values = await createDynamicUpdateQuery("teams", condition, req_data);
    await updateTeamQuery(query_values.updateQuery, query_values.updateValues)
    return successResponse(res, 'Team updated successfully');
  } catch (error) {
    next(error);
  }
}


// export const deleteTeam = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return errorResponse(res, errors.array(), "")
//     }
//     const { id } = req.body;
//     const [data] = await fetchTeamQuery([id]);
//     if (data.length == 0) {
//       return errorResponse(res, '', 'Data not found.');
//     }
//     await deleteTeamQuery([id]);
//     return successResponse(res, "", 'Team deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// }
