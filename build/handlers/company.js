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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CONTEXT = 'Company';
var createCompany = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyName, CompanyCEO, companyAddress, inceptionDate, companyUUID, query;
    return __generator(this, function (_b) {
        logging_1.default.info(CONTEXT, 'Inserting company');
        _a = req.body, companyName = _a.companyName, CompanyCEO = _a.CompanyCEO, companyAddress = _a.companyAddress, inceptionDate = _a.inceptionDate;
        companyUUID = (0, uuid_1.v4)();
        query = "INSERT INTO company (UUID, companyName, CompanyCEO, companyAddress, inceptionDate) VALUES \n                (\"".concat(companyUUID, "\", \"").concat(companyName, "\", \"").concat(CompanyCEO, "\", \"").concat(companyAddress, "\", \"").concat(inceptionDate, "\")");
        (0, mysql_1.Connect)()
            .then(function (connection) {
            (0, mysql_1.Query)(connection, query)
                .then(function (result) {
                logging_1.default.info(CONTEXT, 'Book created: ', result);
                return res.status(200).json({
                    status: 'success',
                    message: 'Company created Successfully'
                });
            })
                .catch(function (error) {
                logging_1.default.error(CONTEXT, error.message, error);
                return res.status(500).json({
                    status: 'failure',
                    message: 'Error creating Company, please refer logs for error'
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
                message: 'Internal Server Error, please refer logs for error'
            });
        });
        return [2 /*return*/];
    });
}); };
var getCompanyById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, query;
    return __generator(this, function (_a) {
        logging_1.default.info(CONTEXT, 'Getting all company.');
        companyId = req.params.companyId;
        query = "SELECT * FROM company where UUID = \"".concat(companyId, "\"");
        (0, mysql_1.Connect)()
            .then(function (connection) {
            (0, mysql_1.Query)(connection, query)
                .then(function (results) {
                logging_1.default.info(CONTEXT, 'Retrieved company: ', results);
                return res.status(200).json({
                    results: results
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
var getCompanyByName = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companyName, query;
    return __generator(this, function (_a) {
        logging_1.default.info(CONTEXT, 'Getting all company.');
        companyName = req.params.companyName;
        query = "SELECT * FROM company where companyName = \"".concat(companyName, "\"");
        (0, mysql_1.Connect)()
            .then(function (connection) {
            (0, mysql_1.Query)(connection, query)
                .then(function (results) {
                logging_1.default.info(CONTEXT, 'Retrieved company: ', results);
                return res.status(200).json({
                    results: results
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
var ensureToken = function (req, res, next) {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];
        jsonwebtoken_1.default.verify(bearerToken, 'secretkey', function (err, result) {
            if (err) {
                res.sendStatus(403);
            }
            else
                next();
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.default = { createCompany: createCompany, getCompanyById: getCompanyById, getCompanyByName: getCompanyByName, ensureToken: ensureToken };
