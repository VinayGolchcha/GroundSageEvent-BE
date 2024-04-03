import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {createShop, updateShop, deleteShop, getAllShops, getShopById} from '../controller/shopController.js';
import {addShopVal, updateShopVal, deleteShopVal, getShopByIdVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/create-shop',addShopVal, createShop);
app.put('/update-shop/:id',updateShopVal, updateShop);
app.delete('/delete-shop',deleteShopVal, deleteShop);
app.get('/fetch-all-shop', getAllShops);
app.get('/fetch-shop',getShopByIdVal, getShopById);

app.use("/", router);

export default app;