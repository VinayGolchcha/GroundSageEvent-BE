import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {createEventTeamAndReferralCode, getAllUserEvents, updateEvent, joinUserTeamWithReferralCode} from '../controller/eventController.js';
import {createEventVal, updateEventVal, joinEventTeamVal} from '../../../utils/validation.js';
router.use(authenticateToken)

app.post('/create-event-team-and-referral-code',createEventVal, createEventTeamAndReferralCode);
app.post('/update-event/:id',updateEventVal, updateEvent);
app.get('/get-all-user-event/:id', getAllUserEvents);
app.post('/join-team-with-referral-code', joinEventTeamVal, joinUserTeamWithReferralCode);

app.use("/", router);

export default app;