import express, { Router } from 'express';
const app = express()
const router = Router();

import {authenticateToken} from '../../../middlewares/roleAuth.js';
import {updateTeam, fetchAllTeams, fetchTeam,fetchUserTeams, getUserEventTeamCount} from '../controller/teamController.js';

import {updateTeamVal, fetchTeamVal} from '../../../utils/validation.js';

app.put('/update-team/:id',authenticateToken, updateTeamVal, updateTeam);
app.post('/fetch-team',authenticateToken, fetchTeamVal, fetchTeam);
app.get('/fetch-all-team',authenticateToken, fetchAllTeams);
app.post('/fetch-team-event-id-users',authenticateToken, fetchUserTeams);
app.post('/user-event-team-count',authenticateToken, getUserEventTeamCount );    

app.use("/", router);

export default app;