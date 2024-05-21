import express, { Router } from 'express';
const app = express()
const router = Router();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {createEventTeamAndReferralCode, getAllUserEvents, updateEvent, joinUserTeamWithReferralCode} from '../controller/eventController.js';
import {createEventVal, updateEventVal, joinEventTeamVal} from '../../../utils/validation.js';

app.post('/create-event-team-and-referral-code',authenticateToken, upload.array('files', 1), createEventVal, createEventTeamAndReferralCode);
app.post('/update-event/:id',authenticateToken, upload.array('files', 1), updateEventVal, updateEvent);
app.get('/get-all-user-event/:id',authenticateToken, getAllUserEvents);
app.post('/join-team-with-referral-code',authenticateToken, joinEventTeamVal, joinUserTeamWithReferralCode);

app.use("/", router);
export default app;