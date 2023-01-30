const express = require("express");
const router = express.Router();

const usersModel = require("../../model/users.model");
const authValidation = require("../../validation/auth.validation");
const ResponseError = require("../../module/ResponseError");

router.post("/register", async (req, res) => {
  try {
    const validatedValue = await authValidation.validateRegisterSchema(
      req.body
    );
    const userData = await usersModel.findUserByEmail(validatedValue.email);
    if (userData) {
      //   throw {
      //     origin: "db",
      //     details: ["email already exists"],
      //   };
      throw new ResponseError("db", ["email already exists"]);
    }
    await usersModel.createNewUser(validatedValue);
    res.json({ msg: "success" });
    // console.log(userData);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router; //exports only router without need of object
