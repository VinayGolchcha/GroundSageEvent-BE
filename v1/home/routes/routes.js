import express, { Router } from 'express';
const app = express()
const router = Router();

import { homePage } from '../../home/controller/homeController.js'
import { homePageIdVal } from '../../../utils/validation.js';

app.get('/home-page/:id', homePageIdVal, homePage)

app.use("/", router);

export default app;