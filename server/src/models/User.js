'use strict';

const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Username already in use!'
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'Must be a valid email'
            } 
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    password: Sequelize.STRING,
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    classMethods: {

    }
}, {
    instanceMethods: {

    }
})

User.sync();

module.exports = User;