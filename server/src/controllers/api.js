/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res, next) => {
   let data = {
     name: 'Michel'
   }

   res.json(data);
};
