var express = require('express');
var router = express.Router();

function printerReset() {
}

/* GET the printer page. */
router.get('/', function(req, res, next) {
  var appName = req.app.get('appName');

  var SerialPort = require("serialport").SerialPort;
  var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    rtscts: true
  });

  serialPort.on("open", function () {
    serialPort.on('data', function(data) {
//    console.log('data received: ' + data);
      if(data != " ") {
        if(data == "$") {
          console.log('\x1b[41mPlease put some paper in you printer, it\'s empty !\x1b[0m');
          var message = 'Please put some paper in you printer, it\'s empty !';
        }
        else {
          console.log('\x1b[41mCheck your printer, it seems that there is an error !\x1b[0m');
          var message = 'Check your printer, it seems that there is an error !';
        }
        res.render('print', { appName: appName, message: message });
      }
      else {
        if (req.query.line) {
          serialPort.write(req.query.line + "\n");
        }
    res.render('print', { appName: appName });
      }
    });
    serialPort.write("\x1b\x40");
    serialPort.write("\x1b\x76\x00");
  /*  serialPort.write("Salut qsdmlqsdmlk\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });*/
  });
});

/* POST the printer page. */
router.post('/', function(req, res, next) {
  var appName = req.app.get('appName');

  var SerialPort = require("serialport").SerialPort;
  var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    rtscts: true
  });

  serialPort.on("open", function () {
    serialPort.on('data', function(data) {
      if(data != " ") {
        if(data == "$") {
          console.log('\x1b[41mPlease put some paper in you printer, it\'s empty !\x1b[0m');
          var message = 'Please put some paper in you printer, it\'s empty !';
        }
        else {
          console.log('\x1b[41mCheck your printer, it seems that there is an error !\x1b[0m');
          var message = 'Check your printer, it seems that there is an error !';
        }
        res.render('print', { appName: appName, message: message });
      }
      else {
        if (req.body.printText) {
          serialPort.write(req.body.printText + "\n");
        }
        res.render('print', { appName: appName });
      }
    });
    serialPort.write("\x1b\x40");
    serialPort.write("\x1b\x76\x00");
  });
});

module.exports = router;
