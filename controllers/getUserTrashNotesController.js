const Note = require("../models/noteModel");
const { connectdb } = require("../db/index");
const jwt = require("jsonwebtoken");

exports.getTrashNotes = async function (req, res) {
  await connectdb();
  try {
    const auth_key = req.headers.authorization;
    const decodedAuthKey = jwt.verify(auth_key, process.env.SECRET_KEY);
    // Getting User Id from decoded auth key
    const userId = decodedAuthKey?.userId;

    const allNote = await Note.find(
      { user_id: userId, isTrsahed: 1 },
      "note_id title description"
    );

    if (allNote.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "All Notes", allNote });
    }
    return res
      .status(200)
      .json({ success: false, message: "No Note Available" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      Error: `Error:${error.message}`,
    });
  }
};
