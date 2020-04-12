const Server = require("socket.io");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
let io;

exports.listen = http => {
  io = new Server(http);
  io.on("connection", socket => {
    console.log("A User Connect.");
    setUpConnection(socket);
    handleMessageBroadcasting(socket, io);
  });
};

function setUpConnection(socket) {
  socket.on("setup", (info) => {
    socket.join(info.channels);
  })
}

function handleMessageBroadcasting(socket, io) {
  socket.on("message", message => {
    console.log(message);
    MessageController.addMessage({
      content: message.text,
      created_at: message.created_at,
      sender_id: message.sender.id,
      channel_id: message.room.id
    }).then(msg => {
      message.id = msg.id;
      console.log(message);
      io.in(message.room.name).emit("message", message);
    })
  })
}
