const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../../models");
const authConfig = require("../../configs/auth.config");
const config = require("../../configs/auth.config");
const { hashPassword } = require("../../utils/hashPassword");

const register = async (req, res) => {
  try {
    const newUser = {
      password: hashPassword(req.body.password),
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      displayName: req.body.displayName,
    };

    const user = await User.create(newUser);
    res.status(200).json(user);
  } catch (err) {
    res.json({ message: "Error: " + err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const newPassword = hashPassword(req.body.newPassword);
    const phoneNumber = req.body.phoneNumber;
    console.log(phoneNumber);
    const num = await User.update(
      { password: newPassword },
      { where: { phoneNumber: phoneNumber } },
    );
    console.log(num);
    if (num == 1) res.send({ status: true });
    else res.send({ status: false });
  } catch (err) {
    res.json({ message: "Error: " + err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        phoneNumber: req.body.username,
      },
    });
    if (!user) {
      res.send({ message: "User not found" });
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      res.send({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id: user.idUser,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: config.jwtExpiration },
    );
    const { password, ...others } = user.dataValues;
    let refreshToken = await RefreshToken.createToken(user.dataValues);
    res.status(200).json({ data: { ...others }, accessToken, refreshToken });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const loginWithOAuth = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        idSocial: req.body.idsocial,
      },
    });

    if (!user) {
      const newUser = {
        displayName: req.body.displayname,
        password: "",
        email: req.body.email,
        phoneNumber: "",
        idSocial: req.body.idsocial,
      };

      user = await User.create(newUser);
    }

    const accessToken = jwt.sign(
      {
        id: user.idUser,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: config.jwtExpiration },
    );

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: authConfig.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = { register, login, refreshToken, loginWithOAuth, resetPassword };
