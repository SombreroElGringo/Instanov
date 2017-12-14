'use strict';
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({

    email: { type: String, unique: true, required: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    profile: {
        name: String,
        username: { type: String, unique: true, lowercase: true },
        picture: String,
        description: String,
    }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            const md5 = crypto.createHash('md5').update(user.email).digest('hex');
            user.profile.picture = `https://gravatar.com/avatar/${md5}?s=152&d=retro`;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
  
const User = mongoose.model('users', userSchema);

module.exports = User;