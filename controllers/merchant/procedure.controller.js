const { ParkingReservation, ParkingSlip } = require("../../models");

const checkIn = async (req, res) => {
  try {
    const { idParkingReservation } = req.body;
    const parkingReservation = await ParkingReservation.findByPk(idParkingReservation);
    if (!parkingReservation) {
      return res.send({
        message: "You have not booked in advance",
        data: {
          status: false,
        },
      });
    }

    const newParkingSlip = {
      idParkingReservation,
      idUser: parkingReservation.idUser,
      entryTime: parkingReservation.startTime,
      isPaid: false,
    };
    const parkingSlip = await ParkingSlip.create(newParkingSlip);
    //update status
    const parkingReservationUpdated = await ParkingReservation.update(
      {
        status: "ongoing",
      },
      {
        where: {
          idParkingReservation,
        },
      },
    );
    if (parkingSlip) {
      return res.send({
        message: "Successfully!",
        data: {
          status: true,
        },
      });
    } else {
      return res.send({
        message: "Fail!",
        data: {
          status: false,
        },
      });
    }
  } catch (error) {
    return res.send({
      message: error,
      data: {
        status: false,
      },
    });
  }
};

const checkOut = async (req, res) => {
  try {
    const { idParkingReservation, idParkingSlip } = req.body;

    //update status
    const updatedParkingSlip = {
      exitTime: req.body.exitTime,
      total: req.body.total,
      isPaid: req.body.isPaid,
    };
    const resultUpdateParkingSlip = await ParkingSlip.update(updatedParkingSlip, {
      where: { idParkingSlip },
    });
    const resultUpdateParkingReservation = await ParkingReservation.update(
      { status: "end" },
      { where: { idParkingReservation } },
    );
    if (resultUpdateParkingSlip && resultUpdateParkingReservation) {
      return res.send({
        message: "Successfully!",
        data: {
          status: true,
        },
      });
    } else {
      return res.send({
        message: "Fail!",
        data: {
          status: false,
        },
      });
    }
  } catch (error) {
    return res.send({
      message: error,
      data: {
        status: false,
      },
    });
  }
};

module.exports = { checkIn, checkOut };
