/**
 * Module dependencies.
 */
const path = require('path');
const auth = require('./helpers/apiAuth');


/**
 * Controllers (route handlers).
 */
const apiController = require('./controllers/api');
const authController = require('./controllers/auth');
const indexController = require('./controllers/index');


module.exports = function(app, passport) {
   /**
    * Primary app routes.
    */
   app.get('/', indexController.index);

   /**
    * Auth routes
    */
    app.get('/login', authController.getLogin);
    app.post('/login', authController.postLogin);
    app.get('/logout', authController.logout);
    app.get('/forgot', authController.getForgot);
    app.post('/forgot', authController.postForgot);
    app.get('/reset/:token', authController.getReset);
    app.post('/reset/:token', authController.postReset);
    app.get('/signup', authController.getSignup);
    app.post('/signup', authController.postSignup);
    app.get('/account', passport.isAuthenticated, authController.getAccount);
    app.post('/account/profile', passport.isAuthenticated, authController.postUpdateProfile);
    app.post('/account/password', passport.isAuthenticated, authController.postUpdatePassword);
    app.post('/account/delete', passport.isAuthenticated, authController.postDeleteAccount);

   /**
    * API routes.
    */
   app.get('/api/v1', auth.middleware, apiController.getApi);


   return app;
}
