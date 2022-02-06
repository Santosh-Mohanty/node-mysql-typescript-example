"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var username = 'sample';
var password = 'sample';
router.post('/', function (req, res, next) {
    var p_username = req.body.username;
    var p_password = req.body.password;
    if (p_username == username && p_password == password) {
        var token = jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, username: username }, 'secretkey', function (err, token) {
            res.send({
                ok: true,
                message: 'Login successful',
                token: token
            });
        });
    }
    else {
        res.send({
            ok: false,
            message: 'Username or password incorrect'
        });
    }
});
module.exports = router;
