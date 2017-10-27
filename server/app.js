/**
 *  Modules dependencies
 */
const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const path = require('path');

/**
 *  Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: './server/.env.server'});

/**
 *  Create Express Server
 */
const app = express();

/**
 * Connect to DB.
 */
//...


/**
 * Express configuration.
 */
module.exports = require('./config/express')(app, process);

/**
 * App routes.
 */
module.exports = require('./src/routes')(app);

/**
 * Error 404
 */
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
});
/**
 * Error handler
 */
app.use((err, req, res, next) => {

    let data = {
        message: err.message,
        status: err.status || 500
    }

    if(app.get('env') === 'development') {
       data.stack = err.stack
    }

    res.status(data.status)
    res.format({
        json: () => { res.send(data) }
    });
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('-- Press CTRL-C to stop --\n');
});

module.exports = app;
