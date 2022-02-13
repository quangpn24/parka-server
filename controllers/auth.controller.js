const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../configs/auth.config');

const register = async (req, res) => {
	try {
		const newUser = {
			username: req.body.username,
			password: hashPassword(req.body.password),
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
		};

		const user = await User.create(newUser);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

const login = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!user) {
			res.status(404).json('User not found');
		}

		const validPassword = bcrypt.compareSync(req.body.password, user.password);
		if (!validPassword) {
			res.status(404).json('Invalid password');
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
				password: '',
				email: req.body.email,
				phoneNumber: '',
				idSocial: req.body.idsocial,
			};

			user = await User.create(newUser);
		}

		const accessToken = jwt.sign(
			{
				id: user.idUser,
			},
			process.env.JWT_ACCESS_KEY,
			{ expiresIn: config.jwtExpiration }
		);

		res.status(200).json({ user, accessToken });
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = { register, login, loginWithOAuth };
