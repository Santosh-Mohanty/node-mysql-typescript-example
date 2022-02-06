import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
const CONTEXT = 'Auth';
const ensureToken = (req: Request, res: Response, next: NextFunction) => {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, result) => {
            if (err) {
                logging.error(CONTEXT, 'Error Validating User');
                res.sendStatus(403);
            } else {
                logging.info(CONTEXT, 'Auth Successful');
                next();
            }
        });
    } else {
        logging.error(CONTEXT, 'Error Validating User');
        res.sendStatus(403);
    }
};

export default { ensureToken };
