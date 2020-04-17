const Server = require("socket.io");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
let io;

exports.listen = http => {
  io = new Server(http);
  io.on("connection", socket => {
    console.log("A User Connect.");
    handleSetupConnection(socket);
    handleJoinChannel(socket);
    handleMessageBroadcasting(socket, io);
    // handleReplyMessageBroadcasting(socket, io);
  });
};

function handleSetupConnection(socket) {
  socket.on("setup", ({ channelNames }) => {
    socket.join(channelNames); // TODO: change to channelNames
  });
}

function handleJoinChannel(socket) {
  socket.on("join", ({channel, user}) => {
    socket.join(channel.name);
    UserController.joinChannel({channelId: channel.id, userId: user.id}).then(result => {
      socket.emit("joinResult");
    }).catch(console.error);
  });
}

function handleMessageBroadcasting(socket, io) {
  socket.on("message", message => {
    // not allow empty text
    MessageController.addMessage({
      content: message.text,
      sender_id: message.sender.id,
      channel_id: message.room.id,
    }).then(msg => {
      message.id = msg.id;
      message.created_at = msg.created_at;
      io.in(message.room.name).emit("message", message);
    }).catch(console.error);
  });
}