/**
 * Module dependencies.
 */
const path = require('path');
const auth = require('./helpers/apiAuth');


/**
 * Controllers (route handlers).
 */
const apiController = require('./controllers/api');
const userController = require('./controllers/user');
const indexController = require('./controllers/index');


module.exports = function(app, passport) {
   /**
    * Primary app routes.
    */
   app.get('/', indexController.index);

   /**
    * User routes
    */
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);
    app.get('/account', passport.isAuthenticated, userController.getAccount);
    app.post('/account/profile', passport.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', passport.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passport.isAuthenticated, userController.postDeleteAccount);

   /**
    * API routes.
    */
   app.get('/api/v1', auth.middleware, apiController.getApi);


   return app;
}
