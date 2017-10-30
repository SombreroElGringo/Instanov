/**
 * Module dependencies.
 */
const session = require('express-session');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const logger = require('morgan');

module.exports = function(app, passport) {

   app.set('port', process.env.PORT || 3000);
   app.set('json spaces', 2);
   app.use(expressStatusMonitor());
   app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(cookieParser());
   app.use(methodOverride());
   app.use(expressValidator());
   app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
      autoReconnect: true
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  })

   return app;
}
