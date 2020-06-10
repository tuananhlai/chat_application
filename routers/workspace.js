const router = require("express").Router();
const upload = require("multer")();
const baseRouter = require("./baseRouter");
const { errorMessage } = require("../config/constants");
const UserController = require("../controllers/user");
const auth = require("../passport-config");

router.use("/", auth.jwtAuth());

router.get("/all-user", (req, res) => {
  UserController.getAll()
    .then((users) => {
      return baseRouter.success(res, 200, users);
    })
    .catch((err) => {
      baseRouter.error(res, 500, "Cannot get all users");
    });
});

module.exports = router;
