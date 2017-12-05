const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.status(403).json({
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
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: errors.msg,
        });
    }
    
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: 'error',
                message: info,
            });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Success! You are logged in.',
            });
        });
    })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    req.logout();
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Success! You are logged out!',
    });
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
    if (req.user) {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'You are already logged in!',
        });
    }
    return res.status(200).json({
        title: 'Create Account'
    });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400).json({
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
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'Account with that email address already exists.',
        });
      }
      user.save((err) => {
        if (err) { 
            if (err.code === 11000) {
                return res.status(400).json({
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
            return res.status(201).json({
                code: 201,
                status: 'success',
                message: 'User created!'
            });
        });
      });
    });
};

/**
 * GET /accounts
 * Profile page.
 */
exports.getAccount = (req, res) => {
    return res.status(200).json({
        title: 'My Account'
    });
};

/**
 * POST /accounts/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: errors,
        });
    }
  
    User.findById(req.user.id, (err, user) => {
        if (err) { return next(err); }
        user.email = req.body.email || '';
        user.profile.name = req.body.name || '';
        user.profile.gender = req.body.gender || '';
        user.profile.location = req.body.location || '';
        user.profile.website = req.body.website || '';
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).json({
                        code: 400,
                        status: 'error',
                        message: 'The email address you have entered is already associated with an account.',
                    });
                }
                return next(err);
            }
            return res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Profile information has beeb updated!',
            });
        });
    });
};

/**
 * POST /accounts/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400).json({
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
            return res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Password has been changed!',
            });
        });
    });
};
  
/**
 * POST /accounts/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
    User.remove({ _id: req.user.id }, (err) => {
        if (err) { return next(err); }
        req.logout();
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Your account has been deleted!',
        });
    });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(400).json({
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
                return res.status(400).json({
                    code: 400,
                    status: 'error',
                    message: 'Password reset token is invalid or has expired!',
                });
            }
            return res.status(200).json({
                title: 'Password Reset'
            });
        }
    );
};
  
/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400).json({
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
                    return res.status(400).json({
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
                            return res.status(200).json({
                                code: 200,
                                status: 'success',
                                message: 'Success! Your password has been changed.',
                            }); 
                        }
                    })
                   .catch(err => next(err));
};
  
/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'You are already logged! If you want change your password edit your Account!',
        });
    }
    return res.status(200).json({
        title: 'Forgot Password'
    });
};
  
/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  
    const errors = req.validationErrors();
  
    if (errors) {
        return res.status(400).json({
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
                    return res.status(404).json({
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
            return res.status(200).json({
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