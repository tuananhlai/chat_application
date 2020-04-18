const router = require("express").Router();
const baseRouter = require("./baseRouter");
const UserController = require("../controllers/user");
const auth = require("../passport-config");
const { errorMessage } = require("../config/constants");

router.post("/login", (req, res) => {
  try {
    UserController.authenticate(req.body.email, req.body.password).then(user => {
      if (!user) return baseRouter.error(res, 400, errorMessage.WRONG_EMAIL_OR_PASSWORD);

      let token = auth.createToken(user);
      return baseRouter.success(res, 200, {token, user});
    }).catch(err => {
      return baseRouter.error(res, 500, err.message);
    })
  } catch (err) {
    return baseRouter.error(res, 500, err.message);
  }
})

router.post("/register", async (req, res) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  try {
    let user = await UserController.addUser(newUser).catch(console.error);
    await UserController.joinChannel({channelId: 1, userId: user.id});
    return baseRouter.success(res, 200, user);
  } catch (err) {
    baseRouter.error(res, 400);
  }
})

router.use("/", auth.jwtAuth());

router.get("/channel-list", (req, res) => {
  UserController.getChannelList(req.user).then(channels => {
    baseRouter.success(res, 200, channels);
  }).catch(err => {
    baseRouter.error(res, 500, err.message);
  });
})

module.exports = router;