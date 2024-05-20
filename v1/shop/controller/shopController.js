import dotenv from "dotenv"
import {validationResult} from "express-validator"
import { successResponse, errorResponse, notFoundResponse, unAuthorizedResponse } from "../../../utils/response.js"
import {createDynamicUpdateQuery} from '../../helpers/functions.js'
import {checkShopNumberQuery, createShopQuery, deleteShopQuery, getAllShopsByEventIdQuery, getLastShopDataQuery, getShopOccupancyDetailsQuery, getShopsQuery, updateShopQuery} from '../model/shopQuery.js'
dotenv.config();

export const createShop = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        let {event_id, shop_number, dome, description, area, rent, location, status} = req.body;
        status = status.toLowerCase();
        description = description.toLowerCase();
        dome = dome.toLowerCase();
        const [isExists] = await checkShopNumberQuery(shop_number);
        if (isExists[0].count > 0) {
            return notFoundResponse(res, "", `Shop number ${shop_number} already exists, please choose different shop number.`);
        }
        const [data] = await createShopQuery([event_id, shop_number, description, area, rent, dome, location, status])
        return successResponse(res, {shop_id: data.insertId, shop_number: shop_number } ,'Shop created successfully.');
    } catch (error) {
        next(error);
    }
}

export const getLastShopNumber =  async (req, res, next) => {
    try {
        let shop_number;
        const [shop_data] = await getLastShopDataQuery();
        if(shop_data.length == 0) {
            shop_number = 1;
        }else{
            shop_number = shop_data[0].shop_number + 1
        }
        return successResponse(res, {shop_number: shop_number} ,'Shop created successfully.');
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

export const getAllShopsByEventId = async (req, res, next) => {
    try {
        const event_id = req.params.id
        const [data] = await getAllShopsByEventIdQuery([event_id]);
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
        const {ids} = req.body;
        for (let i = 0; i < ids.length; i++){
            const [data] = await getShopsQuery([ids[i].shop_id, ids[i].event_id]);
            if(data.length==0){
                return notFoundResponse(res, "", `Shop with id ${ids[i].shop_id} not found.`);
            }
            await deleteShopQuery([ids[i].shop_id, ids[i].event_id]);
        }
        return successResponse(res, 'Shop deleted successfully.');
    } catch (error) {
        next(error);
    }
}

export const getShopById = async(req, res, next) =>{
    try {
        const {shop_id, event_id} = req.body;
        const [data] = await getShopsQuery([shop_id, event_id]);
        if(data.length==0){
            return notFoundResponse(res, "", "Data not found.");
        }
        return successResponse(res, data, 'Shop fetched successfully.');
    } catch (error) {
        next(error);
    }
}

export const getShopOccupancyDetails = async(req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, errors.array(), "")
        }
        const {flag, event_id} = req.body; //flag can be shop or month
        const [data] = await getShopOccupancyDetailsQuery(flag, [event_id, event_id]);
        if(data.length==0){
            return notFoundResponse(res, "", "Data not found.");
        }
        return successResponse(res, data, 'Shop occupancy details fetched successfully.');
    } catch (error) {
        next(error);
    }
}