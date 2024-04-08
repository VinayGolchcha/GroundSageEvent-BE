import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {addTeam, updateTeam, deleteTeam, fetchAllTeams, fetchTeam} from '../controller/teamController.js';
import {addTeamVal, updateTeamVal, deleteTeamVal, fetchTeamVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.post('/add-team',addTeamVal, addTeam);
app.put('/update-team/:id',updateTeamVal, updateTeam);
app.delete('/delete-team',deleteTeamVal, deleteTeam);
app.get('/fetch-team',fetchTeamVal, fetchTeam);
app.get('/fetch-all-team', fetchAllTeams);

app.use("/", router);

export default app;