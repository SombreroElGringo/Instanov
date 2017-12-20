/**
 * Module dependencies.
 */
const api = require('./helpers/apiAuth');
const fileupload = require('express-fileupload');


/**
 * Controllers (route handlers).
 */
const apiController = require('./controllers/api');
const authController = require('./controllers/auth');
const indexController = require('./controllers/index');
const profileController = require('./controllers/profile');
const storyController = require('./controllers/story');


module.exports = function(app, passport) {
    /**
     * Primary app routes.
     */
   app.get('/', passport.isAuthenticated, indexController.index);

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

    /**
     * Account routes
     */
    app.get('/accounts', passport.isAuthenticated, authController.getAccount);
    app.put('/accounts/profile', passport.isAuthenticated, authController.editAccount);
    app.post('/accounts/profile', passport.isAuthenticated, authController.editAccount);
    app.put('/accounts/password', passport.isAuthenticated, authController.editPassword);
    app.delete('/accounts', passport.isAuthenticated, authController.deleteAccount);

    /**
     * Profiles routes
     */
    app.get('/profiles/:username', passport.isAuthenticated, profileController.index);
    app.get('/profiles/current/session', passport.isAuthenticated, profileController.currentUser);

    /**
     * Story routes
     */
    app.get('/story/:id', passport.isAuthenticated, storyController.getStoryById);
    app.post('/story', passport.isAuthenticated, fileupload() ,storyController.createStory);
    app.put('/story/:id', passport.isAuthenticated, storyController.editStoryById);
    app.delete('/story/:id', passport.isAuthenticated, storyController.deleteStoryById);
    app.get('/story/liked/:username', passport.isAuthenticated, storyController.storiesLikedByUser);
    app.put('/story/:id/like/:username', passport.isAuthenticated, storyController.likeStoryById);
    app.post('/story/:id/like/:username', passport.isAuthenticated, storyController.likeStoryById);

    /**
     * API routes.
     */
    app.get('/api/v1', api.isAuthAPI, apiController.getApi);

    return app;
}
