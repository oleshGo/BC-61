const jwt = require("jsonwebtoken");

const { httpError } = require("../helpers");
const { envsConfig } = require("../configs");
const User = require("../models/user");

const authorize = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401, "Unauthorize"));
  }
  try {
    const { id } = await jwt.verify(token, envsConfig.jwtSecret);
    const user = await User.findById(id);
    if (!token || !user.token || user.token !== token) {
      next(httpError(401, "Unauthorize"));
    }
    req.user = user;
  } catch {
    next(httpError(401, "Unauthorize"));
  }
  next();
};

module.exports = authorize;
