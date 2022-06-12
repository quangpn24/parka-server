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
      return;
    }

    const validPassword = bcrypt.compareSync(req.body.password, company.password);
    if (!validPassword) {
      res.status(404).send({ message: "Invalid password" });
      return;
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

const verify = async (req, res) => {
  try {
    const { accessToken } = req.body;
    let idCompany;
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, decoded) {
      idCompany = decoded.idCompany;
      if (err) {
        throw err;
      }
    });

    const company = await Company.findOne({
      where: {
        idCompany: idCompany,
      },
    });

    res.status(200).json({
      message: "Successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const { idCompany } = req.params;
    const company = await Company.findByPk(idCompany);

    const isValidPassword = bcrypt.compareSync(password, company.password);
    console.log({ isValidPassword });
    if (!isValidPassword) {
      res.status(400).json({
        message: "Password not match",
        data: "",
      });
      return;
    }
    const result = await Company.update(
      { password: bcrypt.hashSync(newPassword) },
      {
        where: {
          idCompany: idCompany,
        },
        returning: true,
      },
    );
    const updatedCompany = result[1][0];
    updatedCompany.password = undefined;
    res.status(200).json({
      message: "Successfully",
      data: updatedCompany,
    });
  } catch (err) {
    res.status(500).json({ message: err, data: "" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { idCompany } = req.params;
    const result = await Company.update(req.body, {
      where: {
        idCompany: idCompany,
      },
      returning: true,
    });

    const updatedCompany = result[1][0];
    updatedCompany.password = undefined;

    res.status(200).send({
      message: "Successfully",
      data: updatedCompany,
    });
  } catch (err) {
    res.status(500).json({ message: err, data: "" });
  }
};

module.exports = { signUp, login, verify, changePassword, updateCompany };
