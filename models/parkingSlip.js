module.exports = (sequelize, Sequelize) => {
  const ParkingSlip = sequelize.define(
    "ParkingSlip",
    {
      idParkingSlip: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idparkingslip",
      },
      idParkingReservation: {
        type: Sequelize.UUID,
        field: "idparkingreservation",
      },
      idUser: {
        type: Sequelize.UUID,
        field: "iduser",
      },
      entryTime: {
        type: Sequelize.TIME,
        field: "entrytime",
      },
      exitTime: {
        type: Sequelize.TIME,
        field: "exittime",
      },
      total: {
        type: Sequelize.BIGINT,
        field: "total",
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        field: "ispaid",
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: true,

      updatedAt: true,
    },
  );
  ParkingSlip.associate = models => {
    ParkingSlip.belongsTo(models.ParkingReservation, {
      foreignKey: "idParkingReservation",
    });
  };
  return ParkingSlip;
};
