const { Block, ParkingSlot } = require("../../models");

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
    const blocks = req.body.map(e => {
      return {
        blockCode: e.blockCode,
        idParkingLot: e.idParkingLot,
        numOfSlot: e.numOfSlot,
      };
    });

    // Save
    const newBlocks = await Block.bulkCreate(blocks, { returning: true });

    for (let index = 0; index < newBlocks.length; index++) {
      const block = {
        ...newBlocks[index].dataValues,
        ...req.body[index],
      };
      var listSlots = [];
      for (let i = block.from; i <= block.to; i++) {
        const slot = {
          idBlock: block.idBlock,
          slotNumber: i,
        };
        listSlots.push(slot);
      }
      const newSlots = await ParkingSlot.bulkCreate(listSlots, { returning: true });
    }

    res.status(200).send({
      message: "Add block and slot successfully!",
      data: newBlocks,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getAllByIdParking = async (req, res) => {
  try {
    const { idParkingLot } = req.query;
    const blocks = await Block.findAll({
      where: { idParkingLot },
      include: [{ model: ParkingSlot }],
    });
    res.status(200).send({
      message: "Successfully",
      data: blocks,
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

const update = async (req, res) => {
  try {
    const { idParkingLot } = req.query;
    const isDeleted = await Block.destroy({ where: { idParkingLot } });
    if (isDeleted) {
      create(req, res);
    }
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
  }
};

module.exports = { create, getAllByIdParking, getById, update };
