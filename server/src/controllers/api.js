const User = require('../models/User');
/**
 * GET /api
 * List of API examples.
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
