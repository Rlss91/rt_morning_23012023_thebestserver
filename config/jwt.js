const jwt = require("jsonwebtoken");

const generateToken = (payload, exp = "30d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWTSECRETKEY,
      { expiresIn: exp },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRETKEY, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
