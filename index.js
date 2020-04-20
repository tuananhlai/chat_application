"use strict";
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("./lib/chat_server");
const cors = require("cors");
const UserRouter = require("./routers/user");
const ChannelRouter = require("./routers/channel");
const path = require("path");

const passport = require("passport");

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "dist")));
io.listen(http);

app.use("/user", UserRouter);
app.use("/channel", ChannelRouter);
app.use("*", (req, res) => {
  res.status(404).end("404 Not found.");
});

const port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log(`Listening on ${port}`);
});
