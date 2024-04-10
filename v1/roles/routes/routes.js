import express, { Router } from 'express';
const app = express()
const router = Router();
import authenticateToken from '../../../middlewares/auth.js';
import {addRoles, updateRoles, deleteRoles, fetchAllRoles, fetchRoles} from '../controller/roleController.js';
import {addRolesVal, updateRolesVal, deleteRolesVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/add-roles',addRolesVal, addRoles);
app.put('/update-role/:id',updateRolesVal,updateRoles);
app.delete('/delete-roles',deleteRolesVal, deleteRoles);
app.get('/fetch-roles', fetchRoles);
app.get('/fetch-all-roles', fetchAllRoles);

app.use("/", router);

export default app;