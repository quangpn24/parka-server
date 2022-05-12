module.exports = (sequelize, Sequelize) => {
  const ParkingSlot = sequelize.define(
    "ParkingSlot",
    {
      idParkingSlot: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idparkingslot",
      },
      slotNumber: {
        type: Sequelize.STRING,
        field: "slotnumber",
      },
      description: {
        type: Sequelize.STRING,
        field: "description",
      },
      idBlock: {
        type: Sequelize.UUID,
        field: "idblock",
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    },
  );
  ParkingSlot.associate = models => {
    ParkingSlot.belongsTo(models.Block, {
      foreignKey: "idBlock",
    });
  };
  return ParkingSlot;
};
