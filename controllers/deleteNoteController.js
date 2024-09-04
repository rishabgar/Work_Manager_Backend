const Note = require("../models/noteModel");
const { connectdb } = require("../db/index");

exports.deleteUserNote = async function (req, res) {
  await connectdb();
  try {
    const noteId = req.body.note_id;

    const deletedNote = await Note.deleteOne({ note_id: noteId });
    console.log(deletedNote);

    if (deletedNote.deletedCount !== 0) {
      return res.status(200).json({ success: true, message: "Note Deleted" });
    }
    return res
      .status(200)
      .json({ success: false, message: "Note Not Available" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      Error: `Error:${error.message}`,
    });
  }
};
