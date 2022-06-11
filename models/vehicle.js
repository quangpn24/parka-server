module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      idVehicle: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idvehicle",
      },
      idUser: {
        type: Sequelize.UUID,
        field: "iduser",
      },
      name: {
        type: Sequelize.STRING,
        field: "name",
      },
      number: {
        type: Sequelize.STRING,
        field: "number",
      },
      type: {
        type: Sequelize.STRING,
        field: "type",
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        field: "isactivated",
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    },
  );
  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User, {
      foreignKey: "idUser",
    });
  };
  return Vehicle;
};
