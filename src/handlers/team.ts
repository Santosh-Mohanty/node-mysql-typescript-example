import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { v4 as uuidv4 } from 'uuid';

const CONTEXT = 'team';

const createteam = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(CONTEXT, 'Inserting team');

    let { teamLead } = req.body;
    const teamUUID = uuidv4();
    let companyId = req.params.companyId.trim();
    let companyQuery = `SELECT * FROM company where UUID = "${companyId}"`;
    let query = `INSERT INTO team (UUID, CompanyID, teamLead) VALUES ("${teamUUID}", "${companyId}" , "${teamLead}")`;

    Connect()
        .then((connection) => {
            Query(connection, companyQuery)
                .then((result: any) => {
                    if (result.length > 0) {
                        logging.info(CONTEXT, 'Company Found: ', result);
                        Query(connection, query)
                            .then((result) => {
                                return res.status(200).json({
                                    status: 'Success',
                                    message: 'Team added Successfully'
                                });
                            })
                            .catch((error) => {
                                return res.status(500).json({
                                    status: 'failure',
                                    message: 'Error while adding Team'
                                });
                            });
                    } else {
                        return res.status(500).json({
                            status: 'failure',
                            message: "Company doesn't exist"
                        });
                    }
                })
                .catch((error) => {
                    logging.error(CONTEXT, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(CONTEXT, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(CONTEXT, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getTeams = async (req: Request, res: Response) => {
    let query = 'SELECT * FROM team';
    logging.info(CONTEXT, 'Getting all teams.');
    let companyIds = [];

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results: any) => {
                    // logging.info(CONTEXT, 'Retrieved teams: ', results);
                    let refinedTeamResults = JSON.parse(JSON.stringify(results));
                    refinedTeamResults.map((val) => {
                        companyIds.push(val.CompanyID);
                    });
                    // console.log(companyIds);
                    let companyQuery = `SELECT * from company where UUID IN ('${companyIds.join("','")}')`;
                    Query(connection, companyQuery)
                        .then((companyResults: any) => {
                            let data = JSON.parse(JSON.stringify(companyResults));
                            data.map((companyVal) => {
                                companyVal.team = refinedTeamResults.filter((teamVal) => {
                                    return teamVal.CompanyID == companyVal.UUID;
                                });
                                data.team = companyVal.team;
                            });
                            return res.status(200).json({
                                data
                            });
                        })
                        .catch((error) => {
                            logging.error(CONTEXT, error.message, error);

                            return res.status(500).json({
                                status: 'failure',
                                message: 'Error getting data, please refer logs for error'
                            });
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

export default { createteam, getTeams };
