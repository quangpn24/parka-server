const { User, Role } = require("../models");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
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

  const userFindByEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userFindByEmail) {
    res.status(400).json("Failed! Email is already in use!");
    return;
  }
  next();
};

module.exports = { checkDuplicateUsernameOrEmail };
