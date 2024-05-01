import express, { Router } from 'express';
const app = express()
const router = Router();
import authenticateToken from '../../../middlewares/auth.js';
import {addRole, updateRole, deleteRole, fetchAllRoles, fetchRole} from '../controller/roleController.js';
import {addRolesVal, updateRolesVal, deleteRolesVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/add-role',addRolesVal, addRole);
app.put('/update-role/:id',updateRolesVal,updateRole);
app.delete('/delete-role/:id',deleteRolesVal, deleteRole);
app.get('/fetch-role/:id', fetchRole);
app.get('/fetch-all-roles', fetchAllRoles);

app.use("/", router);

export default app;