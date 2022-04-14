const { ParkingLot } = require("../models");

const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
        data: "",
      });
      return;
    }

    // Create a ParkingLot
    const parkingLot = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      idCompany: req.body.idCompany,
    };

    // Save
    const newParkingLot = await User.create(parkingLot);
    res.status(200).send({
      message: "Successfully",
      data: newParkingLot,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getAll = async (req, res) => {
  try {
    const parkingLot = await ParkingLot.findAll();
    res.status(200).send({
      message: "Successfully",
      data: parkingLot,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getById = async (req, res) => {
  try {
    const { idParkingLot } = req.params;
    const parkingLot = await ParkingLot.findByPk(idParkingLot);
    res.status(200).send({
      message: "Successfully",
      data: parkingLot,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { create, getAll, getById };
