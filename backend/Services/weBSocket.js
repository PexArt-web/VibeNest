const { alertSocket } = require("./notifier/privateSocket");

function connectSocket(socket, io) {
  //<-- notifications alert -->
  alertSocket(socket, io);
}

module.exports = { connectSocket };
