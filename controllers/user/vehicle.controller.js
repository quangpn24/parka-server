const { Vehicle } = require("../../models");

const create = async (req, res) => {
  try {
    const { body } = req;
    // Validate request
    if (!body) {
      res.status(400).send({
        message: "Content can not be empty!",
        data: "",
      });
      return;
    }

    const vehicle = {
      idUser: body.idUser,
      name: body.name,
      number: body.number,
      type: body.type,
    };

    const newVehicle = await Vehicle.create(vehicle);
    res.status(200).send({
      message: "Successfully",
      data: newVehicle,
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
    const { idVehicle } = req.params;
    const vehicle = await Vehicle.findByPk(idVehicle);
    res.status(200).send({
      message: "Successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const vehicle = await Vehicle.findAll({
      where: {
        idUser: idUser,
        isActivated: true,
      },
    });

    res.status(200).send({
      message: "Successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const update = async (req, res) => {
  try {
    const { idVehicle } = req.params;
    const updatedData = await Vehicle.update(req.body, {
      where: {
        idVehicle: idVehicle,
      },
      returning: true,
    });

    res.status(200).send({
      message: "Successfully",
      data: updatedData[1][0],
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { idVehicle } = req.params;
    const updatedData = await Vehicle.update(
      {
        isActivated: false,
      },
      {
        where: {
          idVehicle: idVehicle,
        },
        returning: true,
      },
    );

    res.status(200).send({
      message: "Successfully",
      data: updatedData[1][0],
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
  }
};

module.exports = { create, getByIdUser, getById, update, deleteOne };
