/**
 *  Initialize the error & return it to the client
 */
exports.throwError = (message, status, next) => {
    let err = new Error('Bad Request: '+message);
    err.status = status;
    return next(err);
};
