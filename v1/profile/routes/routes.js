import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {userLogin, userRegistration, updateUserPassword, userLogout, sendOtpForEmailVerification, verifyEmail, checkEmailVerification, getCurrentEventTeamAndRoleBasedOnUserId, getAllEventsBasedOnUserId, getUserEventAndTeamCount} from '../controller/profileController.js';
import {register, login, updatePassword, sendOtp, verifyOtp, getCurrentEventTeamUserIdVal} from '../../../utils/validation.js';
router.use(authenticateToken)

app.post('/login', login, userLogin);
app.post('/register', register, userRegistration);
app.post('/forgot-password', updatePassword, updateUserPassword);
app.post('/send-otp', sendOtp, sendOtpForEmailVerification)
app.post('/verify-email', verifyOtp, verifyEmail)
app.post('/check-email-verification', sendOtp, checkEmailVerification)
app.get('/get-user-current-team-event-data',getCurrentEventTeamUserIdVal, getCurrentEventTeamAndRoleBasedOnUserId)
app.get('/get-all-user-events',getCurrentEventTeamUserIdVal, getAllEventsBasedOnUserId)
app.get('/get-user-event-and-team-count',getCurrentEventTeamUserIdVal, getUserEventAndTeamCount)

router.get('/logout/:id', userLogout);

app.use("/", router);

export default app;