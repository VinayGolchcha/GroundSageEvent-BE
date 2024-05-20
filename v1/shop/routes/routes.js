import express, { Router } from 'express';
const app = express()
const router = Router();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import authenticateToken from '../../../middlewares/auth.js';
import {createShop, updateShop, deleteShop, getAllShopsByEventId, getShopById, getShopOccupancyDetails, getLastShopNumber} from '../controller/shopController.js';
import {addShopVal, updateShopVal, deleteShopVal, getShopByIdVal, getShopOccupancyDetailsVal, getAllShopByEventIdVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/create-shop', upload.array('files', 10), addShopVal, createShop);
app.put('/update-shop/:id/:event_id', upload.array('files', 10), updateShopVal, updateShop);
app.delete('/delete-shop',deleteShopVal, deleteShop);
app.get('/fetch-all-shop/:id',getAllShopByEventIdVal, getAllShopsByEventId);
app.post('/fetch-shop',getShopByIdVal, getShopById);
app.get('/fetch-shop-occupancy-data',getShopOccupancyDetailsVal, getShopOccupancyDetails);
app.get('/fetch-last-shop-number', getLastShopNumber)

app.use("/", router);

export default app;