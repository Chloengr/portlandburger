var express = require('express');
var router = express.Router();
const db = require('../models');
const auth = require('../auth/auth');
/* LOGIN. */
router.post('/login', async function(req, res, next) {
    // Pas d'information à traiter
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
  }

  // Checking
  const user = db.User.findOne({ where: { username: req.body.username, password: req.body.password } })

  // Pas bon
  if (!user) {
      return res.status(400).json({ message: 'Error. Wrong login or password' })
  }

  const token = auth.generateAccessToken(req.body.username);


  return res.json({ access_token: token })
});

/* POST users. */
router.post('/register', async function(req, res, next) {
  const user = req.body;
  await db.User.create({
      username: user.username,
      password: user.password,
      role: user.role,
    }).then((result) => res.json(result));
});


module.exports = router;
