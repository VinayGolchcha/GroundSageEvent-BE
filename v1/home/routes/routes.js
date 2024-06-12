import express, { Router } from 'express';
const app = express()
const router = Router();

import { homePage, userFeedback } from '../../home/controller/homeController.js'
import { homePageIdVal, userFeedbackVal } from '../../../utils/validation.js';
import {authenticateToken} from '../../../middlewares/roleAuth.js';

app.get('/home-page/:id',authenticateToken, homePageIdVal, homePage)
app.post('/send-feedback',authenticateToken,userFeedbackVal, userFeedback)

app.use("/", router);

export default app;