const info = (context: string, message: string, object?: any) => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${context}] ${message}`, object);
    } else {
        console.info(`[${getTimeStamp()}] [INFO] [${context}] ${message}`);
    }
};

const warn = (context: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${context}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${context}] ${message}`);
    }
};

const error = (context: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimeStamp()}] [ERROR] [${context}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${context}] ${message}`);
    }
};

const debug = (context: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${context}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${context}] ${message}`);
    }
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export default {
    info,
    warn,
    error,
    debug
};
