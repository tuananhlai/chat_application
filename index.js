"use strict";
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("./lib/chat_server");
const cors = require("cors");
const UserRouter = require("./routers/user");
const ChannelRouter = require("./routers/channel");
const FileRouter = require("./routers/file");
const WorkspaceRouter = require("./routers/workspace");
const path = require("path");
const upload = require("multer")({
  dest: "./public/images"
});
const history = require("connect-history-api-fallback");

const passport = require("passport");
const staticClientMiddleware = express.static(
  path.join(__dirname, "client", "dist")
);
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
io.listen(http);

app.use("/user", UserRouter);
app.use("/channel", ChannelRouter);
app.use("/file", FileRouter);
app.use("/workspace", WorkspaceRouter);

app.use(staticClientMiddleware);
app.use(history());
app.use(staticClientMiddleware);
const port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log(`Listening on ${port}`);
});
