const { Company } = require("../../models");
var bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
        data: "",
      });
      return;
    }

    // Create a Company
    const company = {
      companyName: req.body.companyName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    };

    // Save
    const newCompany = await Company.create(company);
    newCompany.password = undefined;
    res.status(200).send({
      message: "Successfully",
      data: newCompany,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: {},
    });
    return;
  }
};

const getAll = async (req, res) => {
  try {
    const companys = await Company.findAll();
    res.status(200).send({
      message: "Successfully",
      data: companys,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getById = async (req, res) => {
  try {
    const { idCompany } = req.params;
    const company = await Company.findByPk(idCompany);
    res.status(200).send({
      message: "Successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { create, getAll, getById };
