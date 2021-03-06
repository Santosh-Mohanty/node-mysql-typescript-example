"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var mysql_1 = require("../config/mysql");
var uuid_1 = require("uuid");
var CONTEXT = 'team';
var createteam = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var teamLead, teamUUID, companyId, companyQuery, query;
    return __generator(this, function (_a) {
        logging_1.default.info(CONTEXT, 'Inserting team');
        teamLead = req.body.teamLead;
        teamUUID = (0, uuid_1.v4)();
        companyId = req.params.companyId.trim();
        companyQuery = "SELECT * FROM company where UUID = \"".concat(companyId, "\"");
        query = "INSERT INTO team (UUID, CompanyID, teamLead) VALUES (\"".concat(teamUUID, "\", \"").concat(companyId, "\" , \"").concat(teamLead, "\")");
        (0, mysql_1.Connect)()
            .then(function (connection) {
            (0, mysql_1.Query)(connection, companyQuery)
                .then(function (result) {
                if (result.length > 0) {
                    logging_1.default.info(CONTEXT, 'Company Found: ', result);
                    (0, mysql_1.Query)(connection, query)
                        .then(function (result) {
                        return res.status(200).json({
                            status: 'Success',
                            message: 'Team added Successfully'
                        });
                    })
                        .catch(function (error) {
                        return res.status(500).json({
                            status: 'failure',
                            message: 'Error while adding Team'
                        });
                    });
                }
                else {
                    return res.status(500).json({
                        status: 'failure',
                        message: "Company doesn't exist"
                    });
                }
            })
                .catch(function (error) {
                logging_1.default.error(CONTEXT, error.message, error);
                return res.status(200).json({
                    message: error.message,
                    error: error
                });
            })
                .finally(function () {
                logging_1.default.info(CONTEXT, 'Closing connection.');
                connection.end();
            });
        })
            .catch(function (error) {
            logging_1.default.error(CONTEXT, error.message, error);
            return res.status(200).json({
                message: error.message,
                error: error
            });
        });
        return [2 /*return*/];
    });
}); };
var getTeams = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, companyIds;
    return __generator(this, function (_a) {
        query = 'SELECT * FROM team';
        logging_1.default.info(CONTEXT, 'Getting all teams.');
        companyIds = [];
        (0, mysql_1.Connect)()
            .then(function (connection) {
            (0, mysql_1.Query)(connection, query)
                .then(function (results) {
                // logging.info(CONTEXT, 'Retrieved teams: ', results);
                var refinedTeamResults = JSON.parse(JSON.stringify(results));
                refinedTeamResults.map(function (val) {
                    companyIds.push(val.CompanyID);
                });
                // console.log(companyIds);
                var companyQuery = "SELECT * from company where UUID IN ('".concat(companyIds.join("','"), "')");
                (0, mysql_1.Query)(connection, companyQuery)
                    .then(function (companyResults) {
                    var data = JSON.parse(JSON.stringify(companyResults));
                    data.map(function (companyVal) {
                        companyVal.team = refinedTeamResults.filter(function (teamVal) {
                            return teamVal.CompanyID == companyVal.UUID;
                        });
                        data.team = companyVal.team;
                    });
                    return res.status(200).json({
                        data: data
                    });
                })
                    .catch(function (error) {
                    logging_1.default.error(CONTEXT, error.message, error);
                    return res.status(500).json({
                        status: 'failure',
                        message: 'Error getting data, please refer logs for error'
                    });
                });
            })
                .catch(function (error) {
                logging_1.default.error(CONTEXT, error.message, error);
                return res.status(500).json({
                    status: 'failure',
                    message: 'Error getting data, please refer logs for error'
                });
            })
                .finally(function () {
                logging_1.default.info(CONTEXT, 'Closing connection.');
                connection.end();
            });
        })
            .catch(function (error) {
            logging_1.default.error(CONTEXT, error.message, error);
            return res.status(500).json({
                status: 'failure',
                message: 'Error getting data, please refer logs for error'
            });
        });
        return [2 /*return*/];
    });
}); };
exports.default = { createteam: createteam, getTeams: getTeams };
