const crypto = require('crypto');
const errorManager = require('./errorManager');

/** 
 *  Middleware -> check if the token & timestamp is valid -> if valid give access to the API
 * @function isAuthAPI
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.isAuthAPI = (req, res, next) => {
	return next();
	
	let token = req.query.token || req.headers['x-access-token'];
	let timestamp = req.query.timestamp || req.headers['x-timestamp'];
	
	if (!token || !timestamp) {
		errorManager.throwError('token or timestamp is missing!', 400, next);
	} else {
		if (this.tokenIsValid(token, next) & this.timestampIsValid(timestamp, next)) {
			return next();
		} else {
			errorManager.throwError('token or timestamp is not valid!', 400, next);
		}
	}
}

/** 
 * Check if the token from the request is valid
 * apiToken = f34c5268b72404747c32e602a72b7bda25349ebba7a400e09d925613d7ec6c11	
 * @function tokenIsValid
 * @param {string} token - Token from the request
 * @param {Function} next - Express next middleware function 
 */
exports.tokenIsValid = (token, next) => {
	let apiToken = crypto.createHmac('sha256', process.env.SECRET_KEY)
		.update(process.env.HASH_KEY)
		.digest('hex');
	return apiToken === token ? true : errorManager.throwError('token is not valid!', 400, next);
}

/** 
 * Check if the timestamp from the request is valid
 * @function timestampIsValid
 * @param {int} timestamp - Timestamp from the request
 * @param {Function} next - Express next middleware function 
 */
exports.timestampIsValid = (timestamp, next) => {
	if (!isNaN(timestamp)) {
		let difference = Math.floor(Date.now() / 1000) - timestamp;
		return (difference > -10 && difference < 10) ? true : errorManager.throwError('timestamp is not valid!', 400, next);
	} else {
		errorManager.throwError('timestamp type is not valid!', 400, next)
	}
}
