"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var companySchema = function (req, res, next) {
    var requestSchemas = joi_1.default.object({
        companyName: joi_1.default.string().required(),
        CompanyCEO: joi_1.default.string().required(),
        companyAddress: joi_1.default.string().required(),
        inceptionDate: joi_1.default.date().required()
    });
    validateRequest(req, res, next, requestSchemas);
};
var teamSchema = function (req, res, next) {
    var requestSchemas = joi_1.default.object({
        teamLead: joi_1.default.string().required()
    });
    validateRequest(req, res, next, requestSchemas);
};
var validateRequest = function (req, res, next, schema) {
    var options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true // remove unknown props
    };
    var _a = schema.validate(req.body, options), error = _a.error, value = _a.value;
    if (error) {
        return res.status(400).json({
            status: 'Validation Error',
            message: "Validation error: ".concat(error.details.map(function (x) { return x.message; }).join(', '))
        });
    }
    else {
        req.body = value;
        next();
    }
};
exports.default = { companySchema: companySchema, teamSchema: teamSchema };
