const { alertPrivateSocket } = require("./notifier/privateSocket");

function connectSocket(socket, io) {
  //<-- notifications alert -->
  alertPrivateSocket(socket, io);
}

module.exports = { connectSocket };
