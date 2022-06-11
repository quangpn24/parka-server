module.exports = (sequelize, Sequelize) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      idFavorite: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: "idfavorite",
      },
      // idUser: {
      //   type: Sequelize.UUID,
      //   field: "iduser",
      // },
      // idParkingLot: {
      //   type: Sequelize.UUID,
      //   field: "idparkinglot",
      // },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    },
  );
  return Favorite;
};
