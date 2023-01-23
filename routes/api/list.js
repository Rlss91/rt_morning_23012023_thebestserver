const express = require("express");
const router = express.Router();

let db = [1, 2, 3, 4, 5];

router.get("/", (req, res) => {
  res.json(db);
});

router.get("/getnumber", (req, res) => {
  try {
    console.log(req.query);
    let index = +req.query.index;
    if (isNaN(index)) {
      throw "please provide a number";
    }
    if (index < 0) {
      throw "please provide number > 0";
    }
    if (index >= db.length) {
      throw "please provide number < " + (db.length - 1);
    }
    res.json({ number: db[index] });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
