const {log} = console
// for private notifications

let userID = {}
let users = {}
const alertSocket = (socket, io) => {
    socket.on("userDetails", ({id, username})=>{
        userID[id] = socket.id
        users[id] = username
    })
}

module.exports = { alertSocket }