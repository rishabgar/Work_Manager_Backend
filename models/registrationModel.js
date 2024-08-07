const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: { type: String, default: undefined },

    auth_key: { type: String, required: [true, "AuthKey is required"] },
  },
  { timestamps: true }
);

// This is a which save password in brycpt form in database
userSchema.pre("save", async function (next) {
  // this condition checks that password is modified or not
  if (!this.isModified("password")) return next();
  // console.log(typeof Number(process.env.SALT_ROUNDS));
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUNDS)
  );
  // console.log("hello");
  next();
  // console.log("hello there");
});

module.exports = User = mongoose.model("User", userSchema);
