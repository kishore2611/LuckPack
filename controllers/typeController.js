const Type = require("../models/typeModel");


const addType = async (req, res) => {
  try {
    if (!req.body.type) {
      return res.status(400).send({
        status: 0,
        message: "Type field can't be empty.",
      });
    } else {
      const find = await Type.findOne({
        type: req.body.type,
      });
      if (find) {
        return res.status(404).send({
          status: 0,
          message: "Type already added.",
        });
      } else {
        const type = new Type({
          type: req.body.type
        });
        await type.save();

        return res.status(200).send({
          status: 1,
          message: "Type added successfully.",
          data: type,
        });
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await Type.find().sort({createdAt: -1})
    if (types.length < 1) {
      return res.status(200).send({
        status: 1,
        message: "No types.",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Types.",
        data: types,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteType = async (req, res) => {
  try {
    const type = await Type.findOne({_id: req.params._id})
    if (!type) {
      return res.status(404).send({
        status: 0,
        message: "No type.",
      });
    } else {
      const deletetype = await Type.findOneAndDelete({_id: req.params._id})
      return res.status(200).send({
        status: 1,
        message: "Type deleted successfully.",
        data: deletetype
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
    addType,
    getTypes,
    deleteType
};
