"use strict";
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("./lib/chat_server");
const cors = require("cors");
const UserRouter = require("./routers/user");
const ChannelRouter = require("./routers/channel");
const passport = require("passport");

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
io.listen(http);

app.use("/user", UserRouter);
app.use("/channel", ChannelRouter);
app.use("*", (req, res) => {
  res.status(404).end("404 Not found.");
});

http.listen(3000, function() {
  console.log("Listening on 3000");
});
