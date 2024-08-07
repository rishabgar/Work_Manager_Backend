const express = require("express");
const router = express.Router();

// Importing controllers
const userNotes = require("../controllers/addNoteController");
const userRegistration = require("../controllers/userRegistrationController");
const userLogin = require("../controllers/userLoginController");

// Implementing routes
router.post("/add-note", userNotes.addCollaborativeNotes);

router.post("/user-registration", userRegistration.userRegistration);
router.post("/user-login", userLogin.userLogin);

router.get("/test", (req, res) => {
  // console.log("Success", req.user);
  res.send("Welcome");
});

module.exports = router;
