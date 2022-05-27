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
      entryTime: {
        type: Sequelize.DATE,
        field: "entrytime",
      },
      exitTime: {
        type: Sequelize.DATE,
        field: "exittime",
      },
      cost: {
        type: Sequelize.BIGINT,
        field: "cost",
      },
      penalty: {
        type: Sequelize.BIGINT,
        field: "penalty",
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

      createdAt: false,

      updatedAt: false,
    },
  );
  ParkingSlip.associate = models => {
    ParkingSlip.belongsTo(models.ParkingReservation, {
      foreignKey: "idParkingReservation",
    });
  };
  return ParkingSlip;
};
