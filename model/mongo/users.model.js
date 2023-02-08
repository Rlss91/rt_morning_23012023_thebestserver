const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  isSuperUser: { type: Boolean, default: false },
  accountSecurity: {
    failedAttempts: { type: Number, default: 0 },
    accountBlocked: { type: Boolean, default: false },
    lastLoginAttempt: { type: Date, default: Date.now },
  },
});

/*
    create new collection and connect it to schema
*/
const Users = mongoose.model("users", usersSchema);

const createNewUser = (userData) => {
  const newUser = new Users(userData);
  return newUser.save();
};

const findUserByEmail = (email) => {
  return Users.findOne({ email });
  /*
    {email:email} ==es6==> {email}
  */
};

const blockAccount = (_id) => {
  return Users.findByIdAndUpdate(_id, {
    "accountSecurity.accountBlocked": true,
    "accountSecurity.failedAttempts": 0,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

const setFailedAttempt = (_id, num) => {
  return Users.findByIdAndUpdate(_id, {
    "accountSecurity.failedAttempts": num,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

module.exports = {
  createNewUser,
  findUserByEmail,
  blockAccount,
  setFailedAttempt,
};
