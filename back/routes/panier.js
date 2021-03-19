var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET Paniers listing. */
router.get('/', function(req, res, next) {
    const paniers = await db.Panier.findAll();
    if (paniers) {
        res.json(paniers);
    }
    else {
        res.sendStatus(404);
    }
});
/* GET Panier of UserID listing. */
router.get('/:UserId', function(req, res, next) {
    const burgerID = req.params.id;    
    const burgerDb = await db.Burger.findOne({ where: { UserId: UserId } });
    if (burgerDb) {
        res.json(burgerDb);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;
