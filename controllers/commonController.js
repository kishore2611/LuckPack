const Content = require("../models/contentModel");
const main = require("../app.js");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const getContent = async (req, res) => {
  if (!req.params.type) {
    return res.status(400).send({
      status: 0,
      message: "Type is required.",
    });
  } else {
    Content.find({ type: req.params.type })
      .exec()
      .then((content) => {
        if (content.length > 0) {
            const url = `http://host2.appsstaging.com:3056/${req.params.type}`;
          res.status(200).send({
            status: 1,
            message: "Content found Sucessfully",
            data: content,
            url: url,
          });
        } else {
          res.status(404).send({
            status: 0,
            message: "Content not found.",
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 0,
          message: err,
        });
      });
  }
};

const UpdateContent = async (req, res) => {
  try {
    if (!req.params.type) {
      res.status(400).send({
        status: 0,
        message: "type Field is required",
      });
    } else {
      if (req.params.type === "privacy_policy") {
        console.log(req.params.type);
        await Content.findOneAndUpdate(
          { type: req.params.type },
          { content: req.body.content },
          { new: true }
        );
        res.status(200).send({
          status: 1,
          message: "privacy_policy Updated",
        });
      } else if (req.params.type === "terms_and_conditions") {
        await Content.findOneAndUpdate(
          { type: req.params.type },
          { content: req.body.content },
          { new: true }
        );
        res.status(200).send({
          status: 1,
          message: "terms_and_conditions Updated",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: "error",
        });
      }
    }
    main.dbSeed();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getNotification = async (req, res) => {
  try {
    const notification = await Notification.find({ receiver_id: req.user._id }).sort({createdAt: -1})
    if (notification.length < 1) {
      return res.status(400).send({
        status: 1,
        message: "No Notification.",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Notifications.",
        data: notification,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const notificationOnOff = async (req, res) => {
  try {
    const notification = await User.findOne({ _id: req.user._id });

    if (notification.length < 1 || !notification) {
      return res.status(404).send({
        status: 1,
        message: "User not found.",
      });
    } else {
      if (notification.is_notification == 1) {
        const update = await User.findOneAndUpdate(
          { _id: req.user._id },
          { is_notification: 0 },
          { new: true }
        );
        return res.status(200).send({
          status: 1,
          message: "Notifications off.",
          data: update,
        });
      } else if (notification.is_notification == 0) {
        const update = await User.findOneAndUpdate(
          { _id: req.user._id },
          { is_notification: 1 },
          { new: true }
        );
        return res.status(200).send({
          status: 1,
          message: "Notifications on.",
          data: update,
        });
      } else {
        return res.status(400).send({
          status: 0,
          message: "Something went wrong.",
        });
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.notification_id })
    if (!notification) {
      return res.status(400).send({
        status: 1,
        message: "Notification not found.",
      });
    } else {
      const dltNotification = await Notification.findOneAndDelete({ _id: req.params.notification_id })
      return res.status(200).send({
        status: 1,
        message: "Notification Deleted Succesfully.",
        data: dltNotification,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports = {
  getContent,
  UpdateContent,
  getNotification,
  notificationOnOff,
  deleteNotification
};
