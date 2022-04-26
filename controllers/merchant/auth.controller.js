const { Company } = require("../../models");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth.config");

const signUp = async (req, res) => {
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

const login = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!company) {
      res.status(404).json({
        message: "Company not found",
      });
    }

    const validPassword = bcrypt.compareSync(req.body.password, company.password);
    if (!validPassword) {
      res.send({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        idCompany: company.idCompany,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: authConfig.jwtExpiration },
    );
    company.password = undefined;

    res.status(200).json({
      message: "Successfully",
      data: company,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { signUp, login };
