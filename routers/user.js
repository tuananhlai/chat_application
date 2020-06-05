const router = require("express").Router();
const baseRouter = require("./baseRouter");
const UserController = require("../controllers/user");
const auth = require("../passport-config");
const { errorMessage } = require("../config/constants");
const { UniqueViolationError } = require("objection");
const { validateRequiredFields } = require("../lib/validate");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    UserController.findByEmail(email, password)
      .then((user) => {
        if (!user || !bcrypt.compareSync(password, user.password))
          return baseRouter.error(
            res,
            400,
            errorMessage.WRONG_EMAIL_OR_PASSWORD
          );

        let token = auth.createToken(user);
        delete user.password;
        return baseRouter.success(res, 200, { token, user });
      })
      .catch((err) => {
        return baseRouter.error(res, 500, err.message);
      });
  } catch (err) {
    return baseRouter.error(res, 500, err.message);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let hashedPassword = bcrypt.hashSync(password, 2);
  let newUser = {
    name,
    email,
    password: hashedPassword
  };
  try {
    let user = await UserController.addUser(newUser);
    await UserController.joinChannel({ channelId: 1, userId: user.id });
    delete user.password;
    return baseRouter.success(res, 200, user);
  } catch (err) {
    if (err instanceof UniqueViolationError)
      return baseRouter.error(res, 409, "Email already existed.");
    baseRouter.error(res, 500);
  }
});

router.get("/verify-token", async (req, res) => {
  if (!validateRequiredFields(["token"], req.query)) {
    return baseRouter.error(res, 400, "REQUIRED_FIELDS_MISSING");
  }
  const { token } = req.query;
  try {
    const decoded = auth.verifyToken(token);
    let user = await UserController.findBy("id", decoded.id);
    delete user.password;
    return baseRouter.success(res, 200, { user });
  } catch (err) {
    return baseRouter.error(res, 400);
  }
});

router.use("/", auth.jwtAuth());

router.get("/channel-list", (req, res) => {
  UserController.getChannelList(req.user)
    .then((channels) => {
      baseRouter.success(res, 200, channels);
    })
    .catch((err) => {
      baseRouter.error(res, 500, err.message);
    });
});

router.get("/unjoined-channel-list", (req, res) => {
  UserController.getUnjoinedChannelList(req.user.id)
    .then((unjoinedChannels) => {
      baseRouter.success(res, 200, unjoinedChannels);
    })
    .catch((err) => {
      baseRouter.error(res, 500);
    });
});

router.put("/update-info", (req, res) => {
  const { name, email, password } = req.body;
  let hashedPassword;
  if (password) hashedPassword = bcrypt.hashSync(password, 2);

  UserController.updateInfos({
    user_id: req.user.id,
    name,
    email,
    password: hashedPassword
  })
    .then((updatedUser) => {
      return baseRouter.success(res, 200, "Updated Success.");
    })
    .catch((err) => {
      baseRouter.error(res, 500, err.message);
    });
});

module.exports = router;
