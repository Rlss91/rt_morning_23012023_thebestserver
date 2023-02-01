const express = require("express");
const router = express.Router();

const usersModel = require("../../model/users.model");
const authValidation = require("../../validation/auth.validation");
const ResponseError = require("../../module/ResponseError");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");

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
    validatedValue.password = await bcrypt.createHash(validatedValue.password);
    await usersModel.createNewUser(validatedValue);
    res.json({ msg: "success" });
    // console.log(userData);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validatedValue = await authValidation.validateLoginSchema(req.body);
    const userData = await usersModel.findUserByEmail(validatedValue.email);
    if (!userData) {
      throw new ResponseError("db", ["invalid email and or password"]);
    }
    const isPasswordCorrect = await bcrypt.cmpHash(
      validatedValue.password,
      userData.password
    );
    if (!isPasswordCorrect) {
      userData.accountSecurity.failedAttempts++; // add failed attempt
      //if last then 15 min
      if (
        Date.now() - userData.accountSecurity.lastLoginAttempt.getTime() <
        900000
      ) {
        //if more then 3 attempts
        if (userData.accountSecurity.failedAttempts > 3) {
          //block account
          await usersModel.blockAccount(userData._id);
        } else {
          // store the failed attempts times
          await usersModel.setFailedAttempt(
            userData._id,
            userData.accountSecurity.failedAttempts
          );
        }
      } else {
        // did not failed for more then 15 min, reset the attempt counter
        await usersModel.setFailedAttempt(userData._id, 1);
      }
      throw new ResponseError("db", ["invalid email and or password"]);
    }
    const token = await jwt.generateToken({ id: userData._id });
    res.json({ msg: "success", token });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router; //exports only router without need of object
