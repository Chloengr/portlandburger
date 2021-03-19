var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET Paniers listing. */
router.get('/',async function(req, res, next) {
    const paniers = await db.Panier.findAll();
    if (paniers) {
        res.json(paniers);
    }
    else {
        res.sendStatus(404);
    }
});
/* GET Panier of UserID listing. */
router.get('/:userId',async function(req, res, next) {
    const userId = req.params.userId;    
    const panierDb = await db.Panier.findOne({ where: { UserId: userId } });
    if (panierDb) {
        const panierBurger = await db.Panier_Burger.findOne({ where: { PanierId: panierDb.id } });
        let total=0;
        panierBurger.forEach(element => {
            const burger = getBurger(element.BurgerId);
            total+=element.qte * burger.price;
        });
        res.json({ panier: panierBurger, total:total});
    }
    else {
        res.sendStatus(404);
    }
});

/* POST Create Panier of User listing. */
router.post('/',async function(req, res, next) {
    const panier = req.body;
    const usersDb = await db.User.findOne({ where: { id: panier.UserId } });
    if (usersDb) {
        await db.Panier.create({
            UserId: 2,
            date:new Date()
          }).then((result) => res.json(result));
    }
    else {
        res.sendStatus(404);
    }
});

/* POST Add Burger in Panier of User listing. */
router.post('/burger',async function(req, res, next) {
    const panier = req.body;

    const panierDb = await db.Panier.findOne({ where: { UserId: panier.UserID } });
    if (panierDb) {
        await db.Panier_Burger.create({
            PanierId: panierDb.id,
            BurgerId: panier.BurgerId,
            qte:panier.qte || 1
          }).then((result) => res.json(result));
    }
    else {
        res.sendStatus(404);
    }
});

/* POST Plus One Burger in Panier of User listing. */
router.put('/burger/add',async function(req, res, next) {
    const panier = req.body;

    const panierBurgerDb = await db.Panier_Burger.findOne({ where: { BurgerId: panier.BurgerId, PanierId: panier.PanierId } });
    
    if (panierBurgerDb) {
        panierBurgerDb.qte++;
        await panierBurgerDb.save();
        res.json(panierBurgerDb);
    }
    else {
        res.sendStatus(404);
    }
});
/* POST Less One Burger in Panier of User listing. */
router.put('/burger/remove',async function(req, res, next) {
    const panier = req.body;

    const panierBurgerDb = await db.Panier_Burger.findOne({ where: { BurgerId: panier.BurgerId, PanierId: panier.PanierId } });
    
    if (panierBurgerDb) {
        panierBurgerDb.qte--;
        if (panierBurgerDb > 0) {
            await panierBurgerDb.save();
            res.json(panierBurgerDb);
        }
        else {
            await panierBurgerDb.destroy();
            res.json(200);
        }
    }
    else {
        res.sendStatus(404);
    }
});

async function getBurger(id) {
    return await db.Burger.findOne({ where: { id:id } });
}

module.exports = router;
