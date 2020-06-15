const Server = require("socket.io");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const PersonalMessageController = require("../controllers/personalMessage");
const debug = require("debug")("chatServer");
const { event } = require("../config/constants");
const fs = require("fs");

let io;

exports.listen = (http) => {
  io = new Server(http);
  io.on("connection", (socket) => {
    debug(`${socket.id} connect to the chat server.`);
    handleIdentifySocket(socket);
    handleJoinSavedChannel(socket);
    handleJoinChannel(socket);
    handleLeaveChannel(socket);
    handleMessageBroadcasting(socket, io);
    handlePersonalMessage(socket);
    handleReplyMessage(socket, io);
    handleReplyPersonalMessage(socket);
    handleDisconnecting(socket);
    handleDisconnect(socket);
  });
};

function handleIdentifySocket(socket) {
  socket.on(event.IDENTIFY_SOCKET, (userId) => {
    let userIdentityRoom = `user#${userId}`;
    socket.join(userIdentityRoom);
  });
}

function handleJoinSavedChannel(socket) {
  socket.on(event.JOIN_SAVED_CHANNEL, ({ channelNames }) => {
    debug(`${socket.id} joined ${channelNames}`);
    socket.join(channelNames);
    debug(socket.rooms);
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
  socket.on(event.MESSAGE, async (message) => {
    debug(`${socket.id} send message: %o`, message);
    debug(socket.rooms);
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

function handlePersonalMessage(socket) {
  /**
   * personalMessage {text: String, sender: Object, receiver: Object, attachment: Object}
   */
  socket.on(event.PERSONAL_MESSAGE, async (personalMessage) => {
    let receiverIdentityChannel = `user#${personalMessage.receiver.id}`;
    let newMessage = {
      content: personalMessage.text,
      sender_id: personalMessage.sender.id,
      receiver_id: personalMessage.receiver.id,
      attachment_id: personalMessage.attachment
        ? personalMessage.attachment.id
        : undefined
    };
    personalMessage.id = (
      await PersonalMessageController.addMessage(newMessage)
    ).id;
    personalMessage.replies = [];
    debug(personalMessage);
    socket
      .to(receiverIdentityChannel)
      .emit(event.PERSONAL_MESSAGE, personalMessage);
    socket.emit(event.PERSONAL_MESSAGE, personalMessage);
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
      .then((msg) => {
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

function handleReplyPersonalMessage(socket) {
  socket.on(
    event.REPLY_PERSONAL_MESSAGE,
    ({ text, sender, receiver, replyToMessageId }) => {
      debug("Handling Personal Message");
      let receiverIdentityChannel = `user#${receiver.id}`;
      PersonalMessageController.addMessage({
        content: text,
        sender_id: sender.id,
        receiver_id: receiver.id,
        master_personal_message_id: replyToMessageId
      })
        .then((msg) => {
          let newMessage = {
            text,
            sender,
            receiver,
            replyToMessageId,
            id: msg.id
          };
          socket
            .to(receiverIdentityChannel)
            .emit(event.REPLY_PERSONAL_MESSAGE, newMessage);
          socket.emit(event.REPLY_PERSONAL_MESSAGE, newMessage);
        })
        .catch(console.error);
    }
  );
}

function handleDisconnecting(socket) {
  socket.on("disconnecting", () => {
    debug(socket.rooms);
  });
}
function handleDisconnect(socket) {
  socket.on("disconnect", () => {
    debug(socket.rooms);
    debug(`${socket.id} disconnected.`);
  });
}
