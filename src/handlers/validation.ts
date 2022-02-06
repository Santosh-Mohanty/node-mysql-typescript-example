const Joi = require('joi');
import ICompany from '../model/company';

export const validation = (schema: any, property: string) => {
    return (req: any, res: any, next: any) => {
        const { error } = schema.validate(req.body, schema);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => i.message).join(',');

            console.log('error', message);
            res.status(422).json({ error: message });
        }
    };
};
// module.exports = validation;
