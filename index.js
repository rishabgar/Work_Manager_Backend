require("dotenv").config();
const express = require("express");
const app = express();
const notesRoutes = require("./routes/index");
const googleRoutes = require("./routes/googleAuth");
const session = require("express-session");
const cors = require("cors");
const port = process.env.BACKEND_PORT || 3000;

app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use("/notes", notesRoutes);
app.use("/", googleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${process.env.BACKEND_PORT}`);
});
