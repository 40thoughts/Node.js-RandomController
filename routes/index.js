var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var appName = req.app.get('appName');

  res.render('index', { appName: appName });
});

module.exports = router;
