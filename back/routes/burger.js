var express = require('express');
var router = express.Router();
const db = require('../models');
const auth = require('../auth/auth')
/* GET Burgers listing. */
router.get('/',auth.checkTokenMiddleware,async function(req, res, next) {
    const burgers = await db.Burger.findAll();
    if (burgers) {
        res.json(burgers);
    }
    else {
        res.sendStatus(404);
    }
});
router.get('/:id',async function(req, res, next) {
    const burgerID = req.params.id;    
    const burgerDb = await db.Burger.findOne({ where: { id: burgerID } });
    if (burgerDb) {
        res.json(burgerDb);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
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
router.put('/:id',async function(req, res, next) {
    const burgerID = req.params.id;
    const burger = req.body;
    const burgerDb = await db.Burger.findOne({ where: { id: burgerID } });

    if (burgerDb) {

        burgerDb.title=burger.title;
        burgerDb.description=burger.title;
        burgerDb.price=burger.price;
        burgerDb.image=burger.image;

        await burgerDb.save();
        res.json(burgerDb);
    }
    else {
        res.sendStatus(404);
    }
});
router.delete('/:id',async function(req, res, next) {
    const burgerID = req.params.id;    
    const burgerDb = await db.Burger.findOne({ where: { id: burgerID } });
    if (burgerDb) {
        await burgerDb.destroy();
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;
