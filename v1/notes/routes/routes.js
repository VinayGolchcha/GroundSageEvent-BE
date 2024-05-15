import express, { Router } from 'express';
const app = express()
const router = Router();
import authenticateToken from '../../../middlewares/auth.js';
import {createNote,updateNote,deleteNote,fetchNotes} from '../controller/noteController.js';
import {createNoteVal,updateNoteVal, deleteNoteVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/create-note',createNoteVal, createNote);
app.put('/update-note/:id',updateNoteVal,updateNote);
app.delete('/delete-note',deleteNoteVal, deleteNote);
app.get('/fetch-notes', fetchNotes);

app.use("/", router);

export default app;