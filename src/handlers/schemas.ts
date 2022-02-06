import Joi from 'joi';

const companySchema = (req, res, next) => {
    const requestSchemas = Joi.object({
        companyName: Joi.string().required(),
        CompanyCEO: Joi.string().required(),
        companyAddress: Joi.string().required(),
        inceptionDate: Joi.date().required()
    });
    validateRequest(req, res, next, requestSchemas);
};

const teamSchema = (req, res, next) => {
    const requestSchemas = Joi.object({
        teamLead: Joi.string().required()
    });
    validateRequest(req, res, next, requestSchemas);
};

const validateRequest = (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        return res.status(400).json({
            status: 'Validation Error',
            message: `Validation error: ${error.details.map((x) => x.message).join(', ')}`
        });
    } else {
        req.body = value;
        next();
    }
};

export default { companySchema, teamSchema };
