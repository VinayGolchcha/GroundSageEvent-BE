import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {addRentalAndTenantAgreement,fetchRentalAgreement,editRentalAgreement,deleteRentalAgreement, deleteTenant} from '../controller/rentalAgreementController.js';

import {addRentalAndTenantAgreementVal,fetchRentalAgreementVal,editRentalAgreementVal,deleteRentalAgreementVal} from '../../../utils/validation.js';
import { deleteTeam } from '../../team/controller/teamController.js';
router.use(authenticateToken);

app.post('/add-rental-agreement',addRentalAndTenantAgreementVal,addRentalAndTenantAgreement);
app.put('/edit-rental-agreement/:shop_id/:id',editRentalAgreementVal, editRentalAgreement);
app.delete('/delete-rental-agreement',deleteRentalAgreementVal, deleteRentalAgreement);
app.get('/fetch-rental-agreement',fetchRentalAgreementVal, fetchRentalAgreement);
app.delete('/delete-tenant',deleteTenant)
    
app.use("/", router);

export default app;

