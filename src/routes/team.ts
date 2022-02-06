import express from 'express';
import handlers from '../handlers/team';
import requestSchemas from '../handlers/schemas';

const router = express.Router();

router.post('/create/:companyId', requestSchemas.teamSchema, handlers.createteam);
router.get('/allTeams', handlers.getTeams);
// router.get('/get/teamName', handlers.getteamByName);

export = router;
