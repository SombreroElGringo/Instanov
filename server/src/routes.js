/**
 * Module dependencies.
 */
const crypto = require('crypto');
const path = require('path');
const auth = require('./helpers/apiAuth');
const multer = require('multer');

const upload = multer({ storage: getStorage() });

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

    /**
     * Account routes
     */
    app.get('/accounts', passport.isAuthenticated, authController.getAccount);
    app.post('/accounts/profile', passport.isAuthenticated, authController.postUpdateProfile);
    app.post('/accounts/password', passport.isAuthenticated, authController.postUpdatePassword);
    app.post('/accounts/delete', passport.isAuthenticated, authController.postDeleteAccount);

    /**
     * Profiles routes
     */

    app.get('/profiles/:username', passport.isAuthenticated, profileController.index);

    /**
     * Story routes
     */

    app.get('/story', storyController.index);
    app.post('/story', upload.single('story'), storyController.createStory);
    app.put('/story/:id', storyController.editStoryById);
    app.delete('/story/:id', storyController.deleteStoryById);

    /**
     * API routes.
     */
    app.get('/api/v1', auth.middleware, apiController.getApi);


    return app;
}

/**
 *  Functions
 */
function getStorage() {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            let filename = crypto.createHmac('sha256', file.fieldname + '-' + Date.now())
                                .update(process.env.HASH_KEY)
                                .digest('hex');
            cb(null, filename+ getExtension(file));
        }
    });
    return storage;
}

function getExtension(file) {
    let result = '';
    if (file.mimetype === 'image/jpeg') result = '.jpg';
    if (file.mimetype === 'image/png') result = '.png';
    return result;
}
