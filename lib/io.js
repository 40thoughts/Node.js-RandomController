var app = require('../app');
var printer = require('./thermalPrinter');

module.exports = function(server){
  var io = require('socket.io')(server);

  // catch errors
  io.on('error', function(err){
    throw err;
  })

  // use the socket
  io.on('connection', function (socket) {
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('print text', function(text){
      printer.printText(text);
    });
  });

  return io;
}
