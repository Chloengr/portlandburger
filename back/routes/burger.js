var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET Burgers listing. */
router.get('/',async function(req, res, next) {
    const burgers = await db.Burger.findAll();
    res.json(burgers);
});
/* GET Burgers listing. */
router.post('/',async function(req, res, next) {
    const burger = req.body;
    await db.Burger.create({
        title: burger.title,
        description: burger.description,
        price: burger.price,
        image: burger.image,
      }).then((result) => res.json(result));
});

module.exports = router;
