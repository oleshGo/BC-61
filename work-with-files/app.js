const fs = require("fs/promises");

// fs.readFile("./files/file.txt", (error, data) => {
//   console.log(error);
//   console.log(data.toString());
// });

const fsWorker = async () => {
  const path = "./files/file.txt";
  //   const data = await fs.readFile("./files/file.txt", "utf-8");
  //   console.log(data);

  //   await fs.appendFile(path, "\nНовий текст");

  await fs.writeFile(path, "Новий текст");
};

fsWorker();
