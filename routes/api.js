const express = require("express");
const router = express.Router();
const listRouter = require("./api/list");
const animalsRouter = require("./api/animals");

// sub route
// http://localhost:3000/api/
router.get("/", (req, res) => {
  res.json({ msg: "msg from router" });
});

// http://localhost:3000/api/list
router.use("/list", listRouter);

// http://localhost:3000/api/animals
router.use("/animals", animalsRouter);

module.exports = router; //exports only router without need of object
