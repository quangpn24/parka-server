const {User} = require('../models');

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.body.idUser);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name == 'admin'){
            next();
            return;
        }
    } 
    res.status(403).send({
        message: "Require Admin Role!"
      });
    return;
}

const isOwner = async (req, res, next) => {
    const user = await User.findByPk(req.body.idUser);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name == 'owner'){
            next();
            return;
        }
    } 
    res.status(403).send({
        message: "Require Owner Role!"
      });
    return;
}

const isCustomer = async (req, res, next) => {
    const user = await User.findByPk(req.body.idUser);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name == 'customer'){
            next();
            return;
        }
    } 
    res.status(403).send({
        message: "Require Customer Role!"
      });
    return;
}
const isEmployee = async (req, res, next) => {
    const user = await User.findByPk(req.body.idUser);
    const roles = await user.getRoles();
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name == 'employee'){
            next();
            return;
        }
    } 
    res.status(403).send({
        message: "Require Employee Role!"
      });
    return;
}

module.exports = {isAdmin, isCustomer, isEmployee, isOwner};