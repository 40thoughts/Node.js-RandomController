var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var i18n = require('i18next');

var indexPage = require('./routes/index');
var printPage = require('./routes/print');

var app = express();

i18n.init({
    lng: "en",
    ns: { namespaces: ['ns.common', 'ns.app', 'ns.layout', 'ns.msg', 'ns.public', 'ns.special'], defaultNs: 'ns.common'},
    preload: ['en', 'fr', 'dev'],
    resSetPath: 'locales/__lng__/__ns__.json',
    ignoreRoutes: ['images/', 'public/', 'css/', 'js/', 'fonts/'],
    saveMissing: true,
    debug: true
});
i18n.registerAppHelper(app);

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// view cache
app.set('view cache', false); // désactivation du cache express
swig.setDefaults({ cache: false }); // désactivation du cache swig

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.handle);

app.set('appName', 'Random-Controller');

app.use('/', indexPage);
app.use('/print', printPage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
