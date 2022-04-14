module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define(
    "Company",
    {
      idCompany: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idcompany",
      },
      companyName: {
        type: Sequelize.STRING,
        field: "companyName",
      },
      phoneNumber: {
        type: Sequelize.STRING,
        field: "phonenumber",
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        field: "password",
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
    }
  );
  Company.associate = (models) => {
    Company.hasMany(models.ParkingLot, {
      foreignKey: "idParkingLot",
    });
  };
  return Company;
};
