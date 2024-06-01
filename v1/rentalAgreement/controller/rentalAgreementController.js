import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js";
import { addRentalAndTenantAgreementQuery, fetchRentalAgreementQuery, editRentalAgreementQuery, deleteRentalAgreementQuery, addTenantQuery, checkShopExistsQuery, uploadFilesQuery } from "../model/rentalAgreementQuery.js";
import { incrementId, createDynamicUpdateQuery } from "../../helpers/functions.js";
dotenv.config();

export const addRentalAndTenantAgreement = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), "");
    }
    const file = req.file;
    const { name, email, phone_number, address, shop_id, start_date, end_date, rent_amount, rent_mode, event_id} = req.body;
    const tenant_data = [name, email, phone_number, address];
    const [shop_data] = await checkShopExistsQuery([shop_id])
    if(shop_data[0].count==0){
      return notFoundResponse(res, "", "Shop with this id doesn't exists.");
    }
    const [is_shop_exists] = await fetchRentalAgreementQuery([shop_id, event_id]);
    
    if(is_shop_exists.length>0){
      return notFoundResponse(res, "", "Shop agreement already exists!")
    }

    const [data] = await addTenantQuery(tenant_data);
    let tenant_id = data.insertId;
    const rental_data = [shop_id, tenant_id, start_date, end_date, rent_amount, rent_mode, event_id]; 
    const [agreement_data] = await addRentalAndTenantAgreementQuery(rental_data);

    const file_buffer = file.buffer
    const file_name = file.originalname
    await uploadFilesQuery([file_name, tenant_id, agreement_data.insertId, file_buffer])

    return successResponse(res,{id:agreement_data.insertId},"Rental And Tenant Agreement successfully registered" );
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
    const { shop_id, event_id } = req.body;
     const [data] = await fetchRentalAgreementQuery([shop_id, event_id]);
    if (data.length == 0) {
      return notFoundResponse(res, "", "Data not found.");
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

