import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {createShop, updateShop, deleteShop, getAllShopsByEventId, getShopById, getShopOccupancyDetails, getLastShopNumber} from '../controller/shopController.js';
import {addShopVal, updateShopVal, deleteShopVal, getShopByIdVal, getShopOccupancyDetailsVal, getAllShopByEventIdVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/create-shop',addShopVal, createShop);
app.put('/update-shop/:id/:event_id',updateShopVal, updateShop);
app.delete('/delete-shop',deleteShopVal, deleteShop);
app.get('/fetch-all-shop/:id',getAllShopByEventIdVal, getAllShopsByEventId);
app.get('/fetch-shop',getShopByIdVal, getShopById);
app.get('/fetch-shop-occupancy-data',getShopOccupancyDetailsVal, getShopOccupancyDetails);
app.get('/fetch-last-shop-number', getLastShopNumber)

app.use("/", router);

export default app;