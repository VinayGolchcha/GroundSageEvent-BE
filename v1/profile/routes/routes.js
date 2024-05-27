import express, { Router } from 'express';
const app = express()
const router = Router();

import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {userLogin, userRegistration, updateUserPassword, userLogout, sendOtpForEmailVerification, verifyEmail, checkEmailVerification, getCurrentEventTeamAndRoleBasedOnUserId, getAllEventsBasedOnUserId, getUserEventAndTeamCount, getAboutPageDetails} from '../controller/profileController.js';
import {register, login, updatePassword, sendOtp, verifyOtp, getCurrentEventTeamUserIdVal, getUserAboutPageVal} from '../../../utils/validation.js';

app.post('/login', login, userLogin);
app.post('/register', register, userRegistration);
app.post('/forgot-password', updatePassword, updateUserPassword);
app.post('/send-otp', sendOtp, sendOtpForEmailVerification)
app.post('/verify-email', verifyOtp, verifyEmail)
app.post('/check-email-verification', sendOtp, checkEmailVerification)
app.post('/get-user-current-team-event-data',authenticateToken,getCurrentEventTeamUserIdVal, getCurrentEventTeamAndRoleBasedOnUserId)
app.post('/get-all-user-events',authenticateToken,getCurrentEventTeamUserIdVal, getAllEventsBasedOnUserId)
app.post('/get-user-event-and-team-count',authenticateToken,getCurrentEventTeamUserIdVal, getUserEventAndTeamCount)
app.post('/get-user-about-page-data',authenticateToken, getUserAboutPageVal, getAboutPageDetails)
router.get('/logout/:id', userLogout);

app.use("/", router);

export default app;