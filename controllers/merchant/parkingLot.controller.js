const { ParkingLot, TimeFrame } = require("../../models");
const Sequelize = require("sequelize");

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
      lat: req.body.lat,
      long: req.body.long,
      idCompany: req.body.idCompany,
    };

    // Save
    const newParkingLot = await ParkingLot.create(parkingLot);
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
    const { id } = req.params;
    const parkingLot = await ParkingLot.findAll({ where: { idCompany: id } });
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
    const { id } = req.params;
    const parkingLot = await ParkingLot.findByPk(id);
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

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await ParkingLot.update(req.body, {
      where: {
        idParkingLot: id,
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
    return;
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ParkingLot.update(
      { isDeleted: true },
      {
        where: {
          idParkingLot: id,
        },
        returning: true,
      },
    );
    res.status(200).send({
      message: "Successfully",
      data: deleted[1][0],
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const checkNameDuplicate = async (req, res) => {
  try {
    const { name } = req.body;

    const num = await ParkingLot.count({ where: { name: name } });
    res.status(200).send({
      message: num > 0 ? "exist" : "not exist",
      data: num > 0,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { create, update, getAll, getById, deleteOne, checkNameDuplicate };
