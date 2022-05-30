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

    res.status(200).send({
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

module.exports = { getTimeFrameByIdLot };
