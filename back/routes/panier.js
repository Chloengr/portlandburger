var express = require("express");
var router = express.Router();
const db = require("../models");

/* GET Paniers listing. */
router.get("/", async function (req, res, next) {
  const paniers = await db.Panier.findAll();
  if (paniers) {
    res.json(paniers);
  } else {
    res.sendStatus(404);
  }
});

/* GET Panier of UserID listing. */

router.get("/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  let panierDb;

  if (!userId) {
    return res.sendStatus(400).json({ message: "Bad request." });
  }

  panierDb = await db.Panier.findOne({ where: { UserId: userId } });

  if (!panierDb) {
    await db.Panier.create({
      UserId: userId,
      date: new Date(),
    }).then((result) => (panierDb = result));
  }

  const panierBurger = await db.Panier_Burger.findAll({
    where: { PanierId: panierDb.id },
    include: [{ model: db.Burger }],
  });

  if (!panierBurger || panierBurger.length === 0) {
    return res.json({ panierId: panierDb.id, panier: [], total: 0 });
  }

  console.log(panierBurger);

  const reducer = (total, element) =>
    total + element.qte * element.Burger.price;

  const total = panierBurger.reduce(reducer, 0);

  return res.json({
    panierId: panierDb.id,
    panier: panierBurger,
    total: total,
  });
});

/* POST Create Panier of User listing. */
router.post("/", async function (req, res, next) {
  const panier = req.body;
  const usersDb = await db.User.findOne({ where: { id: panier.UserId } });

  if (usersDb) {
    const panierDb = await db.Panier.findOne({ where: { UserId: usersDb.id } });

    if (!panierDb) {
      await db.Panier.create({
        UserId: usersDb.id,
        date: new Date(),
      }).then((result) => res.json(result));
    } else {
      res.json({ message: "Error. Panier is already created" });
    }
  } else {
    res.json({ message: "Error. User not found" });
  }
});

/* Delete Panier of User listing. */
router.delete("/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  let panierDb;

  if (!userId) {
    return res.sendStatus(400).json({ message: "Bad request." });
  }

  panierDb = await db.Panier.findOne({ where: { UserId: userId } });

  if (!panierDb) {
    return res.sendStatus(400).json({ message: "Bad request." });
  }

  const panierBurger = await db.Panier_Burger.findAll({
    where: { PanierId: panierDb.id }
  });

  panierBurger.forEach(async element => {
    await element.destroy();
  });

  await panierDb.destroy();
  res.sendStatus(200);
});

/* POST Add Burger in Panier of User listing. */
router.post("/burger", async function (req, res, next) {
  const panier = req.body;

  const panierDb = await db.Panier.findOne({
    where: { UserId: panier.UserId },
  });
  if (panierDb) {
    const panierBurgerDb = await db.Panier_Burger.findOne({
      where: { BurgerId: panier.BurgerId, PanierId: panierDb.id },
    });
    if (!panierBurgerDb) {
      await db.Panier_Burger.create({
        PanierId: panierDb.id,
        BurgerId: panier.BurgerId,
        qte: panier.qte || 1,
      }).then((result) => res.json(result));
    } else {
      panierBurgerDb.qte += panier.qte || 1;
      await panierBurgerDb.save();
      res.json(panierBurgerDb);
    }
  } else {
    res.sendStatus(404);
  }
});

/* POST Plus One Burger in Panier of User listing. */
router.put("/burger/add", async function (req, res, next) {
  const panier = req.body;

  const panierBurgerDb = await db.Panier_Burger.findOne({
    where: { BurgerId: panier.BurgerId, PanierId: panier.PanierId },
  });

  if (panierBurgerDb) {
    panierBurgerDb.qte++;
    await panierBurgerDb.save();
    res.json(panierBurgerDb);
  } else {
    res.sendStatus(404);
  }
});
/* POST Less One Burger in Panier of User listing. */
router.put("/burger/remove", async function (req, res, next) {
  const panier = req.body;

  const panierBurgerDb = await db.Panier_Burger.findOne({
    where: { BurgerId: panier.BurgerId, PanierId: panier.PanierId },
  });

  if (panierBurgerDb) {
    panierBurgerDb.qte--;
    if (panierBurgerDb.qte > 0) {
      await panierBurgerDb.save();
      res.json(panierBurgerDb);
    } else {
      await panierBurgerDb.destroy();
      res.json(200);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
