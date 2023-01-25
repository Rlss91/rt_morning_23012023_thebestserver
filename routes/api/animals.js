const express = require("express");
const router = express.Router();

let animalsArr = ["rexy", "messi", "ronaldo", "flipper", "ibrahimovitch"];

// http://localhost:3000/api/animals/find?name=rexy
router.get("/find", (req, res) => {
  try {
    if (!req.query.name) {
      throw "please define name";
    }
    let regexp = new RegExp(req.query.name, "ig");
    for (let animalName of animalsArr) {
      if (regexp.test(animalName)) {
        res.json({ msg: true });
        return;
      }
    }
    res.json({ msg: false });
  } catch (err) {
    res.json({ err });
  }
});
// // http://localhost:3000/api/find?name=rexy
// router.get("/find", (req, res) => {
//   try {
//     if (!req.query.name) {
//       throw "please define name";
//     }
//     for (let animalName of animalsArr) {
//       if (animalName === req.query.name.toLowerCase()) {
//         res.json({ msg: true });
//         return;
//       }
//     }
//     res.json({ msg: false });
//   } catch (err) {
//     res.json({ err });
//   }
// });

module.exports = router;
