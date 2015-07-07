var SerialPort = require("serialport").SerialPort;

function connect() {
  var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    rtscts: true
  });

  return serialPort;
}

function printCmd(cmd) {
  var serialPort = connect();
  serialPort.on("open", function () {
    serialPort.write(cmd);
  });
}

function reset() {
  printCmd("\x1b\x40");
}

function demo() {
  printCmd("\x12\x54");
}

function printText(text) {
  var serialPort = connect();
  serialPort.on("open", function () {
    serialPort.write("\x1b\x76\x00");
    serialPort.on('data', function(data) {
      if (data != " ") {
        if (data == "$") {
          console.log('\x1b[41mCheck your printer, it seems that there is no paper anymore !\x1b[0m');
        }
        else {
          console.log('\x1b[41mCheck your printer, it seems that there is an error !\x1b[0m');
        }
      }
      else {
        serialPort.write(text + "\n");
      }
    });
  });
}

exports.reset = reset;
exports.demo = demo;
exports.printText = printText;
