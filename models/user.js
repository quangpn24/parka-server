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
			displayname: {
				type: Sequelize.STRING,
				field: "displayname",
				unique: true,
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
		}
	);
	User.associate = (models) => {
		User.hasOne(models.RefreshToken, {
			foreignKey: "idUser",
		});
		User.belongsTo(models.Role, {
			foreignKey: "idRole",
		});
	};
	return User;
};
