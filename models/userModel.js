const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    image: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      maxLength: 30,
      minLength: 3,
      default: null,
    },
    // last_name: {
    //     type: String,
    //     maxLength: 30,
    //     minLength: 3,
    // },
    email: {
      type: String,
      default: null,
      // match: [
      //   /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
      //   "Please enter a valid email address",
      // ],
      // validate: [validator.isEmail,"Please enter a valid email address"],
    },
    password: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    dob: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    verification_code: {
      type: Number,
      default: null,
    },
    is_forgot: {
      type: Number,
      default: 0,
    },
    is_verified: {
      type: Number,
      default: 0,
    },
    is_notification: {
      type: Number,
      default: 1,
    },
    is_blocked: {
      type: Number,
      default: 0,
    },
    is_delete: {
      type: Number,
      default: 0,
    },
    is_complete: {
      type: Number,
      default: 0,
    },
    authentication: {
      type: String,
      default: null,
    },
    //social login
    social_token: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    social_type: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    device_type: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    device_token: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    // stripe_id: {
    //   type: String,
    //   required: false,
    //   default: null,
    //   trim: true,
    // },
    // is_subscribed: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
