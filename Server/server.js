const express = require("express");
const ConnectMongoose = require("./Configurations/Database");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const socket = require("socket.io");
const morgan = require("morgan");

// Configuration of the .ENV file
dotenv.config();

// Connecting the Database
ConnectMongoose();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./Routes/userRoute"));
app.use("/api/messages", require("./Routes/messageRoute"));

// Listen the App
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Has Been Started at http://localhost:${process.env.PORT} ...`
  );
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
