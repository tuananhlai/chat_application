exports.event = {
  MESSAGE: "chatMessage",
  TYPING: "typing",
  REPLY_MESSAGE: "replyMessage",
  JOIN_SAVED_CHANNEL: "setup",
  JOIN_NEW_CHANNEL: "joinNew",
  LEAVE_CHANNEL: "leave",
  JOIN_RESULT: "joinResult"
};

exports.errorMessage = {
  DEFAULT: "Something went wrong",
  NO_EMAIL_OR_PASSWORD: "Please provide both email and password.",
  WRONG_EMAIL_OR_PASSWORD: "Wrong email or password.",
  INSUFFICIENT_USER_INFO: "Please provide all of user information.",
  UPLOAD_FILE_MISSING: "Please attach a file in your request."
};

exports.regExp = {
  URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
};
