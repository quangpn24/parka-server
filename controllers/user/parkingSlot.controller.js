const sequelize = require("sequelize");
const { Block, ParkingReservation, ParkingSlot, ParkingLot, TimeFrame } = require("../../models");

const numOfSlotIsUse = async (req, res) => {
  try {
    const { idParkingLot } = req.body;
    const num = await ParkingReservation.count({
      include: [
        {
          model: ParkingSlot,
          include: [
            {
              model: Block,
              where: {
                idParkingLot: idParkingLot,
              },
            },
          ],
        },
      ],
    });
    return res.send({
      message: "num of slot ",
      data: { num },
    });
  } catch (error) {
    res.status(500).send({
      message: error,
      data: "",
    });
  }
};

const numOfSlotOfParkingLot = async (req, res) => {
  try {
    const { idParkingLot } = req.body;
    const num = await TimeFrame.findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("numOfSlot")), "total"]],
      raw: true,
      where: {
        idParkingLot: idParkingLot,
      },
    });

    return res.send({
      message: "total slot",
      data: num,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
      data: "",
    });
  }
};

const getSlots = async (req, res) => {
  try {
    const { idParkingLot } = req.params;
    const blocks = await Block.findAll({ where: { idParkingLot: idParkingLot } });
    const idBlockArr = blocks.map(block => block.idBlock);
    const slots = await ParkingSlot.findAll({
      where: {
        idBlock: idBlockArr,
      },
    });
    res.send({
      message: "Successful",
      data: { blocks: blocks, slots: slots },
    });
  } catch (error) {
    res.status(500).send({
      message: error || "error",
      data: "",
    });
  }
};

module.exports = { numOfSlotIsUse, numOfSlotOfParkingLot, getSlots };
