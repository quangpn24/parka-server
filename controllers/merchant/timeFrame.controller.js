const { TimeFrame } = require("../../models");

const getTimeFrameByIdLot = async (req, res) => {
  try {
    const { idParkingLot } = req.params;

    const result = await TimeFrame.findAll({
      where: {
        idParkingLot: idParkingLot,
      },
      order: [["duration", "ASC"]],
    });

    return res.status(200).send({
      message: "Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const create = async (req, res) => {
  try {
    const timeFrames = req.body;
    const newTimeFrames = await TimeFrame.bulkCreate(timeFrames);

    return res.status(200).send({
      message: "Successfully",
      data: newTimeFrames,
    });
  } catch (error) {
    return res.status(400).send({
      message: error,
      data: "",
    });
  }
};

const update = async (req, res) => {
  try {
    const { idParkingLot } = req.params;
    const isDeleted = await TimeFrame.destroy({ where: { idParkingLot } });
    if (isDeleted) {
      create(req, res);
    }
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
  }
};
module.exports = { getTimeFrameByIdLot, create, update };
