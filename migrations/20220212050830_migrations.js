const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Role", deps: []
 * createTable() => "User", deps: [Role]
 * createTable() => "RefreshTokens", deps: [User]
 *
 */

const info = {
  revision: 1,
  name: "migrations",
  created: "2022-02-12T05:08:30.208Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Role",
      {
        idRole: {
          type: Sequelize.UUID,
          field: "idrole",
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        name: { type: Sequelize.STRING, field: "name" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "User",
      {
        idUser: {
          type: Sequelize.UUID,
          field: "iduser",
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        displayname: {
          type: Sequelize.STRING,
          unique: true,
          field: "displayname",
        },
        password: { type: Sequelize.STRING, field: "password" },
        email: { type: Sequelize.STRING, field: "email" },
        phoneNumber: { type: Sequelize.STRING, field: "phonenumber" },
        isActivated: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          field: "isactivated",
        },
        idRole: {
          type: Sequelize.UUID,
          field: "idRole",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Role", key: "idrole" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "RefreshTokens",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        token: { type: Sequelize.STRING, field: "token" },
        expiryDate: { type: Sequelize.DATE, field: "expiryDate" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        idUser: {
          type: Sequelize.UUID,
          field: "idUser",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "User", key: "iduser" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["RefreshTokens", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Role", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["User", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
