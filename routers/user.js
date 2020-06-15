const router = require("express").Router();
const baseRouter = require("./baseRouter");
const UserController = require("../controllers/user");
const PersonalMessageController = require("../controllers/personalMessage");

const auth = require("../passport-config");
const { errorMessage, BCRYPT_SALT_ROUND } = require("../config/constants");
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
            401,
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
  if (!validateRequiredFields(["name", "email", "password"], req.body)) {
    return baseRouter.error(res, 400, "REQUIRED_FIELDS_MISSING");
  }
  const { name, email, password } = req.body;

  let hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUND);
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

router.get("/all", (req, res) => {
  UserController.findAll("id", "!=", req.user.id)
    .then((users) => {
      return baseRouter.success(res, 200, users);
    })
    .catch((err) => {
      return baseRouter.error(res, 500, err.message);
    });
});

router.put("/update-password", async (req, res) => {
  if (!validateRequiredFields(["currentPassword", "newPassword"], req.body)) {
    return baseRouter.error(res, 400, errorMessage.REQUIRED_FIELDS_MISSING);
  }
  const { currentPassword, newPassword } = req.body;
  try {
    let user = await UserController.getUserById(req.user.id);
    if (!bcrypt.compareSync(currentPassword, user.password))
      return baseRouter.error(res, 401, "Wrong password");
    let hashedNewPassword = bcrypt.hashSync(newPassword, BCRYPT_SALT_ROUND);
    await UserController.updateInfos({
      user_id: req.user.id,
      password: hashedNewPassword
    });
    return baseRouter.success(res, 200, "Update Success");
  } catch (err) {
    return baseRouter.error(res, 500, err.message);
  }
});

router.get("/personal-chat", async (req, res) => {
  try {
    let chats = await PersonalMessageController.getPersonalChats(req.user.id);
    return baseRouter.success(res, 200, chats);
  } catch (err) {
    return baseRouter.error(
      res,
      500,
      "Something went wrong. Can't get personal chats."
    );
  }
});

router.get("/personal-chat-message", async (req, res) => {
  if (!validateRequiredFields(["partner_id"], req.query)) {
    return baseRouter.error(res, 400, "REQUIRED_FIELDS_MISSING");
  }
  let { partner_id } = req.query;
  try {
    let chatMessages = await PersonalMessageController.getPersonalChatMessages(
      req.user.id,
      partner_id
    );
    return baseRouter.success(res, 200, chatMessages);
  } catch (err) {
    return baseRouter.error(res, 500, "SWW: Cannot get personal chat messages");
  }
});

module.exports = router;
