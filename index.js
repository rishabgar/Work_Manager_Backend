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
    origin: [
      "https://work-manager-frontend.vercel.app",
      "https://work-manager-backend.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ], // Replace with your trusted domains
    methods: ["GET", "POST"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true, // Enable if you want to allow credentials (cookies, etc.)
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
  // console.log(socket.rooms);

  socket.on("changedNote", (data) => {
    io.to("room-1").emit("sharedNoteEmit", { ...data });
    console.log("Hello", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected"); // undefined
  });
});

app.use(express.json());
app.use("/notes", notesRoutes);
app.use("/", googleRoutes);

server.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
