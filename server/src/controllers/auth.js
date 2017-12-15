const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

/** 
 *  Login page
 * @function getLogin
 * @name /login
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.status(403)
            .json({
            code: 403,
            status: 'error',
            message: 'You are already logged in!',
        });
    }
    return res.json({
        title: 'Login'
    });
};

/** 
 *  Sign in with the email & password
 * @function postLogin
 * @name /login
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: errors,
        });
    }
    
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404)
                .json({
                code: 404,
                status: 'error',
                message: info,
            });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.status(200)
                .json({
                code: 200,
                status: 'success',
                message: 'Success! You are logged in.',
            });
        });
    })(req, res, next);
};

/** 
 *  Log out
 * @function logout
 * @name /logout
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.logout = (req, res) => {
    req.logout();
    return res.status(200)
        .json({
        code: 200,
        status: 'success',
        message: 'Success! You are logged out!',
    });
};

/** 
 *  Sign up page
 * @function getSignup
 * @name /signup
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getSignup = (req, res) => {
    if (req.user) {
        return res.status(403)
            .json({
            code: 403,
            status: 'error',
            message: 'You are already logged in!',
        });
    }
    return res.status(200)
        .json({
        title: 'Create Account'
    });
};

/** 
 *  Sign up with the email & password
 * @function postSignup
 * @name /signup
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.postSignup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: errors,
        });
    }
  
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        profile : {
            username: req.body.username,
            name: req.body.name,
        }
    });
  
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) { return next(err); }
      if (existingUser) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: 'Account with that email address already exists.',
        });
      }
      user.save((err) => {
        if (err) { 
            if (err.code === 11000) {
                return res.status(400)
                    .json({
                    code: 400,
                    status: 'error',
                    message: 'Username already exists.',
                });
            }
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(201)
                .json({
                code: 201,
                status: 'success',
                message: 'User created!'
            });
        });
      });
    });
};

/** 
 *  Account page
 * @function getAccount
 * @name /accounts
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAccount = (req, res) => {
    return res.status(200)
        .json({
        title: 'My Account'
    });
};

/** 
 *  Update profile
 * @function editAccount
 * @name /accounts/profile
 * @method PUT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.editAccount = (req, res, next) => {
    User.findById(req.user.id, (err, user) => {
        if (err) { return next(err); }
        user.profile.description = req.body.description || '';
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400)
                        .json({
                        code: 400,
                        status: 'error',
                        message: 'The email address you have entered is already associated with an account.',
                    });
                }
                return next(err);
            }
            return res.status(200)
                .json({
                code: 200,
                status: 'success',
                message: 'Profile information has been updated!',
            });
        });
    });
};

/** 
 * Update current password
 * @function editPassword
 * @name /accounts/password
 * @method PUT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.editPassword = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: errors,
        });
    }
  
    User.findById(req.user.id, (err, user) => {
        if (err) { return next(err); }
        user.password = req.body.password;
        user.save((err) => {
            if (err) { return next(err); }
            return res.status(200)
                .json({
                code: 200,
                status: 'success',
                message: 'Password has been changed!',
            });
        });
    });
};
  
/** 
 * Delete user account
 * @function deleteAccount
 * @name /accounts/
 * @method DELETE
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.deleteAccount = (req, res, next) => {
    User.remove({ _id: req.user.id }, (err) => {
        if (err) { return next(err); }
        req.logout();
        return res.status(200)
            .json({
            code: 200,
            status: 'success',
            message: 'Your account has been deleted!',
        });
    });
};

/** 
 * Reset Password page
 * @function getReset
 * @name /reset/:token
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getReset = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: 'You are already logged in!',
        });
    }
    User.findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
            if (err) { return next(err); }
            if (!user) {
                return res.status(400)
                    .json({
                    code: 400,
                    status: 'error',
                    message: 'Password reset token is invalid or has expired!',
                });
            }
            return res.status(200)
                .json({
                title: 'Password Reset'
            });
        }
    );
};

/** 
 * Process the reset password request
 * @function postReset
 * @name /reset/:token
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.postReset = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: errors,
        });
    }
  
    const resetPassword = () =>
        User.findOne({ passwordResetToken: req.params.token })
            .where('passwordResetExpires').gt(Date.now())
            .then((user) => {
                if (!user) {
                    return res.status(400)
                        .json({
                        code: 400,
                        status: 'error',
                        message: 'Password reset token is invalid or has expired!',
                    });
                }
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                return user.save().then(() => new Promise((resolve, reject) => {
                    req.logIn(user, (err) => {
                        if (err) { return reject(err); }
                        resolve(user);
                    });
                }));
            }
        );
  
    const sendResetPasswordEmail = (user) => {
        if (!user) { return; }
        const transporter = nodemailer.createTransport(process.env.NODEMAILER_SMTP);
        const mailOptions = {
            to: user.email,
            from: 'contact@instanov.com',
            subject: 'Your Instanov password has been changed',
            text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
        };
        return transporter.sendMail(mailOptions).then(() => {
            return true;
        });
    };
  
    resetPassword().then(sendResetPasswordEmail)
                   .then(() => { 
                       if (!res.finished) {
                            return res.status(200)
                                .json({
                                code: 200,
                                status: 'success',
                                message: 'Success! Your password has been changed.',
                            }); 
                        }
                    })
                   .catch(err => next(err));
};
  
/** 
 * Forgot Password page
 * @function getForgot
 * @name /forgot
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getForgot = (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: 'You are already logged! If you want change your password edit your Account!',
        });
    }
    return res.status(200)
        .json({
        title: 'Forgot Password'
    });
};
  
/** 
 * Create a random token, then send an email with a reset link
 * @function postForgot
 * @name /forgot
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.postForgot = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400)
            .json({
            code: 400,
            status: 'error',
            message: errors,
        });
    }
  
    const createRandomToken = crypto.randomBytesAsync(16)
                                    .then(buf => buf.toString('hex'));
  
    const setRandomToken = token =>
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return res.status(404)
                        .json({
                        code: 404,
                        status: 'error',
                        message: 'Accout with that email address does not exist!',
                    });
                } else {
                    user.passwordResetToken = token;
                    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                    user = user.save();
                }
                return user;
            });
  
    const sendForgotPasswordEmail = (user) => {
        if (!user) { return; }
        const token = user.passwordResetToken;
        const transporter = nodemailer.createTransport(process.env.NODEMAILER_SMTP);
        const mailOptions = {
            to: user.email,
            from: 'contact@instanov.com',
            subject: 'Reset your password on Instanov',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.host}/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        return transporter.sendMail(mailOptions).then(() => {
            return res.status(200)
                .json({
                code: 200,
                status: 'success',
                message: `An e-mail has been sent to ${user.email} with further instructions.`,
            });
        });
    };
  
    createRandomToken.then(setRandomToken)
                     .then(sendForgotPasswordEmail)
                     .catch(next);
};