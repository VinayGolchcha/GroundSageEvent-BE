import express, { Router } from 'express';
const app = express()
const router = Router();

import authenticateToken from '../../../middlewares/auth.js';
import {updateTeam, deleteTeam, fetchAllTeams, fetchTeam,fetchUserTeams, getUserEventTeamCount,fetchUsersAndTeams,getTotalTeamsAndEvents} from '../controller/teamController.js';
import {updateTeamVal, deleteTeamVal, fetchTeamVal} from '../../../utils/validation.js';
router.use(authenticateToken);

app.put('/update-team/:id',updateTeamVal, updateTeam);
app.delete('/delete-team',deleteTeamVal, deleteTeam);
app.get('/fetch-team',fetchTeamVal, fetchTeam);
app.get('/fetch-all-team', fetchAllTeams);
app.get('/fetch-team-event-id-users',fetchUserTeams);
app.get('/user-event-team-count' ,getUserEventTeamCount );    
app.get('/get-total-teams-events' ,getTotalTeamsAndEvents );
app.get('/fetch-user-teams' ,fetchUsersAndTeams); 

app.use("/", router);

export default app;