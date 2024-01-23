const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const app = express();
app.use(express.json());

const temDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: temDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

// upload.fields([
//   { name: "avatar", maxCount: 4 },
//   { name: "documnets", maxCount: 3 },
// ]);
// upload.array('avatar', 3)
app.post("/", upload.single("avatar"), async (req, res) => {
  const publicPath = path.join(__dirname, "public", req.file.originalname);
  await fs.rename(req.file.path, publicPath);
  res.json("qwe");
});

app.listen(3000, () => {
  console.log("Working");
});
