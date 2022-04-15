module.exports = (sequelize, Sequelize) => {
  const TimeFrame = sequelize.define(
    "TimeFrame",
    {
      idTimeFrame: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idtimeframe",
      },
      idParkingLot: {
        type: Sequelize.UUID,
        field: "idparkinglot",
      },
      duration: {
        type: Sequelize.INTEGER,
        field: "duration",
      },
      cost: {
        type: Sequelize.BIGINT,
        field: "cost",
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    },
  );
  TimeFrame.associate = models => {
    // TimeFrame.hasOne(models.RefreshToken, {
    // 	foreignKey: 'idTimeFrame',
    // });
    // TimeFrame.belongsTo(models.Role, {
    // 	foreignKey: 'idRole',
    // });
  };
  return TimeFrame;
};
