const { Block } = require("../models");

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

    // Create a Block
    const Block = {
      blockCode: req.body.blockCode,
      description: req.body.description,
      idParkingLot: req.body.idParkingLot,
    };

    // Save
    const newBlock = await User.create(Block);
    res.status(200).send({
      message: "Successfully",
      data: newBlock,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getAll = async (req, res) => {
  try {
    const Blocks = await Block.findAll();
    res.status(200).send({
      message: "Successfully",
      data: Blocks,
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
    const { idBlock } = req.params;
    const Block = await Block.findByPk(idBlock);
    res.status(200).send({
      message: "Successfully",
      data: Block,
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
