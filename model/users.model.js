const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  isSuperUser: { type: Boolean, default: false },
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

module.exports = {
  createNewUser,
  findUserByEmail,
};
