const app = require("./app");
const mongoose = require("mongoose");
const { envsConfig } = require("./configs");

mongoose
  .connect(envsConfig.dbHost)
  .then(() => {
    app.listen(envsConfig.port, () => {
      console.log(`Server running. Use our API on port: ${envsConfig.port}`);
    });
  })
  .catch(() => {
    console.log("Connection error");
    process.exit(1);
  });
