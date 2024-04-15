import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {createDynamicUpdateQuery} from '../../helpers/functions.js'
import {createShopQuery, deleteShopQuery, getAllShopsQuery, getShopsQuery, updateShopQuery} from '../model/shopQuery.js'
dotenv.config();

export const createShop = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {event_id, shop_number, description, area, rent, location, status} = req.body;
        await createShopQuery([event_id, shop_number, description, area, rent, location, status])
        return successResponse(res, 'Shop created successfully.');
    } catch (error) {
        next(error);
    }
}

export const updateShop = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const shop_id = req.params.id;
        const event_id = req.params.event_id;
        let table = 'shops';

        const condition = {
            id: shop_id,
            event_id: event_id
        };
        const [data] = await getShopsQuery([shop_id, event_id]);
        if(data.length==0){
            return notFoundResponse(res, "", "Data not found.");
        }
        const req_data = req.body; //shop_number, description, area, rent, location, status, images
        let query_values = await createDynamicUpdateQuery(table, condition, req_data)
        await updateShopQuery(query_values.updateQuery, query_values.updateValues);
        return successResponse(res, 'Shop updated successfully.');
    } catch (error) {
        next(error);
    }
}

export const getAllShops = async (req, res, next) => {
    try {
        const [data] = await getAllShopsQuery();
        if(data.length==0){
            return notFoundResponse(res, "", "Data not found.");
        }
        return successResponse(res, data, 'Shops fetched successfully.');
    } catch (error) {
        next(error);
    }
}

export const deleteShop = async (req, res, next) => {
    try {
        const shop_id = req.params.id;
        const event_id = req.params.event_id;
        const [data] = await getShopsQuery([shop_id, event_id]);
        if(data.length==0){
            return notFoundResponse(res, "", "Data not found.");
        }
        await deleteShopQuery([shop_id, event_id]);
        return successResponse(res, 'Shop deleted successfully.');
    } catch (error) {
        next(error);
    }
}

export const getShopById = async(req, res, next) =>{
    try {
        const {shop_id, event_id} = req.body;
        const [data] = await getShopsQuery([shop_id, event_id]);
        return successResponse(res, data, 'Shop fetched successfully.');
    } catch (error) {
        next(error);
    }
}