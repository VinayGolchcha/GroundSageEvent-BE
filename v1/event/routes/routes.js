import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {createEventTeamAndReferralCode, getAllEvents, updateEvent, deleteEvent, joinUserTeamWithReferralCode} from '../controller/eventController.js';
import {createEventVal, updateEventVal, deleteEventVal, joinEventTeamVal} from '../../../utils/validation.js';
router.use(authenticateToken)

app.post('/create-event-team-and-referral-code',createEventVal, createEventTeamAndReferralCode);
app.post('/update-event/:id',updateEventVal, updateEvent);
app.get('/get-all-event', getAllEvents);
app.delete('/delete-event/:id',deleteEventVal, deleteEvent);
app.post('/join-team-with-referral-code', joinEventTeamVal, joinUserTeamWithReferralCode);

app.use("/", router);

export default app;