const ws = require("ws");

const wsServer = new ws.Server({ port: 4000 });

const users = [];

wsServer.on("connection", (socket) => {
  users.push(socket);

  socket.on("message", (message) => {
    console.log(1);
    users.forEach((user) => {
      if (user !== socket) {
        user.send(message.toString());
      }
    });
  });

  socket.send(`Hello`);
});
