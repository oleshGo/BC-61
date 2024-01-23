const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

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
  const avatarUrl = gravatar.url(email);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { email: userEmail, name } = await User.create({ ...req.body, password: hashedPassword, avatarUrl });
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
  await User.findByIdAndUpdate(isExist.id, { token });

  res.json({
    user: {
      email: isExist.email,
      name: isExist.name,
    },
    token,
  });
};

const current = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const oldPath = req.file.path;
  const newPath = path.resolve("public", _id, req.file.originalname);

  await fs.rename(oldPath, newPath);
  const avatarUrl = req.file.originalname;
  await User.findByIdAndUpdate(_id, { avatarUrl }, { new: true });
  res.json({
    avatarUrl,
  });
};

const fileExample = (req, res) => {
  const avatar = req.files.avatar;
  const ext = path.extname(avatar.name);
  const avatarPath = path.resolve("public", `avatar${ext}`);
  fs.writeFile(avatarPath, avatar.data);
  res.json({ avatarUrl: `avatar${ext}` });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  fileExample: ctrlWrapper(fileExample),
};
