module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      idUser: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "iduser",
      },
      idSocial: {
        type: Sequelize.STRING,
        field: "idsocial",
      },
      displayName: {
        type: Sequelize.STRING,
        field: "displayname",
      },
      imageUrl: {
        type: Sequelize.STRING,
        field: "imageurl",
        defaultValue:
          "https://ui-avatars.com/api/?background=random&color=random&font-size=0.33&name=user",
      },
      password: {
        type: Sequelize.STRING,
        field: "password",
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        field: "phonenumber",
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
  User.associate = models => {
    User.hasOne(models.RefreshToken, {
      foreignKey: "idUser",
    });
  };
  return User;
};
