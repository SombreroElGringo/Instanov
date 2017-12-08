const User = require('../models/User');

/** 
 *  API
 * @function index
 * @name /api/v1/
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getApi = (req, res, next) => {
   
  User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error('error:', err);
      })
};
