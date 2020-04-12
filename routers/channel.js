const router = require("express").Router();
const ChannelController = require("../controllers/channel");
const baseRouter = require("./baseRouter");
const auth = require("../passport-config");

router.use("/", auth.jwtAuth());

router.get("/message", (req, res) => {
  ChannelController.getMessageAndSenderInChannel(req.query.id).then(messages => {
    return baseRouter.success(res, 200, messages);
  }).catch(err => {
    baseRouter.error(res, 500, err.message);
  })
})

module.exports = router;