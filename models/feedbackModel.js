const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    subject: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    feedback_images: {
        type: Array,
        default: []
    },
},{
  timestamps: true,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
