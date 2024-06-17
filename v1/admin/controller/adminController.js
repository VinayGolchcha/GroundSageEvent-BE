import dotenv from "dotenv"
import { validationResult } from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse, internalServerErrorResponse } from "../../../utils/response.js"
import { insertActivationCodeQuery } from "../model/adminQuery.js";

export const generateActivationCodeByAdmin =async (req, res, next)=>{
    try {
        const {count} = req.body;
        function generateActivationCode(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
          }
          const activation_code = generateActivationCode(process.env.ACTIVATION_CODE_LENGTH);
          await insertActivationCodeQuery([activation_code, count])
        return successResponse(res, {code:activation_code},`Activation code generated successfully, valid for only ${count} registrations.`);
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}