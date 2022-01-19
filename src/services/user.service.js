const { User } = require('../models');

// Retrieve all Users from the database.
const getAll = async () => {
    return await User.findAll();
};

module.exports = { getAll };