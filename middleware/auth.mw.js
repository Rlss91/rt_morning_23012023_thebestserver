const jwt = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    const payload = await jwt.verifyToken(req.headers["token"]);
    console.log(payload);
    req.userData = payload.id; // pass data to chain
    next(); // run the next part of the chain
  } catch (err) {
    res.status(401).json(err);
  }
};
