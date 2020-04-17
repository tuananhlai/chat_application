const router = require("express").Router();
const ChannelController = require("../controllers/channel");
const baseRouter = require("./baseRouter");
const auth = require("../passport-config");

router.use("/", auth.jwtAuth());

router.get("/message", (req, res) => {
  ChannelController.getMessageAndSenderInChannel(req.query.id).then(channelMessages => {
    return baseRouter.success(res, 200, channelMessages);
  }).catch(err => {
    baseRouter.error(res, 500, err.message);
  })
})

router.get("/member", (req, res) => {
  ChannelController.getChannelMember(req.query.id).then(members => {
    return baseRouter.success(res, 200, members);
  }).catch(err => {
    baseRouter.error(res, 500);
  })
})

module.exports = router;