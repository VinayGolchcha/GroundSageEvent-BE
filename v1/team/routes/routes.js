import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {updateTeam, fetchAllTeams, fetchTeam} from '../controller/teamController.js';

import {updateTeamVal, fetchTeamVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.put('/update-team/:id',updateTeamVal, updateTeam);
app.post('/fetch-team',fetchTeamVal, fetchTeam);
app.get('/fetch-all-team', fetchAllTeams);

app.use("/", router);

export default app;