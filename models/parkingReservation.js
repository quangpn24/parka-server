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
      startTime: {
        type: Sequelize.TIME,
        field: "starttime",
      },
      bookingDate: {
        type: Sequelize.DATE,
        field: "bookingdate",
      },
      duration: {
        type: Sequelize.INTEGER,
        field: "duration",
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
    ParkingReservation.hasOne(models.ParkingSlip, {
      foreignKey: "idParkingReservation",
    });
  };
  return ParkingReservation;
};
