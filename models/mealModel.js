const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    discription: {
        type: String,
        default: null,
    },
    items: [
        {
            name: {
                type: String,
                default: null,
            },
            quantity: {
                type: Number,
                default: null,
            }
        }
    ],
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    persons: {
        type: Number,
        default: null
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
