const {User} = require('../models');

const getAllUser = async(req, res)=> {
   try {
        const users = User.findAll();
        res.status(200).json(users);
   } catch (error) {
        res.status(500).json(error);
   }
}

module.exports = {getAllUser};