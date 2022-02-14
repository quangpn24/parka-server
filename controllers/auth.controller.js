const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../models");
const config = require("../configs/auth.config");
const authConfig = require("../configs/auth.config");

const login = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			res.status(404).json("User not found");
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
			{ expiresIn: config.jwtExpiration }
		);
		const { password, ...others } = user.dataValues;
		let refreshToken = await RefreshToken.createToken(user.dataValues);
		res.status(200).json({ ...others, accessToken, refreshToken });
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
		let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

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

module.exports = { login, refreshToken };
