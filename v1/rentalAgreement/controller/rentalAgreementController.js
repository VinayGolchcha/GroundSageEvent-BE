
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import { addRentalAndTenantAgreementQuery, fetchRentalAgreementQuery, editRentalAgreementQuery, deleteRentalAgreementQuery } from "../model/rentalAgreementQuery.js";
import { incrementId, createDynamicUpdateQuery } from "../../helpers/functions.js";
dotenv.config();

export const addRentalAndTenantAgreement = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { name, email, phone_number, address, id_document,_id, shop_id, tenant_id, start_date, end_date, rent_amount, rent_mode, event_id} = req.body;
    const array1 = [name, email, phone_number, address, id_document];
    const array2 = [shop_id, 'test', start_date, end_date, rent_amount, rent_mode, event_id]; 
    await addRentalAndTenantAgreementQuery(array1, array2);
    return successResponse(res,"Rental And Tenant Agreement successfully registered" );
  } catch (error) {
    next(error);
  }
};

export const fetchRentalAgreement = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { _id, shop_id } = req.body;
     const [data] = await fetchRentalAgreementQuery([_id, shop_id]);
    if (data.length == 0) {
      return errorResponse(res, "", "Data not found.");
    }
    return await successResponse(res, data, "Rental Agreement data fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const editRentalAgreement = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const req_data = req.body; 
    const shop_id = req.params.shopid;
    const _id = req.params.id;
    const condition = {
      shopid: shop_id,
      id: _id
    };
    const query_values = await createDynamicUpdateQuery("rentalagreements", condition, req_data);
    await editRentalAgreementQuery(query_values.updateQuery, query_values.updateValues);
    return successResponse(res, "rental agreement updated successfully");
  } catch (error) {
    next(error);
  }
};
export const deleteRentalAgreement = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const { _id } = req.body;
    await deleteRentalAgreementQuery([_id]);
    return successResponse(res, "", "Rental agreement details deleted successfully");
  } catch (error) {
    next(error);
  }
};

