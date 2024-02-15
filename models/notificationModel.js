const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // goal_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Job",
    // },
    // post_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Post",
    // },
    route_id: {
      type: mongoose.Schema.Types.ObjectId,
    //   ref: "Post",
    },
    notification_title: {
      type: String,
      default: null
    },
    notification_body: {
      type: String,
      default: null
    },
    notification_type: {
      type: String,
      default: null
    },
    notification_route: {
      type: String,
      default: null
    },
    notification_is_block: {
      type: Number,
      default: 0
    },
    date: {
      type: String,
      default: null
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
