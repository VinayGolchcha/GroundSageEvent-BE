import express, { Router } from 'express';
const app = express()
const router = Router();

import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {addRentalAndTenantAgreement,fetchRentalAgreement,editRentalAgreement,deleteRentalAgreement} from '../controller/rentalAgreementController.js';
import {addRentalAndTenantAgreementVal,fetchRentalAgreementVal,editRentalAgreementVal,deleteRentalAgreementVal} from '../../../utils/validation.js';
import multer from 'multer';

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/add-rental-agreement',authenticateToken,upload.single('file'), addRentalAndTenantAgreementVal,addRentalAndTenantAgreement);
app.put('/edit-rental-agreement/:shopid/:id',authenticateToken, editRentalAgreementVal, editRentalAgreement);
app.delete('/delete-rental-agreement',authenticateToken, deleteRentalAgreementVal, deleteRentalAgreement);
app.post('/fetch-rental-agreement',authenticateToken, fetchRentalAgreementVal, fetchRentalAgreement);
    
app.use("/", router);

export default app;

