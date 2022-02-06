"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
var Joi = require('joi');
var validation = function (schema, property) {
    return function (req, res, next) {
        var error = schema.validate(req.body, schema).error;
        var valid = error == null;
        if (valid) {
            next();
        }
        else {
            var details = error.details;
            var message = details.map(function (i) { return i.message; }).join(',');
            console.log('error', message);
            res.status(422).json({ error: message });
        }
    };
};
exports.validation = validation;
// module.exports = validation;
