/**
 * Module dependencies.
 */
const path = require('path');
const auth = require('./helpers/apiAuth');


/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/index');
const apiController = require('./controllers/api');


module.exports = function(app, passport) {
   /**
    * Primary app routes.
    */
   app.get('/', passport.isAuthenticated, homeController.index);

   /**
    * API routes.
    */
   app.get('/api/v1', auth.middleware, apiController.getApi);


   return app;
}
