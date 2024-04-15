import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {addRentalAndTenantAgreement,fetchRentalAgreement,editRentalAgreement,deleteRentalAgreement} from '../controller/rentalAgreementController.js';
import {addRentalAndTenantAgreementVal,fetchRentalAgreementVal,editRentalAgreementVal,deleteRentalAgreementVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/add-rental-agreement',addRentalAndTenantAgreementVal,addRentalAndTenantAgreement);
app.put('/edit-rental-agreement/:shopid/:id',editRentalAgreementVal, editRentalAgreement);
app.delete('/delete-rental-agreement',deleteRentalAgreementVal, deleteRentalAgreement);
app.get('/fetch-rental-agreement',fetchRentalAgreementVal, fetchRentalAgreement);

    
app.use("/", router);

export default app;

