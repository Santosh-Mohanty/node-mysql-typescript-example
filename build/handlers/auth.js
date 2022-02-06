"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var logging_1 = __importDefault(require("../config/logging"));
var CONTEXT = 'Auth';
var ensureToken = function (req, res, next) {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];
        jsonwebtoken_1.default.verify(bearerToken, 'secretkey', function (err, result) {
            if (err) {
                logging_1.default.error(CONTEXT, 'Error Validating User');
                res.sendStatus(403);
            }
            else {
                logging_1.default.info(CONTEXT, 'Auth Successful');
                next();
            }
        });
    }
    else {
        logging_1.default.error(CONTEXT, 'Error Validating User');
        res.sendStatus(403);
    }
};
exports.default = { ensureToken: ensureToken };
