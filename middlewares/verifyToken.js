const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
};
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.id = decoded.id;
      next();
    });
  } else {
    res.status(401).json(`You're not authentication`);
  }
};
module.exports = verifyToken;
