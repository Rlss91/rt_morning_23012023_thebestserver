const jwt = require("jsonwebtoken");

const generateToken = (payload, exp = "30d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "f34pq2ok0g923jy-0439kt-w0roigkewr-0gk",
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
    jwt.verify(
      token,
      "f34pq2ok0g923jy-0439kt-w0roigkewr-0gk",
      (err, payload) => {
        if (err) reject(err);
        else resolve(payload);
      }
    );
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
