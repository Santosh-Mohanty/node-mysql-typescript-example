"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var company_1 = __importDefault(require("./routes/company"));
var team_1 = __importDefault(require("./routes/team"));
var login_1 = __importDefault(require("./routes/login"));
var company_2 = __importDefault(require("./handlers/company"));
var CONTEXT = 'Server';
var router = (0, express_1.default)();
/** Log the request */
router.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(CONTEXT, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(CONTEXT, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use('/login', login_1.default);
router.use('/company', company_2.default.ensureToken, company_1.default);
router.use('/team', company_2.default.ensureToken, team_1.default);
router.use('/healthcheck', function (req, res) {
    res.status(200).json({
        status: 'OK'
    });
});
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(CONTEXT, "Server is running ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port)); });
