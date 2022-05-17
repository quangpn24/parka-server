const { User } = require("../../models");
const { hashPassword } = require("../../utils/hashPassword");

const checkDuplicatePhoneNumber = async (req, res) => {
  try {
    console.log(req.body.phoneNumber);
    const user = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });
    if (user) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a User
    const user = {
      password: hashPassword(req.body.password),
      displayname: req.body.name,
      phoneNumber: req.body.phonenumber,
      email: req.body.email,
    };
    // Save User in the database
    const newUser = await User.create(user);
    res.status(200).send({ data: newUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(1);
    res.status(500).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const user = await User.findByPk(idUser);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllUser, create, checkDuplicatePhoneNumber, getById };
