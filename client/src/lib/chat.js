class Chat {
  constructor(socket, user) {
    this.socket = socket;
    this.user = user;
  }

  // room: obj, text: string, created_at: date, user: obj
  sendMessage(room, text) {
    let message = {
      room,
      text,
      created_at: new Date(),
      user: this.user
    };
    this.socket.emit("message", message);
  }

  getSocket() {
    return this.socket;
  }
}

module.exports = Chat;
