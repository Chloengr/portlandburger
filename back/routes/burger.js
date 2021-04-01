var express = require("express");
var router = express.Router();
const db = require("../models");
const multer = require('multer');
const fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname) //Appending extension
  }
})

var upload = multer({ storage: storage });

const {checkTokenMiddleware, decodeToken,isAdminUser } = require('../auth/auth')
/* GET Burgers listing. */
router.get("/", checkTokenMiddleware, async function (req, res, next) {
  const burgers = await db.Burger.findAll();
  if (burgers) {
    res.json(burgers);
  } else {
    res.sendStatus(404);
  }
});
router.get("/:id", async function (req, res, next) {
  const burgerID = req.params.id;
  const burgerDb = await db.Burger.findOne({ where: { id: burgerID } });
  if (burgerDb) {
    res.json(burgerDb);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
// POST
router.post('/',[checkTokenMiddleware,isAdminUser,upload.single('burgerImage')],async function(req, res, next) {
    const file = req.file;

    let image = null;
    if (file) {
      image = 'http://localhost:7000/images/' + file.filename;
    }

    console.log(file)
    const burger = req.body;



        await db.Burger.create({
            title: burger.title,
            description: burger.description,
            price: burger.price,
            image: image,
          }).then((result) => res.json(result));
});
// PUT
router.put(
  "/:id",
  [checkTokenMiddleware, isAdminUser],
  async function (req, res, next) {
    const burgerID = req.params.id;
    const burger = req.body;
    const burgerDb = await db.Burger.findOne({ where: { id: burgerID } });
    if (burgerDb) {
      burgerDb.title = burger.title;
      burgerDb.description = burger.description;
      burgerDb.price = burger.price;
      burgerDb.image = burger.image;

      await burgerDb.save();
      res.json(burgerDb);
    } else {
      res.status(404).json({ message: "Error. Incorrect Burger Id" });
    }
  }
);
router.delete(
  "/:id",
  [checkTokenMiddleware, isAdminUser],
  async function (req, res, next) {
    const burgerID = req.params.id;
    const burgerDb = await db.Burger.findOne({ where: { id: burgerID } });
    if (burgerDb) {
      await burgerDb.destroy();
      const fileurl = burgerDb.image;
      if (fileurl) {
        var index = fileurl.lastIndexOf("/");
        var fileName = fileurl.substr(index);
        fs.unlink('./public/images/' + fileName, (err) => {
          if (err) throw err;
          console.log('successfully deleted ./public/images/' + fileName);
        });
      }
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Error. Incorrect Burger Id" });
    }
  }
);

module.exports = router;
