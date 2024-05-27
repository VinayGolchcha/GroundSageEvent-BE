import express, { Router } from 'express';
const app = express()
const router = Router();
import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {createNote,updateNote,deleteNote,fetchNotesById} from '../controller/noteController.js';
import {createNoteVal,updateNoteVal, deleteNoteVal, fetchNoteVal} from '../../../utils/validation.js';

app.post('/create-note',authenticateToken,createNoteVal, createNote);
app.put('/update-note/:id',authenticateToken,updateNoteVal,updateNote);
app.delete('/delete-note',authenticateToken,deleteNoteVal, deleteNote);
app.get('/fetch-notes/:id/:event_id',fetchNoteVal,authenticateToken, fetchNotesById);

app.use("/", router);

export default app;