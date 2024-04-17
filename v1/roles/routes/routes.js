import express, { Router } from 'express';
const app = express()
const router = Router();
import authenticateToken from '../../../middlewares/auth.js';
import {addRole, updateRole, deleteRole, fetchAllRoles, fetchRole} from '../controller/roleController.js';
import {addRolesVal, updateRolesVal, deleteRolesVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/add-role',addRolesVal, addRoles);
app.put('/update-role/:id',updateRolesVal,updateRoles);
app.delete('/delete-role/:id',deleteRolesVal, deleteRoles);
app.get('/fetch-role', fetchRoles);
app.get('/fetch-all-roles', fetchAllRoles);

app.use("/", router);

export default app;