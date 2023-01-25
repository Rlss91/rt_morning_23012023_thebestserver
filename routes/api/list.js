const express = require("express");
const axios = require("axios");

const router = express.Router();

let db = [1, 2, 3, 4, 5];
let usersArr = [
  { name: "kenny", age: 8, gender: "m" },
  { name: "john", age: 40, gender: "m" },
  { name: "james", age: 40, gender: "m" },
  { name: "merry", age: 30, gender: "f" },
  { name: "naomi", age: 35, gender: "f" },
];

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

router.get("/biggerthen/:age", (req, res) => {
  res.json(usersArr.filter((user) => user.age > +req.params.age));
});

router.get("/gender/:gender", (req, res) => {
  console.log(req.params.gender, req.query.age);
  res.json(
    usersArr.filter(
      (user) => user.gender === req.params.gender && +req.query.age < user.age
    )
  );
});

router.post("/newuser", (req, res) => {
  usersArr = [...usersArr, req.body];
  res.json(usersArr);
});

router.get("/getcharacters", async (req, res) => {
  try {
    let response = await axios.get("https://rickandmortyapi.com/api/character");
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
