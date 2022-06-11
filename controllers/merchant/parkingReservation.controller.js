const {
  ParkingReservation,
  ParkingLot,
  ParkingSlot,
  Block,
  Vehicle,
  TimeFrame,
} = require("../../models");

const getById = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const parkingReservation = await ParkingReservation.findByPk(idParkingReservation, {
      include: [
        {
          model: ParkingSlot,
          attributes: ["slotNumber"],
          include: {
            model: Block,
            attributes: ["blockCode"],
            include: { model: ParkingLot, attributes: ["name", "address"] },
          },
        },
        { model: Vehicle, attributes: ["name", "number"] },
        { model: TimeFrame, attributes: ["duration", "cost"] },
      ],
    });

    if (parkingReservation) {
      return res.send({
        message: "Successfully!!",
        data: parkingReservation,
      });
    } else {
      return res.send({
        message: "You have not booked in advance",
        data: "",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getByParkingLot = async (req, res) => {
  try {
    const { idParkingLot } = req.params;
    const slots = await ParkingSlot.findAll({
      include: [{ model: Block, where: { idParkingLot: idParkingLot } }],
      attributes: ["idParkingSlot"],
    });
    const idSlotArr = slots.map(slot => slot.idParkingSlot);
    const reservations = await ParkingReservation.findAll({
      where: {
        idParkingSlot: idSlotArr,
      },
      include: [
        {
          model: ParkingSlot,
          include: [{ model: Block, include: { model: ParkingLot } }],
        },
        { model: Vehicle },
        { model: TimeFrame },
      ],
    });

    res.status(200).send({
      message: "Successfully",
      data: reservations,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const update = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const updatedData = await ParkingReservation.update(req.body, {
      where: {
        idParkingReservation: idParkingReservation,
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
const getAll = async (req, res) => {
  try {
    const reservations = await ParkingReservation.findAll();
    res.status(200).send({
      message: "Successfully",
      data: reservations,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { getByParkingLot, getById, update, getAll };
