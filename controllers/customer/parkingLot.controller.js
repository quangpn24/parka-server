const { ParkingLot } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const searchAdress = async (req, res) => {
  try {
    const { searchText } = req.body;
    console.log(req.body);
    // console.log(searchText);
    const parkingLots = await ParkingLot.findAll({
      limit: 10,
      attributes: ["idParkingLot", "name", "address", "lat", "long"],
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
module.exports = { searchAdress };
