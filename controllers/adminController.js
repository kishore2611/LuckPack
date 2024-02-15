const User = require("../models/userModel");


const blockUnblock = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (user.is_blocked == 0) {
      const block = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          is_blocked: 0,
        },
        { is_blocked: 1 },
        { new: true }
      );
      return res.status(200).send({
        status: 1,
        message: "You have blocked this user",
        data: block,
      });
    } else if (user.is_blocked == 1) {
      const unblock = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          is_blocked: 1,
        },
        { is_blocked: 0 },
        { new: true }
      );
      return res.status(200).send({
        status: 1,
        message: "You have unblocked this user",
        data: unblock,
      });
    } else {
      return res.status(404).send({
        status: 0,
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const users = await User.find({is_verified: 1})
    const android = await User.find({device_type: "android", is_verified: 1})
    const ios = await User.find({device_type: "ios", is_verified: 1})
    // const employer = await User.find({role: "Employer", is_verified: 1})
    // const jobs = await Job.find({})
    // const startjobs = await Job.find({job_begin: 1})
    // const completedjobs = await Job.find({job_complete: 1})
    // if (payment.length < 1) {
    //   return res.status(404).send({
    //     status: 0,
    //     message: "No payment found.",
    //   });
    // } else {
      return res.status(200).send({
        status: 1,
        message: "Payment Requests.",
        data: {
          users: users.length,
          android: android.length,
          ios: ios.length,
        }
      });
    // }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find({
    //   is_verified: 1,
    // }).sort({ createdAt: -1 });
    const users = await User.aggregate([
      {
        $match: {is_verified: 1}
      },
    ])
    if (users.length < 1) {
      return res.status(404).send({
        status: 0,
        message: "No users request found.",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Users Requests.",
        data: users,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};



module.exports = {
  blockUnblock,
  getDashboard,
  getAllUsers
};
