const express = require("express");
const router = express.Router();
require("../utils/passport");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://work-manager-frontend.vercel.app/",
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        userId: req.user.id,
        randomText: "bvfhdbvhbfhvfhbvhfbvhbfvbfdhvbhfbvhdfbvhfbh",
      },
      process.env.SECRET_KEY
    );
    res.redirect(
      `https://work-manager-frontend.vercel.app/notes?token=${token}`
    );
  }
);

module.exports = router;

// https://work-manager-frontend.vercel.app/
