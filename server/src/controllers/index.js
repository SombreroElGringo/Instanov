/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {

   let data = {
     name: 'Index'
   }

   res.json(data);
}
