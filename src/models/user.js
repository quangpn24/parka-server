module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'User',
        {
            idUser: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                field: 'iduser',
            },
            username: {
                type: Sequelize.STRING,
                field: 'username',
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                field: 'password',
            },
            displayName: {
                type: Sequelize.STRING,
                field: 'displayname',
            },
            email: {
                type: Sequelize.STRING,
                field: 'email',
                validate: {
                    isEmail: true,
                },
            },
            gender: {
                type: Sequelize.INTEGER,
                field: 'gender',
            },
            phoneNumber: {
                type: Sequelize.STRING,
                field: 'phonenumber',
            },
            imageUrl: {
                type: Sequelize.STRING,
                field: 'imageurl',
            },
            email: {
                type: Sequelize.STRING,
                field: 'email',
                validate: {
                    isEmail: true,
                },
            },
            address: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                field: 'address',
            },
            dob: {
                type: Sequelize.DATEONLY,
                field: 'dob',
            },
            idRole: {
                type: Sequelize.UUID,
                field: 'idrole',
            },
            isActivated: {
                type: Sequelize.BOOLEAN,
                field: 'isactivated',
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
    return User;
};