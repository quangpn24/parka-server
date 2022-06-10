const { Favorite, ParkingLot, User } = require("../../models");

const create = async (req, res) => {
  try {
    const { idParkingLot, idUser } = req.body;
    const favorite = await Favorite.create({
      idParkingLot: idParkingLot,
      idUser: idUser,
    });
    console.log({ favorite });
    res.status(200).send({
      message: "Successfully",
      data: favorite,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getByUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findAll({
      where: {
        idUser: idUser,
      },
      include: [{ model: ParkingLot }],
      attributes: [],
    });
    res.status(200).send({
      message: "Successfully",
      data: user,
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
    const { idParkingLot } = req.params;
    await Favorite.destroy({
      where: {
        idParkingLot: idParkingLot,
      },
    });

    res.status(200).send({
      message: "Successfully",
      data: idParkingLot,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { create, getByUser, deleteOne };
