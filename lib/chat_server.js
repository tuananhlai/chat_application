const Server = require("socket.io");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const debug = require("debug")("chatServer");
import { event } from "../config/constants";
let io;

exports.listen = http => {
  io = new Server(http);
  io.on("connection", socket => {
    debug(`${socket.id} connect to the chat server.`);
    handleSetupConnection(socket);
    handleJoinChannel(socket);
    handleMessageBroadcasting(socket, io);
    // handleReplyMessageBroadcasting(socket, io);
    handleDisconnect(socket);
  });
};

function handleSetupConnection(socket) {
  socket.on(event.SETUP_CONNECTION, ({ channelNames }) => {
    debug(`${socket.id} joined ${channelNames}`);
    socket.join(channelNames);
  });
}

function handleJoinChannel(socket) {
  socket.on(event.JOIN_CHANNEL, ({ channel, user }) => {
    socket.join(channel.name);
    UserController.joinChannel({ channelId: channel.id, userId: user.id })
      .then(result => {
        socket.emit("joinResult");
      })
      .catch(console.error);
  });
}

function handleMessageBroadcasting(socket, io) {
  socket.on(event.MESSAGE, message => {
    debug(`${socket.id} send message: %o`, message);
    // not allow empty text
    MessageController.addMessage({
      content: message.text,
      sender_id: message.sender.id,
      channel_id: message.room.id
    })
      .then(msg => {
        message.id = msg.id;
        message.created_at = msg.created_at;
        io.in(message.room.name).emit("message", message);
      })
      .catch(console.error);
  });
}

function handleDisconnect(socket) {
  socket.on("disconnect", () => {
    debug(`${socket.id} disconnected.`);
  });
}
