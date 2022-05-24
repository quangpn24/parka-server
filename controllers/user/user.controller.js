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
      displayName: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      imageUrl: `https://ui-avatars.com/api/?background=random&color=random&font-size=0.33&name=${req.body.name}`,
    };

    // Save User in the database
    const newUser = await User.create(user);
    return res.status(200).send({ data: newUser });
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

const update = async (req, res) => {
  try {
    const { idUser } = req.params;
    const updatedData = await User.update(req.body, {
      where: {
        idUser: idUser,
      },
      returning: true,
    });

    res.status(200).send({
      message: "Successfully",
      data: updatedData[1][0],
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
  }
};
module.exports = { getAllUser, create, checkDuplicatePhoneNumber, getById, update };
