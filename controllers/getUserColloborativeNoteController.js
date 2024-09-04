const ColloborativeNote = require("../models/colloboraiveNoteModel");
const { connectdb } = require("../db/index");
const jwt = require("jsonwebtoken");

exports.getUserColloborativeNotes = async function (req, res) {
  await connectdb();
  try {
    const auth_key = req.headers.authorization;
    const decodedAuthKey = jwt.verify(auth_key, process.env.SECRET_KEY);
    // Getting User Id from decoded auth key
    const userId = decodedAuthKey?.userId;

    const allNote = await ColloborativeNote.find(
      {
        $or: [{ user_id: userId }, { other_user_id: userId }],
      },
      "note_id title description other_user_id user_id"
    );

    if (allNote.length > 0) {
      return res
        .status(200)
        .json({ message: "All Notes", success: true, allNote });
    }
    return res
      .status(200)
      .json({ message: "No Note Available", success: false });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      Error: `Error:${error.message}`,
    });
  }
};
