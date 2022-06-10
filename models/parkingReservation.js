module.exports = (sequelize, Sequelize) => {
  const ParkingReservation = sequelize.define(
    "ParkingReservation",
    {
      idParkingReservation: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idparkingreservation",
      },
      idVehicle: {
        type: Sequelize.UUID,
        field: "idvehicle",
      },
      idUser: {
        type: Sequelize.UUID,
        field: "iduser",
      },
      idParkingSlot: {
        type: Sequelize.UUID,
        field: "idparkingslot",
      },
      idTimeFrame: {
        type: Sequelize.UUID,
        field: "idtimeframe",
      },
      startTime: {
        type: Sequelize.TIME,
        field: "starttime",
      },
      endTime: {
        type: Sequelize.TIME,
        field: "endtime",
      },
      bookingDate: {
        type: Sequelize.DATE,
        field: "bookingdate",
      },
      total: {
        type: Sequelize.BIGINT,
        field: "total",
      },
      status: {
        type: Sequelize.ENUM("scheduled", "ongoing", "end"),
        defaultValue: "scheduled",
        field: "status",
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: true,

      updatedAt: true,
    },
  );
  ParkingReservation.associate = models => {
    ParkingReservation.belongsTo(models.ParkingSlot, {
      foreignKey: "idParkingSlot",
    });
    ParkingReservation.belongsTo(models.Vehicle, {
      foreignKey: "idVehicle",
    });
    ParkingReservation.belongsTo(models.User, {
      foreignKey: "idUser",
    });
    ParkingReservation.belongsTo(models.TimeFrame, {
      foreignKey: "idTimeFrame",
    });
    ParkingReservation.hasOne(models.ParkingSlip, {
      foreignKey: "idParkingReservation",
    });
  };
  return ParkingReservation;
};
