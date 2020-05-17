const Server = require("socket.io");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const debug = require("debug")("chatServer");
const { event } = require("../config/constants");
const fs = require("fs");

let io;

exports.listen = http => {
  io = new Server(http);
  io.on("connection", socket => {
    debug(`${socket.id} connect to the chat server.`);
    handleJoinSavedChannel(socket);
    handleJoinChannel(socket);
    handleLeaveChannel(socket);
    handleMessageBroadcasting(socket, io);
    handleReplyMessage(socket, io);
    handleDisconnect(socket);
  });
};

function handleJoinSavedChannel(socket) {
  socket.on(event.JOIN_SAVED_CHANNEL, ({ channelNames }) => {
    debug(`${socket.id} joined ${channelNames}`);
    socket.join(channelNames);
  });
}

function handleJoinChannel(socket) {
  socket.on(event.JOIN_NEW_CHANNEL, ({ channel, user }) => {
    socket.join(channel.name);
    UserController.joinChannel({ channelId: channel.id, userId: user.id })
      .then(() => {
        socket.emit("joinResult", {
          success: true,
          channel
        });
      })
      .catch(console.error);
  });
}

function handleLeaveChannel(socket) {
  socket.on(event.LEAVE_CHANNEL, ({ channel, user }) => {
    socket.leave(channel.name);
    UserController.leaveChannel({
      channelId: channel.id,
      userId: user.id
    })
      .then(() => {
        socket.emit("leaveResult", {
          success: true
        });
      })
      .catch(console.error);
  });
}

function handleMessageBroadcasting(socket, io) {
  socket.on(event.MESSAGE, async message => {
    debug(`${socket.id} send message: %o`, message);

    let newMessage = {
      content: message.text,
      sender_id: message.sender.id,
      channel_id: message.room.id,
      attachment_id: message.attachment ? message.attachment.id : undefined
    };
    message.id = (await MessageController.addMessage(newMessage)).id;
    message.replies = [];
    debug(message);
    io.in(message.room.name).emit(event.MESSAGE, message);
  });
}

function handleReplyMessage(socket, io) {
  socket.on(event.REPLY_MESSAGE, ({ text, sender, room, replyToMessageId }) => {
    debug(
      `${socket.id} replies to message ${replyToMessageId} in room ${room.name} with ${text}`
    );
    MessageController.addMessage({
      content: text,
      sender_id: sender.id,
      channel_id: room.id,
      master_message_id: replyToMessageId
    })
      .then(msg => {
        let newMessage = {
          text,
          sender,
          room,
          replyToMessageId,
          id: msg.id
        };
        io.in(room.name).emit(event.REPLY_MESSAGE, newMessage);
      })
      .catch(console.error);
  });
}

function handleDisconnect(socket) {
  socket.on("disconnect", () => {
    debug(`${socket.id} disconnected.`);
  });
}
