const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  type: {
    type: String,
    default: null
  },
},{
  timestamps: true,
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
