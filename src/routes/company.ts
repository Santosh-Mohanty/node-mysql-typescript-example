import express from 'express';
import handlers from '../handlers/company';
import { validation } from '../handlers/validation';
import requestSchemas from '../handlers/schemas';

const router = express.Router();

router.post('/create', requestSchemas.companySchema, handlers.createCompany);
router.get('/companyId/:companyId', handlers.getCompanyById);
router.get('/companyName/:companyName', handlers.getCompanyByName);

export = router;
