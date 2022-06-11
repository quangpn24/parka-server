const { User, Role } = require("../models");

const checkDuplicatePhoneNumber = async (req, res, next) => {
  // //username
  // const userFindByUsername = await User.findOne({
  // 	where: {
  // 		username: req.body.username,
  // 	},
  // });
  // if (userFindByUsername) {
  // 	res.status(400).json("Failed! Username is already in use!");
  // 	return;
  // }
  //Email

  const userFindByPhone = await User.findOne({
    where: {
      phoneNumber: req.body.phoneNumber,
    },
  });

  if (userFindByPhone) {
    res.status(400).json("Failed! Email is already in use!");
    return;
  }
  next();
};

module.exports = { checkDuplicatePhoneNumber };
