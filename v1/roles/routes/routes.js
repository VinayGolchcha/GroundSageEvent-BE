import express, { Router } from 'express';
const app = express()
const router = Router();
import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {addRole, updateRole, deleteRole, fetchAllRoles, fetchRole} from '../controller/roleController.js';
import {addRolesVal, updateRolesVal, deleteRolesVal} from '../../../utils/validation.js';

app.post('/add-role', addRolesVal, addRole);
app.put('/update-role/:id',authenticateToken, updateRolesVal,updateRole);
app.delete('/delete-role/:id',authenticateToken, deleteRolesVal, deleteRole);
app.get('/fetch-role/:id',authenticateToken, fetchRole);
app.get('/fetch-all-roles',authenticateToken, fetchAllRoles);

app.use("/", router);

export default app;