const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const nanoid = require("nanoid");

const { ctrlWrapper } = require("../decorators");
const { httpError } = require("../helpers");
const User = require("../models/user");
const envsConfig = require("../configs/envsConfig");
const sendEmail = require("../services/emailService");

const register = async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw httpError(409, `User with email ${email} already exist`);
  }
  const avatarUrl = gravatar.url(email);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const verificationToken = "jhsdfjgdsjhgtaerwt";

  const emailSettings = {
    to: email,
    subject: "Verification",
    html: `<a href="${envsConfig.baseUrl}/api/auth/verify/${verificationToken}" target="_blank">Click to verify</a>`,
  };

  await sendEmail(emailSettings);
  const { email: userEmail, name } = await User.create({ ...req.body, password: hashedPassword, avatarUrl, verificationToken });
  res.status(201).json({ userEmail, name });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isExist = await User.findOne({ email });

  if (!isExist) {
    throw httpError(401, `Email or password wrong`);
  }

  if (!isExist.isVerified) {
    throw httpError(401, "Email not verified");
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

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw httpError(401, "Unauthorize");
  }
  await User.findByIdAndUpdate(user._id, { verificationToken: "", isVerified: true });
  res.json({ message: "Verified success" });
};

const resend = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(404, "User not found");
  }
  if (user.isVerified) {
    throw httpError(400, "User already verified");
  }

  const emailSettings = {
    to: email,
    subject: "Verification",
    html: `<a href="${envsConfig.baseUrl}/api/auth/verify/${user.verificationToken}" target="_blank">Click to verify</a>`,
  };

  await sendEmail(emailSettings);

  res.json({ message: "Message sent" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resend: ctrlWrapper(resend),
};
