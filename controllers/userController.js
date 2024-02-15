const User = require("../models/userModel");

const completeProfile = async (req, res) => {
  try {
    if (!req.body.id) {
      res.status(400).send({
        status: 0,
        message: "User id field is required.",
      });
    } else if (!req.body.gender) {
      res.status(400).send({
        status: 0,
        message: "Gender field is required.",
      });
    } else if (!req.body.name) {
      res.status(400).send({
        status: 0,
        message: "User name field is required.",
      });
    }else if (!req.body.dob) {
      res.status(400).send({
        status: 0,
        message: "DOB field is required.",
      });
    } else {
      const profilefind = await User.findOne({
        _id: req.body.id,
        is_complete: 0,
      });

      if (!profilefind) {
        return res.status(400).send({
          status: 0,
          message: "You have already completed your profile.",
        });
      } else {
        if (req.file) {
          image = req.file.path;
        }

        const profile = await User.findOneAndUpdate(
          {
            _id: req.body.id,
            is_complete: 0,
          },
          {
            image: req.file ? req.file.path : req.body.image,
            name: req.body.name ? req.body.name : req.user.name,
            gender: req.body.gender ? req.body.gender : req.user.gender,
            dob: req.body.dob ? req.body.dob : req.user.dob,
            phone: req.body.phone ? req.body.phone : req.user.phone,
            // city: req.body.city ? req.body.city : req.user.city,
            // country: req.body.country ? req.body.country : req.user.country,
            // preferences: req.body.preferences ? req.body.preferences : req.user.preferences,
            is_complete: 1,
          },
          { new: true }
        );

        return res.status(200).send({
          status: 1,
          message: "Profile completed successfully.",
          data: profile,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

const userDetail = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);

    if (!user) {
      return res.status(404).send({
        status: 0,
        message: "User not found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "User Detail",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send({
        status: 0,
        message: "User Not Found",
      });
    } else {
      if (req.file) {
        image = req.file.path;
      }

      const updateuser = {
        image: req.file ? req.file.path : req.body.image,
        name: req.body.name ? req.body.name : req.user.name,
        phone: req.body.phone ? req.body.phone : req.user.phone,
        dob: req.body.dob ? req.body.dob : req.user.dob,
        address: req.body.address ? req.body.address : req.user.address,
        city: req.body.city ? req.body.city : req.user.city,
        country: req.body.country ? req.body.country : req.user.country,
        preferences: req.body.preferences ? req.body.preferences : req.user.preferences,
      };

      const updateduser = await User.findOneAndUpdate(
        { _id: req.user._id },
        updateuser,
        { new: true }
      );

      if (!updateduser) {
        return res.status(400).send({
          status: 0,
          message: "User profile has not updated!",
        });
      } else {
        return res.status(200).send({
          status: 1,
          message: "Profile updated successfully.",
          data: updateduser,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id, is_delete: 0 });
    if (!user) {
      return res.status(404).send({
        status: 0,
        message: "User not found",
      });
    } else {
      const deleteuser = await User.findOneAndUpdate(
        { _id: req.user._id, is_delete: 0 },
        { is_delete: 1, authentication: null },
        { new: true }
      );

      if (!deleteuser) {
        return res.status(400).send({
          status: 0,
          message: "User has not deleted!",
        });
      } else {
        return res.status(200).send({
          status: 1,
          message: "User has been deleted succesfully!",
          // data: deleteuser,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

module.exports = {
  userDetail,
  updateUser,
  deleteUser,
  completeProfile,
};
