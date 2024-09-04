// require("dotenv").config();
// const express = require("express");
// const app = express();
// const notesRoutes = require("./routes/index");
// const googleRoutes = require("./routes/googleAuth");
// const session = require("express-session");
// const cors = require("cors");
// const port = process.env.BACKEND_PORT || 3000;

// app.use(cors());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(express.json());
// app.use("/notes", notesRoutes);
// app.use("/", googleRoutes);

// // app.get("/", (req, res) => {
// //   res.json("World!!");
// // });

// app.listen(port, () => {
//   console.log(`Example app listening on port: ${port}`);
// });

require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const app = express();
const notesRoutes = require("./routes/index");
const googleRoutes = require("./routes/googleAuth");
const session = require("express-session");
const cors = require("cors");
const { Server } = require("socket.io");
const port = process.env.BACKEND_PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

io.on("connection", (socket) => {
  console.log("Socket Connected");
  // console.log(socket.rooms);
  socket.join("room-1");
  // io.to("room-1").emit("JoinedUsers", { test: "socket.rooms" });
  console.log(socket.rooms);

  socket.on("changedNote", (data) => {
    io.to("room-1").emit("sharedNoteEmit", { ...data });
    console.log("Hello", data);
  });
});

app.use(express.json());
app.use("/notes", notesRoutes);
app.use("/", googleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
