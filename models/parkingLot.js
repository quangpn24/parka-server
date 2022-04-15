module.exports = (sequelize, Sequelize) => {
  const ParkingLot = sequelize.define(
    "ParkingLot",
    {
      idParkingLot: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idparkinglot",
      },
      name: {
        type: Sequelize.STRING,
        field: "name",
      },
      description: {
        type: Sequelize.STRING,
        field: "description",
      },
      address: {
        type: Sequelize.STRING,
        field: "address",
      },
      lat: {
        type: Sequelize.STRING,
        field: "lat",
      },
      long: {
        type: Sequelize.STRING,
        field: "long",
      },
      idCompany: {
        type: Sequelize.UUID,
        field: "idcompany",
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: "isdeleted",
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
  ParkingLot.associate = models => {
    ParkingLot.hasMany(models.Block, {
      foreignKey: "idParkingLot",
    });
    ParkingLot.belongsTo(models.Company, {
      foreignKey: "idCompany",
    });
  };
  return ParkingLot;
};
