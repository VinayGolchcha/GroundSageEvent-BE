import express, { Router } from 'express';
const app = express()
const router = Router();
import authenticateToken from '../../../middlewares/auth.js';
import {createNotes,updateNotes,deleteNotes,fetchNotes} from '../controller/noteController.js';
import {createNotesVal,updateNoteVal,deleteNotesVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/create-note',createNotesVal, createNotes);
app.put('/update-note/:id',updateNoteVal,updateNotes);
app.delete('/delete-notes',deleteNotesVal, deleteNotes);
app.get('/fetch-note', fetchNotes);


app.use("/", router);

export default app;