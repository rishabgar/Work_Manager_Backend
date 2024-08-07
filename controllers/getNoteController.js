const Note = require("../models/noteModel");
const { connectdb } = require("../db/index");
const jwt = require("jsonwebtoken");

exports.getAllNotes = async function (req, res) {
  await connectdb();
  try {
    const allNote = await Note.find({}, "note_id title description");

    if (allNote.length > 0) {
      return res.status(200).json({ message: "All Notes", allNote });
    }
    return res.status(200).json({ message: "No Note Available" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      Error: `Error:${error.message}`,
    });
  }
};
