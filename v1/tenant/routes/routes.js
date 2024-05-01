import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {fetchTenantsData} from '../controller/tenantController.js';
router.use(authenticateToken);

app.get('/fetch-tenant-data',fetchTenantsData);

app.use("/", router);

export default app;

