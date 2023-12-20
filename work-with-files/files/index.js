const fs = require("fs/promises");
const path = require("path");

const foo = async () => {
  //   const url = path.join(__dirname, "file.txt");
  const url = path.resolve("data", "new-file.txt");

  const data = await fs.readFile(url, "utf-8");
  return data;
};

module.exports = foo;
