const { UserService } = require('../services');
const getAll = async (req, res) => {

    try {
        const users = await UserService.getAll;
        res.status(200).json({
            users: users,
        });
    } catch (error) {
        res.status(400);
    }
}

module.exports = { getAll }