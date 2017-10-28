const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_Instanov', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: Sequelize.Op,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './data.sqlite'
});

module.exports = sequelize;
