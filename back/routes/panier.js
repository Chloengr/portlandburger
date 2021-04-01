var express = require("express");
var router = express.Router();
const db = require("../models");

/* GET Carts listing. */
router.get("/", async function (req, res, next) {
  const carts = await db.Cart.findAll();
  if (carts) {
    res.json(carts);
  } else {
    res.sendStatus(404);
  }
});

/* GET Cart of UserID listing. */

router.get("/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  let cartDb;

  if (!userId) {
    return res.sendStatus(400).json({ message: "Bad request." });
  }

  cartDb = await db.Cart.findOne({ where: { UserId: userId } });

  if (!cartDb) {
    await db.Cart.create({
      UserId: userId,
      date: new Date(),
    }).then((result) => (cartDb = result));
  }

  const cartBurger = await db.Cart_Burger.findAll({
    where: { CartId: cartDb.id },
    include: [{ model: db.Burger }],
  });

  if (!cartBurger || cartBurger.length === 0) {
    return res.json({ cartId: cartDb.id, cart: [], total: 0 });
  }


  const reducer = (total, element) =>
    total + element.qte * element.Burger.price;

  const total = cartBurger.reduce(reducer, 0);

  return res.json({
    cartId: cartDb.id,
    cart: cartBurger,
    total: total,
  });
});

/* POST Create Cart of User listing. */
router.post("/", async function (req, res, next) {
  const cart = req.body;
  const usersDb = await db.User.findOne({ where: { id: cart.UserId } });

  if (usersDb) {
    const cartDb = await db.Cart.findOne({ where: { UserId: usersDb.id } });

    if (!cartDb) {
      await db.Cart.create({
        UserId: usersDb.id,
        date: new Date(),
      }).then((result) => res.json(result));
    } else {
      res.json({ message: "Error. Cart is already created" });
    }
  } else {
    res.json({ message: "Error. User not found" });
  }
});

/* Delete Cart of User listing. */
router.delete("/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  let cartDb;

  if (!userId) {
    return res.sendStatus(400).json({ message: "Bad request." });
  }

  cartDb = await db.Cart.findOne({ where: { UserId: userId } });

  if (!cartDb) {
    return res.sendStatus(400).json({ message: "Bad request." });
  }

  const cartBurger = await db.Cart_Burger.findAll({
    where: { CartId: cartDb.id }
  });

  cartBurger.forEach(async element => {
    await element.destroy();
  });

  await cartDb.destroy();
  res.sendStatus(200);
});

/* POST Add Burger in Cart of User listing. */
router.post("/burger", async function (req, res, next) {
  const cart = req.body;

  const cartDb = await db.Cart.findOne({
    where: { UserId: cart.UserId },
  });
  if (cartDb) {
    const cartBurgerDb = await db.Cart_Burger.findOne({
      where: { BurgerId: cart.BurgerId, CartId: cartDb.id },
    });
    if (!cartBurgerDb) {
      await db.Cart_Burger.create({
        CartId: cartDb.id,
        BurgerId: cart.BurgerId,
        qte: cart.qte || 1,
      }).then((result) => res.json(result));
    } else {
      cartBurgerDb.qte += cart.qte || 1;
      await cartBurgerDb.save();
      res.json(cartBurgerDb);
    }
  } else {
    res.sendStatus(404);
  }
});

/* POST Plus One Burger in Cart of User listing. */
router.put("/burger/add", async function (req, res, next) {
  const cart = req.body;

  const cartBurgerDb = await db.Cart_Burger.findOne({
    where: { BurgerId: cart.BurgerId, CartId: cart.CartId },
  });

  if (cartBurgerDb) {
    cartBurgerDb.qte++;
    await cartBurgerDb.save();
    res.json(cartBurgerDb);
  } else {
    res.sendStatus(404);
  }
});
/* POST Less One Burger in Cart of User listing. */
router.put("/burger/remove", async function (req, res, next) {
  const cart = req.body;

  const cartBurgerDb = await db.Cart_Burger.findOne({
    where: { BurgerId: cart.BurgerId, CartId: cart.CartId },
  });

  if (cartBurgerDb) {
    cartBurgerDb.qte--;
    if (cartBurgerDb.qte > 0) {
      await cartBurgerDb.save();
      res.json(cartBurgerDb);
    } else {
      await cartBurgerDb.destroy();
      res.json(200);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
