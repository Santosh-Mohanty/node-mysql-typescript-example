"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var company_1 = __importDefault(require("../handlers/company"));
var schemas_1 = __importDefault(require("../handlers/schemas"));
var router = express_1.default.Router();
router.post('/create', schemas_1.default.companySchema, company_1.default.createCompany);
router.get('/companyId/:companyId', company_1.default.getCompanyById);
router.get('/companyName/:companyName', company_1.default.getCompanyByName);
module.exports = router;
