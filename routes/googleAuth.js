const express = require("express");
const router = express.Router();
require("../utils/passport");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
  console.log("Hello World");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/",
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        userId: req.user.id,
        randomText: "bvfhdbvhbfhvfhbvhfbvhbfvbfdhvbhfbvhdfbvhfbh",
      },
      process.env.SECRET_KEY
    );
    res.redirect(`http://localhost:5173/notes?token=${token}`);
  }
);

module.exports = router;
