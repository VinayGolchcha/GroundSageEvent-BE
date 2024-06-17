import express, { Router } from 'express';
const app = express()
const router = Router();

import { generateActivationCodeByAdmin } from '../controller/adminController.js';
import { generateActivationCodeVal } from '../../../utils/validation.js';

app.post('/create-activation-code',generateActivationCodeVal, generateActivationCodeByAdmin);

app.use("/", router);
export default app;