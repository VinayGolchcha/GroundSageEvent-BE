import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {createEvent, getAllEvents, updateEvent, deleteEvent} from '../controller/eventController.js';
import {createEventVal, updateEventVal, deleteEventVal} from '../../../utils/validation.js';
router.use(authenticateToken)

app.post('/create-event',createEventVal, createEvent);
app.post('/update-event/:id/:user_id',updateEventVal, updateEvent);
app.get('/get-all-event', getAllEvents);
app.delete('/delete-event/:id/:user_id',deleteEventVal, deleteEvent);

app.use("/", router);

export default app;