var express = require('express');
var router = express.Router();
var printer = require('../lib/thermalPrinter');

/* GET the printer page. */
router.get('/', function(req, res, next) {
  var text = req.query.text;

  printer.printText(text);
  res.sendStatus(200);
});

module.exports = router;
