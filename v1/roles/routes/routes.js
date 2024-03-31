import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {createRole, updateRole} from '../controller/roleController.js';
import {createRoleVal, updateRoleVal} from '../../../utils/validation.js';
router.use(authenticateToken)

app.post('/create-role',createRoleVal, createRole);
app.post('/update-role/:id',updateRoleVal, updateRole);

app.use("/", router);

export default app;