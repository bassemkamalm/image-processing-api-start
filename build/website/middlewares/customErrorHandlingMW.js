"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customErrorHandling_1 = require("./../models/customErrorHandling");
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(err, req, res, next) {
    var customError = err;
    if (!(err instanceof customErrorHandling_1.CustomError)) {
        customError = new customErrorHandling_1.CustomError('We are having troubles');
    }
    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status(customError.status).send(customError);
}
;
exports.default = handleError;
