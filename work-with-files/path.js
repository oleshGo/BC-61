const fs = require("fs/promises");
const foo = require("./files");

const fsWorker = async () => {
  const data = await foo();
  console.log(data);
};

fsWorker();
