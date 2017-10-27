/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressStatusMonitor = require('express-status-monitor');
const logger = require('morgan');

module.exports = function(app, config) {
   app.set('port', process.env.PORT || 3000);
   app.set('json spaces', 2);
   app.use(expressStatusMonitor());
   app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));

   return app;
}
