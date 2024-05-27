import express, { Router } from 'express';
const app = express()
const router = Router();
import authenticateToken from '../../../middlewares/auth.js';
import {createNote,updateNote,deleteNote,fetchNotesById} from '../controller/noteController.js';
import {createNoteVal,updateNoteVal, deleteNoteVal, fetchNoteVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/create-note',createNoteVal, createNote);
app.put('/update-note/:id',updateNoteVal,updateNote);
app.delete('/delete-note',deleteNoteVal, deleteNote);
app.get('/fetch-notes/:id/:event_id',fetchNoteVal, fetchNotesById);

app.use("/", router);

export default app;