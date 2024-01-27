const { Server } = require("socket.io");
const httpServer = require("http").createServer();

const users = [];

const io = new Server(httpServer, {
  cors: {
    origins: "*",
  },
});

io.on("connection", (socket) => {
  users.push(socket.id);
  io.to(users[0]).emit("message", "New user connected");
  socket.on("new-message", (message) => {
    socket.broadcast.emit("user-connect", message);
  });
});

httpServer.listen(4000);
