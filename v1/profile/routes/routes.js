import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {userLogin, userRegistration, updateUserPassword, userLogout, sendOtpForEmailVerification, verifyEmail, checkEmailVerification} from '../controller/profileController.js';
import {register, login, updatePassword, sendOtp, verifyOtp} from '../../../utils/validation.js';
router.use(authenticateToken)

app.post('/login', login, userLogin);
app.post('/register', register, userRegistration);
app.post('/forgot-password', updatePassword, updateUserPassword);
app.post('/send-otp', sendOtp, sendOtpForEmailVerification)
app.post('/verify-email', verifyOtp, verifyEmail)
app.post('/check-email-verification', sendOtp, checkEmailVerification)

router.get('/logout/:id', userLogout);

app.use("/", router);

export default app;