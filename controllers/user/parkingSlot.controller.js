const sequelize = require("sequelize");
const Op = sequelize.Op;
const { Block, ParkingReservation, ParkingSlot, ParkingLot, TimeFrame } = require("../../models");

const getAvailableSlots = async (req, res) => {
  try {
    const { idParkingLot } = req.params;
    const { start, end, date } = req.query;
    const slotUsed = await ParkingSlot.findAll({
      attributes: ["idParkingSlot"],
      include: [
        {
          model: Block,
          where: {
            idParkingLot: idParkingLot,
          },
        },
        {
          model: ParkingReservation,
          where: {
            [Op.or]: [
              { startTime: { [Op.lte]: start }, endTime: { [Op.gte]: start } },
              { [Op.and]: [{ startTime: { [Op.gte]: start } }, { startTime: { [Op.lte]: end } }] },
            ],
            bookingDate: new Date(date),
          },
        },
      ],
    });

    const idParkingSlotUsed = slotUsed.map(e => e.idParkingSlot);

    const availableSlots = await Block.findAll({
      where: {
        idParkingLot: idParkingLot,
      },
      include: [
        {
          model: ParkingSlot,
          where: {
            idParkingSlot: { [Op.notIn]: idParkingSlotUsed },
          },
        },
      ],
    });

    return res.send({
      message: "slots used",
      data: availableSlots,
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
    const { idParkingLot } = req.params;
    const num = await Block.findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("numofslot")), "total"]],
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

module.exports = { getAvailableSlots, numOfSlotOfParkingLot, getSlots };
