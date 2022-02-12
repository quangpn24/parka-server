const { User } = require("../models");
const { hashPassword } = require("../utils/hashPassword");

const checkDuplicateEmail = async (req, res) => {
	try {
		const userFindByEmail = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (userFindByEmail) {
			res.status(400).send(true);
		} else {
			res.status(200).send(false);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

const create = async (req, res) => {
	try {
		// Validate request
		if (!req.body) {
			res.status(400).send({
				message: "Content can not be empty!",
			});
			return;
		}

		// Create a User
		const user = {
			password: hashPassword(req.body.password),
			displayname: req.body.displayname,
			phoneNumber: req.body.phoneNumber,
			email: req.body.email,
			// idRole: req.body.idRole,
		};
		// Save User in the database
		const newUser = await User.create(user);
		res.status(200).send(newUser);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllUser = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		console.log(1);
		res.status(500).json(error);
	}
};

module.exports = { getAllUser, create, checkDuplicateEmail };
