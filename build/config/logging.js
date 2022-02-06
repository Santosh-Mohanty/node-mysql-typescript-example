"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var info = function (context, message, object) {
    if (object) {
        console.info("[".concat(getTimeStamp(), "] [INFO] [").concat(context, "] ").concat(message), object);
    }
    else {
        console.info("[".concat(getTimeStamp(), "] [INFO] [").concat(context, "] ").concat(message));
    }
};
var warn = function (context, message, object) {
    if (object) {
        console.warn("[".concat(getTimeStamp(), "] [WARN] [").concat(context, "] ").concat(message), object);
    }
    else {
        console.warn("[".concat(getTimeStamp(), "] [WARN] [").concat(context, "] ").concat(message));
    }
};
var error = function (context, message, object) {
    if (object) {
        console.error("[".concat(getTimeStamp(), "] [ERROR] [").concat(context, "] ").concat(message), object);
    }
    else {
        console.error("[".concat(getTimeStamp(), "] [ERROR] [").concat(context, "] ").concat(message));
    }
};
var debug = function (context, message, object) {
    if (object) {
        console.debug("[".concat(getTimeStamp(), "] [DEBUG] [").concat(context, "] ").concat(message), object);
    }
    else {
        console.debug("[".concat(getTimeStamp(), "] [DEBUG] [").concat(context, "] ").concat(message));
    }
};
var getTimeStamp = function () {
    return new Date().toISOString();
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
