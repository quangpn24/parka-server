const { ParkingLot, TimeFrame } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const searchAdress = async (req, res) => {
  try {
    const { searchText } = req.body;
    console.log(req.body);
    // console.log(searchText);
    const parkingLots = await ParkingLot.findAll({
      limit: 10,
      where: { name: { [Op.iLike]: "%" + searchText + "%" } },
    });
    if (!parkingLots) {
      res.status(400).send({
        message: "Not found!",
        data: "",
      });
    }
    res.status(200).send({
      message: "Successfully!",
      data: parkingLots,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
      data: "",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const parkingLots = await ParkingLot.findAll();
    res.status(200).send({
      message: "Successfully",
      data: parkingLots,
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
    console.log(idParkingLot);
    const parkingLot = await ParkingLot.findAll({
      where: { idParkingLot },
      include: [{ model: TimeFrame }],
    });
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

module.exports = { searchAdress, getAll, getById };
