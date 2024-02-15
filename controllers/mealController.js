const Meal = require("../models/mealModel");
const Type = require("../models/typeModel");

const addMeal = async (req, res) => {
  try {
    if (!req.body.type_id) {
      return res.status(400).send({
        status: 0,
        message: "Type field can't be empty.",
      });
    } else if (!req.body.title) {
      return res.status(400).send({
        status: 0,
        message: "Title field can't be empty.",
      });
    } else if (!req.body.items) {
      return res.status(400).send({
        status: 0,
        message: "Items field can't be empty.",
      });
    } else {
      const meal = new Meal({
        type_id: req.body.type_id,
        title: req.body.title,
        discription: req.body.discription,
        items: req.body.items,
        price: req.body.price,
        discount: req.body.discount,
        persons: req.body.persons,
      });
      await meal.save();
      return res.status(200).send({
        status: 1,
        message: "Meal added successfully.",
        data: meal,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

const editMeal = async (req, res) => {
  try {
    const findmeal = await Meal.findOne({ _id: req.body.id });
    if (!findmeal) {
      return res.status(404).send({
        status: 0,
        message: "Meal not found.",
      });
    } else {
      const meal = await Meal.findOneAndUpdate(
        { _id: req.body.id },
        {
          type_id: req.body.type_id ? req.body.type_id : findmeal.type_id,
          title: req.body.title ? req.body.title : findmeal.title,
          discription: req.body.discription
            ? req.body.discription
            : findmeal.discription,
          items: req.body.items ? req.body.items : findmeal.items,
          price: req.body.price ? req.body.price : findmeal.price,
          discount: req.body.discount ? req.body.discount : findmeal.discount,
          persons: req.body.persons ? req.body.persons : findmeal.persons,
        },
        { new: true }
      );
      return res.status(200).send({
        status: 1,
        message: "Meal updated successfully.",
        data: meal,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const findMeal = await Meal.findOne({ _id: req.params.id });
    if (!findMeal) {
      return res.status(404).send({
        status: 0,
        message: "Meal not found.",
      });
    } else {
      const deleteMeal = await Meal.findOneAndUpdate(
        { _id: req.params.id },
        { is_deleted: true },
        { new: true }
      );
      return res.status(200).send({
        status: 1,
        message: "Meal deleted successfully.",
        data: deleteMeal,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

const getMeals = async (req, res) => {
  try {
    const meals = await Type.aggregate([
      {
        $lookup: {
          from: "meals",
          localField: "_id",
          foreignField: "type_id",
          as: "meals",
        },
      },
      {
        $match: {
          "meals.is_deleted": false,
        },
      },
    ]);
    return res.status(200).send({
      status: 1,
      message: "Meals fetched successfully.",
      data: meals,
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

module.exports = {
  addMeal,
  editMeal,
  deleteMeal,
  getMeals,
};
