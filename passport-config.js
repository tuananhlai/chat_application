const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const UserController = require("./controllers/user");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.PASSPORT_SECRET || "secretOrKey";

const options = {
  secretOrKey,
  jwtFromRequest: (req) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      return authorization.split(" ")[1];
    }
    return null;
  }
};

const verify = async (jwt_payload, done) => {
  if (!jwt_payload.id) return done(null, false);

  try {
    let user = await UserController.getUserById(jwt_payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new JWTStrategy(options, verify));

// Export module
const auth = {};

auth.createToken = (user) => {
  let payload = { id: user.id };
  return jwt.sign(payload, options.secretOrKey);
};

auth.passport = passport;

auth.verifyToken = (token) => {
  return jwt.verify(token, secretOrKey);
};

auth.jwtAuth = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = auth;
