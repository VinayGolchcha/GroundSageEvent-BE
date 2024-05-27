import express, { Router } from 'express';
const app = express()
const router = Router();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {createShop, updateShop, deleteShop, getAllShopsByEventId, getShopById, getShopOccupancyDetails, getLastShopNumber} from '../controller/shopController.js';
import {addShopVal, updateShopVal, deleteShopVal, getShopByIdVal, getShopOccupancyDetailsVal, getAllShopByEventIdVal} from '../../../utils/validation.js';

app.post('/create-shop',authenticateToken, upload.array('files', 10), addShopVal, createShop);
app.put('/update-shop/:id/:event_id',authenticateToken, upload.array('files', 10), updateShopVal, updateShop);
app.delete('/delete-shop',authenticateToken,deleteShopVal, deleteShop);
app.get('/fetch-all-shop/:id',authenticateToken,getAllShopByEventIdVal, getAllShopsByEventId);
app.post('/fetch-shop',authenticateToken,getShopByIdVal, getShopById);
app.post('/fetch-shop-occupancy-data',authenticateToken,getShopOccupancyDetailsVal, getShopOccupancyDetails);
app.get('/fetch-last-shop-number',authenticateToken, getLastShopNumber)

app.use("/", router);

export default app;