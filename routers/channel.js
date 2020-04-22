const router = require("express").Router();
const ChannelController = require("../controllers/channel");
const UserController = require("../controllers/user");
const baseRouter = require("./baseRouter");
const auth = require("../passport-config");
const { UniqueViolationError } = require("objection");

router.use("/", auth.jwtAuth());

router.get("/message", (req, res) => {
  ChannelController.getMessageAndSenderInChannel(req.query.id)
    .then(channelMessages => {
      return baseRouter.success(res, 200, channelMessages);
    })
    .catch(err => {
      baseRouter.error(res, 500, err.message);
    });
});

router.get("/member", (req, res) => {
  ChannelController.getChannelMember(req.query.id)
    .then(members => {
      return baseRouter.success(res, 200, members);
    })
    .catch(err => {
      baseRouter.error(res, 500);
    });
});

router.get("/get", (req, res) => {
  ChannelController.getAllChannels()
    .then(channels => {
      return baseRouter.success(res, 200, channels);
    })
    .catch(err => {
      return baseRouter.error(res, 500);
    });
});

router.post("/add", async (req, res) => {
  ChannelController.addChannel({
    name: req.body.name,
    description: req.body.description
  })
    .then(newChannel => {
      return baseRouter.success(res, 200, newChannel);
    })
    .catch(err => {
      if (err instanceof UniqueViolationError)
        return baseRouter.error(res, 409, "Channel already exists,");
      return baseRouter.error(res, 500);
    });
});

module.exports = router;
