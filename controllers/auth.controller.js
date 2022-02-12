const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../configs/auth.config");

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
			res.status(404).json("Invalid password");
		}

		const accessToken = jwt.sign(
			{
				id: user.idUser,
			},
			process.env.JWT_ACCESS_KEY,
			{ expiresIn: config.jwtExpiration }
		);
		const { password, ...others } = user;
		res.status(200).json({ others, accessToken });
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = { login };
