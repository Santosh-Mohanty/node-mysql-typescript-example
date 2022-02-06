import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const CONTEXT = 'Company';

const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Inserting company');

    let { companyName, CompanyCEO, companyAddress, inceptionDate } = req.body;
    const companyUUID = uuidv4();

    let query = `INSERT INTO company (UUID, companyName, CompanyCEO, companyAddress, inceptionDate) VALUES 
                ("${companyUUID}", "${companyName}", "${CompanyCEO}", "${companyAddress}", "${inceptionDate}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(CONTEXT, 'Book created: ', result);

                    return res.status(200).json({
                        status: 'success',
                        message: 'Company created Successfully'
                    });
                })
                .catch((error) => {
                    logging.error(CONTEXT, error.message, error);

                    return res.status(500).json({
                        status: 'failure',
                        message: 'Error creating Company, please refer logs for error'
                    });
                })
                .finally(() => {
                    logging.info(CONTEXT, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(CONTEXT, error.message, error);

            return res.status(500).json({
                status: 'failure',
                message: 'Internal Server Error, please refer logs for error'
            });
        });
};

const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Getting all company.');
    const companyId = req.params.companyId;
    let query = `SELECT * FROM company where UUID = "${companyId}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(CONTEXT, 'Retrieved company: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(CONTEXT, error.message, error);

                    return res.status(500).json({
                        status: 'failure',
                        message: 'Error getting data, please refer logs for error'
                    });
                })
                .finally(() => {
                    logging.info(CONTEXT, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(CONTEXT, error.message, error);

            return res.status(500).json({
                status: 'failure',
                message: 'Error getting data, please refer logs for error'
            });
        });
};

const getCompanyByName = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Getting all company.');
    const companyName = req.params.companyName;
    let query = `SELECT * FROM company where companyName = "${companyName}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(CONTEXT, 'Retrieved company: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(CONTEXT, error.message, error);

                    return res.status(500).json({
                        status: 'failure',
                        message: 'Error getting data, please refer logs for error'
                    });
                })
                .finally(() => {
                    logging.info(CONTEXT, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(CONTEXT, error.message, error);

            return res.status(500).json({
                status: 'failure',
                message: 'Error getting data, please refer logs for error'
            });
        });
};
const ensureToken = (req: Request, res: Response, next: NextFunction) => {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else next();
        });
    } else {
        res.sendStatus(403);
    }
};

export default { createCompany, getCompanyById, getCompanyByName, ensureToken };
