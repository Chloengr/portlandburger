var express = require("express");
var router = express.Router();
const db = require("../models");
const auth = require("../auth/auth");
/* LOGIN. */
router.post("/login", async function (req, res, next) {
  // Pas d'information à traiter
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Error. Please enter the correct username and password",
    });
  }

  // Checking
  const user = await db.User.findOne({
    where: { username: req.body.username, password: req.body.password },
  });

  // Pas bon
  if (!user) {
    return res.status(400).json({ message: "Error. Wrong login or password" });
  }

  const token = auth.generateAccessToken(user.username, user.id, user.role);

  return res.json({
    access_token: token,
    username: user.username,
    role: user.role,
    id: user.id,
  });
});

/* POST users. */
router.post("/register", async function (req, res, next) {
  const user = req.body;
  const roles = ["ADMIN", "USER"];
  if (!roles.some((e) => e === req.body.role)) {
    return res.status(400).json({ message: "Error. Wrong role" });
  }
  const userfind = await db.User.findOne({
    where: { username: req.body.username },
  });
  if (userfind) {
    return res.status(400).json({ message: "Error. Username already exist" });
  }
  await db.User.create({
    username: user.username,
    password: user.password,
    role: user.role,
    id: user.id,
  }).then((result) => {

    const token = auth.generateAccessToken(result.username, result.id, result.role);
    return res.json({
      access_token: token,
      username: result.username,
      role: result.role,
      id: result.id,
    });
  });
});

module.exports = router;
