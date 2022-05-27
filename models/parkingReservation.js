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
        field: "idUser",
      },
      idParkingSlot: {
        type: Sequelize.UUID,
        field: "idparkingslot",
      },
      startTime: {
        type: Sequelize.DATE,
        field: "startTime",
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

      createdAt: false,

      updatedAt: false,
    },
  );
  ParkingReservation.associate = models => {
    ParkingReservation.hasMany(models.ParkingSlip, {
      foreignKey: "idParkingReservation",
    });
    // ParkingReservation.belongsTo(models.Vehicle, {
    //   foreignKey: "idVehicle",
    // });
    ParkingReservation.belongsTo(models.ParkingSlot, {
      foreignKey: "idParkingSlot",
    });
  };
  return ParkingReservation;
};
