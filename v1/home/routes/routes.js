import express, { Router } from 'express';
const app = express()
const router = Router();

import { homePage, userFeedback } from '../../home/controller/homeController.js'
import { homePageIdVal, userFeedbackVal } from '../../../utils/validation.js';

app.get('/home-page/:id', homePageIdVal, homePage)
app.post('/send-feedback',userFeedbackVal, userFeedback)

app.use("/", router);

export default app;