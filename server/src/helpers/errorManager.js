/** 
 *  Initialize the error & return it to the client
 * @function throwError
 * @param {string} message - Error message
 * @param {int} status - Error status 
 * @param {Function} next - Express next middleware function 
 */
exports.throwError = (message, status, next) => {
    let err = new Error('Bad Request: '+message);
    err.status = status;
    return next(err);
}
