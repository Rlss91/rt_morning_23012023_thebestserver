const express = require("express");
const router = express.Router();
const listRouter = require("./api/list");

// sub route
// http://localhost:3000/api/
router.get("/", (req, res) => {
  res.json({ msg: "msg from router" });
});

// http://localhost:3000/api/list
router.use("/list", listRouter);

module.exports = router; //exports only router without need of object
