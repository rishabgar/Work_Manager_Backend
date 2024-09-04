// const express = require("express");
// const router = express.Router();

// // Importing controllers
// const userNotes = require("../controllers/addNoteController");
// const userRegistration = require("../controllers/userRegistrationController");
// const userLogin = require("../controllers/userLoginController");

// // Implementing routes
// router.post("/add-note", userNotes.addCollaborativeNotes);

// router.post("/user-registration", userRegistration.userRegistration);
// router.post("/user-login", userLogin.userLogin);

// router.get("/test", (req, res) => {
//   // console.log("Success", req.user);
//   res.send("Welcome");
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

// Importing controllers
const userNotes = require("../controllers/addNoteController");
const userRegistration = require("../controllers/userRegistrationController");
const userLogin = require("../controllers/userLoginController");
const getNote = require("../controllers/getNoteController");
const addUserColloborativeNote = require("../controllers/addUserColloborativeNoteController");
const getUserColloborativeNote = require("../controllers/getUserColloborativeNoteController");
const updateNote = require("../controllers/updateNoteController");
const getUserTrashNotes = require("../controllers/getUserTrashNotesController");
const deleteNote = require("../controllers/deleteNoteController");
const updateColloborativeNote = require("../controllers/updateColloborativeNoteController");

// Implementing routes
router.post("/add-note", userNotes.addCollaborativeNotes);
router.post("/user-registration", userRegistration.userRegistration);
router.post("/user-login", userLogin.userLogin);
router.get("/get-user-notes", getNote.getUserNotes);
router.post(
  "/add-user-colloborative-note",
  addUserColloborativeNote.addCollaborativeNotes
);
router.post("/update-note", updateNote.updateNote);
router.post("/delete-note", deleteNote.deleteUserNote);
router.post(
  "/update-colloborative-note",
  updateColloborativeNote.updateColloborativeNote
);
router.get(
  "/get-user-colloborative-note",
  getUserColloborativeNote.getUserColloborativeNotes
);
router.get("/get-trashed-notes", getUserTrashNotes.getTrashNotes);

router.get("/test", (req, res) => {
  // console.log("Success", req.user);
  res.send("Welcome");
});

module.exports = router;
