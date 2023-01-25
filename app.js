const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const apiRouter = require("./routes/api");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// http://localhost:3000/api/....
app.use("/api", apiRouter);

// //GET http://localhost:3000/
// app.get("/", (req, res) => {
//   let msg = {
//     msg: "success 2",
//   };
//   res.json(msg);
// });

// app.post("/", (req, res) => {
//   res.json({ status: "ok" });
// });

// //GET http://localhost:3000/list
// app.get("/list", (req, res) => {
//   res.json({ msg: "you in list route" });
// });
// //GET http://localhost:3000/list
// app.get("/list/get", (req, res) => {
//   res.json({ msg: "you in list route" });
// });
// app.get("/list/post", (req, res) => {
//   res.json({ msg: "you in list route" });
// });

module.exports = app;
