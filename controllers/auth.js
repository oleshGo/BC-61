const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const { ctrlWrapper } = require("../decorators");
const { httpError } = require("../helpers");
const User = require("../models/user");
const envsConfig = require("../configs/envsConfig");

const register = async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw httpError(409, `User with email ${email} already exist`);
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { email: userEmail, name } = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ userEmail, name });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isExist = await User.findOne({ email });

  if (!isExist) {
    throw httpError(401, `Email or password wrong`);
  }
  const isPasswordSame = bcrypt.compare(password, isExist.password);
  if (!isPasswordSame) {
    throw httpError(401, `Email or password wrong`);
  }

  const token = await jsonwebtoken.sign({ id: isExist.id }, envsConfig.jwtSecret);

  res.json({
    user: {
      email: isExist.email,
      name: isExist.name,
    },
    token,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
