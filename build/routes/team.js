"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var team_1 = __importDefault(require("../handlers/team"));
var schemas_1 = __importDefault(require("../handlers/schemas"));
var router = express_1.default.Router();
router.post('/create/:companyId', schemas_1.default.teamSchema, team_1.default.createteam);
router.get('/allTeams', team_1.default.getTeams);
module.exports = router;
