module.exports = (sequelize, Sequelize) => {
  const Block = sequelize.define(
    "Block",
    {
      idBlock: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idblock",
      },
      idParkingLot: {
        type: Sequelize.UUID,
        field: "idparkinglot",
      },
      blockCode: {
        type: Sequelize.STRING,
        field: "blockcode",
      },
      description: {
        type: Sequelize.STRING,
        field: "description",
      },
      isFull: {
        type: Sequelize.BOOLEAN,
        field: "isfull",
        defaultValue: false,
      },
      numOfSlot: {
        type: Sequelize.INTEGER,
        field: "numofslot",
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    },
  );
  Block.associate = models => {
    Block.belongsTo(models.ParkingLot, {
      foreignKey: "idParkingLot",
    });
    Block.hasMany(models.ParkingSlot, {
      foreignKey: "idBlock",
    });
  };
  return Block;
};
