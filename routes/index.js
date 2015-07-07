var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var appName = req.app.get('appName');
  var page = req.query.page;

  res.render('index', { appName: appName, page: page });
});

module.exports = router;
