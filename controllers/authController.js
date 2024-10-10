const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../config/mailer");

//Register User
const register = async (req, res) => {
  try {
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!req.body.email) {
      return res.status(400).send({
        status: 0,
        message: "Email field can't be empty..",
      });
    } else if (!req.body.email.match(emailValidation)) {
      return res.status(400).send({
        status: 0,
        message: "Please enter valid email address.",
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        status: 0,
        message: "Password field can't be empty.",
      });
    }
    // else if (!req.body.password.match(pass)) {
    //   return res.status(400).send({
    //     status: 0,
    //     message:
    //       "Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.",
    //   });
    // }
    else if (!req.body.confirm_password) {
      return res.status(400).send({
        status: 0,
        message: "Confirm Password field can't be empty.",
      });
    } else if (req.body.password !== req.body.confirm_password) {
      return res.status(400).send({
        status: 0,
        message: "New Password and Confirm Password must be same.",
      });
    } else {
      const find = await User.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (find) {
        return res.status(400).send({
          status: 0,
          message: "The email has already been taken.",
        });
      } else {
        if (req.file) {
          image = req.file.path;
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        // const verification_code = Math.floor(
        //     100000 + Math.random() * 900000
        // );
        const verification_code = 123456;

        const user = new User();
        user.image = req.file ? req.file.path : req.body.image;
        user.email = req.body.email.toLowerCase();
        user.password = hash;
        user.verification_code = verification_code;
        user.device_token = req.body.device_token;
        user.device_type = req.body.device_type;
        user.role = req.body.role ? req.body.role : "User";

        // const token = await jwt.sign(
        //   {
        //     email: user.email,
        //     id: user._id,
        //   },
        //   process.env.JWT_KEY
        //   // {
        //   //   expiresIn: "20hr",
        //   // }
        // );
        // user.authentication = token;
        await user.save();

        if (!user) {
          return res.status(404).send({
            status: 0,
            message: "The email has already been taken.",
          });
        } else {
          sendEmail(user.email, verification_code, "Email verification");

          return res.status(200).send({
            status: 1,
            message:
              "OTP verification code has been sent to your email address.",
            // data: user,
            data: {
              _id: user._id,
            },
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

//Login
const login = async (req, res) => {
  try {
    if (!req.body.email.toLowerCase()) {
      return res.status(400).send({
        status: 0,
        message: "Email field can't be empty.",
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        status: 0,
        message: "Password field is required.",
      });
    } else if (req.body.password.length < 8) {
      return res.status(400).send({
        status: 0,
        message: "The password must be at least 8 characters.",
      });
    } else {
      const user = await User.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (!user) {
        return res.status(404).send({
          status: 0,
          message: "You have enter invalid email address.",
        });
      } else {
        const pass_match = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!pass_match) {
          return res.status(400).send({
            status: 0,
            message: "Invalid password!",
          });
        } else {
          if (user.is_delete == 1) {
            return res.status(400).send({
              status: 0,
              message:
                "You have deleted your account please recover to use it.",
            });
          } else if (user.is_blocked == 1) {
            return res.status(400).send({
              status: 0,
              message: "You are temporarily blocked by Admin",
            });
          } else if (user.is_verified == 0) {
            return res.status(200).send({
              status: 1,
              message: "Please verify your account",
              data: user,
            });
          } else {
            const token = await jwt.sign(
              {
                email: user.email,
                id: user._id,
              },
              process.env.JWT_KEY
              // {
              //   expiresIn: "20hr",
              // }
            );
            const result = await User.findOneAndUpdate(
              {
                email: req.body.email.toLowerCase(),
              },
              {
                device_token: req.body.device_token,
                device_type: req.body.device_type,
                authentication: token,
              },
              {
                new: true,
              }
            );
            return res.status(200).send({
              status: 1,
              message: "Login successfully.",
              data: result,
            });
          }
        }
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

//verify User
const verifyUser = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send({
        status: 0,
        message: "Id is required",
      });
    } else if (!req.body.verification_code) {
      return res.status(400).send({
        status: 0,
        message: "OTP field can't be empty.",
      });
    } else {
      const user = await User.findOne({
        _id: req.body.id,
      });
      if (user) {
        if (req.body.verification_code == user.verification_code) {
          const updated = await User.findOneAndUpdate(
            { _id: req.body.id },
            { is_verified: 1, verification_code: null },
            { new: true }
          );
          // console.log(updated.is_forgot)
          // return
          if (updated.is_forgot === 1) {
            const token = await jwt.sign(
              {
                email: updated.email,
                id: updated._id,
              },
              process.env.JWT_KEY
              // {
              //   expiresIn: "20hr",
              // }
            );
            updated.authentication = token;
            await updated.save();
            return res.status(200).send({
              status: 1,
              message: "Otp matched successfully.",
              data: updated,
            });
          } else if (updated.is_forgot === 0) {
            const token = await jwt.sign(
              {
                email: updated.email,
                id: updated._id,
              },
              process.env.JWT_KEY
              // {
              //   expiresIn: "20hr",
              // }
            );
            updated.authentication = token;
            await updated.save();
            return res.status(200).send({
              status: 1,
              message: "OTP verified.",
              data: updated,
            });
          }
        } else {
          return res.status(404).send({
            status: 0,
            message: "Invalid OTP verification code.",
          });
        }
      } else {
        return res.status(404).send({
          status: 0,
          message: "User not found!",
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

/** Resend code */
const resendCode = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send({
        status: 0,
        message: "User id is required.",
      });
    } else {
      const user = await User.findOne({
        _id: req.body.id,
      });
      if (user) {
        // const verification_code = Math.floor(100000 + Math.random() * 900000);
        const verification_code = 123456;

        const result = await User.findOneAndUpdate(
          { _id: req.body.id },
          { verification_code: verification_code },
          { new: true }
        );

        if (result) {
          sendEmail(
            result.email,
            verification_code,
            "Verification Code Resend"
          );
          return res.status(200).send({
            status: 1,
            message:
              "We have resend OTP verification code at your email address.",
            // data: {
            //   verification_code: verification_code,
            // },
          });
        }
      } else {
        return res.status(404).send({
          status: 0,
          message: "User not found!",
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

//Forgot Password
const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email.toLowerCase()) {
      return res.status(400).send({
        status: 0,
        message: "Email field can't be empty.",
      });
    } else {
      const user = await User.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (!user) {
        return res.status(404).send({
          status: 0,
          message: "You have enter invalid email address.!",
        });
      } else {
        // const verification_code = Math.floor(100000 + Math.random() * 900000);
        const verification_code = 123456;

        const result = await User.findOneAndUpdate(
          { _id: user._id },
          { verification_code: verification_code, is_forgot: 1 },
          { new: true }
        );
        sendEmail(result.email, verification_code, "Forgot Password");
        return res.status(200).send({
          status: 1,
          message: "OTP verification code has been sent to your email address",
          data: {
            // verification_code: verification_code,
            _id: result._id,
            is_forgot: result.is_forgot,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

//Reset Password
const resetPassword = async (req, res) => {
  try {
    const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!req.body.id) {
      return res.status(400).send({
        status: 0,
        message: "User id field is required.",
      });
    } else if (!req.body.new_password) {
      return res.status(400).send({
        status: 0,
        message: "New password field can't be empty.",
      });
    }
    // else if (!req.body.new_password.match(pass)) {
    //   return res.status(400).send({
    //     status: 0,
    //     message:
    //       "Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.",
    //   });
    // }
    else if (!req.body.confirm_password) {
      return res.status(400).send({
        status: 0,
        message: "Confirm Password field can't be empty.",
      });
    } else if (req.body.new_password !== req.body.confirm_password) {
      return res.status(400).send({
        status: 0,
        message: "New Password and Confirm Password must be same.",
      });
    } else {
      const user = await User.findOne({
        _id: req.body.id,
      });
      if (!user) {
        return res.status(404).send({
          status: 0,
          message: "You have enter invalid id.",
        });
      } else {
        const pass = await bcrypt.hash(req.body.new_password, 10);

        const result = await User.findOneAndUpdate(
          { _id: req.body.id },
          { password: pass, is_forgot: 0 },
          { new: true }
        );

        return res.status(200).send({
          status: 1,
          message: "Password changed successfully",
          // data: result,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

//Update Password
const updatePassword = async (req, res) => {
  try {
    const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    // console.log(req.user._id)
    if (!req.body.old_password) {
      return res.status(400).send({
        status: 0,
        message: "Existing Password field can't be empty.",
      });
    } else if (!req.body.new_password) {
      return res.status(400).send({
        status: 0,
        message: "New password field can't be empty.",
      });
    }
    // else if (!req.body.new_password.match(pass)) {
    //   return res.status(400).send({
    //     status: 0,
    //     message:
    //       "Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.",
    //   });
    // }
    else if (!req.body.confirm_password) {
      return res.status(400).send({
        status: 0,
        message: "Confirm password field can't be empty.",
      });
    } else if (req.body.new_password !== req.body.confirm_password) {
      return res.status(400).send({
        status: 0,
        message: "New password and Confirm password must be same.",
      });
    } else if (req.body.old_password == req.body.new_password) {
      return res.status(400).send({
        status: 0,
        message: "Existing password and New password can't be same.",
      });
    } else {
      const user = await User.findOne({
        _id: req.user._id,
      });
      if (!user) {
        return res.status(404).send({
          status: 0,
          message: "User not found.",
        });
      } else {
        const isMatch = await bcrypt.compare(
          req.body.old_password,
          user.password
        );
        if (!isMatch) {
          return res.status(400).send({
            status: 0,
            message: "Existing password is incorrect.",
          });
        } else {
          const hashedpassword = await bcrypt.hash(req.body.new_password, 10);
          const newUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { password: hashedpassword },
            { new: true }
          );

          return res.status(200).send({
            status: 1,
            message: "Password updated successfully.",
            // newUser.email + "'s password has been updated successfully",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

//LogOut
const logOut = async (req, res) => {
  try {
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      return res.status(400).send({
        status: 0,
        message: "Authentication field is required",
      });
    } else {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          authentication: null,
          device_type: null,
          device_token: null,
        },
        { new: true }
      );
      res.removeHeader("authorization");
      return res.status(200).send({
        status: 1,
        message: "Logout successfully.",
        // updateUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error,
    });
  }
};

//** Social Login *//
const socialLogin = async (req, res) => {
  try {
    if (!req.body.social_token) {
      return res.status(400).send({
        status: 0,
        message: "User Social Token field is required",
      });
    } else if (!req.body.social_type) {
      return res.status(400).send({
        status: 0,
        message: "User Social Type field is required",
      });
    } else if (!req.body.device_type) {
      return res.status(400).send({
        status: 0,
        message: "User Device Type field is required",
      });
    } else if (!req.body.device_token) {
      return res.status(400).send({
        status: 0,
        message: "User Device Token field is required",
      });
    } else {
      const checkUser = await User.findOne({
        social_token: req.body.social_token,
      });
      if (!checkUser) {
        const newRecord = new User();
        newRecord.social_token = req.body.social_token;
        newRecord.social_type = req.body.social_type;
        newRecord.device_type = req.body.device_type;
        newRecord.device_token = req.body.device_token;
        newRecord.email = req.body.email;
        newRecord.phone = req.body.phone;
        newRecord.role = req.body.role ? req.body.role : "User";
        newRecord.is_verified = 1;
        const token = await jwt.sign(
          {
            email: newRecord.email,
            id: newRecord._id,
          },
          process.env.JWT_KEY
          // {
          //   expiresIn: "20hr",
          // }
        );
        newRecord.authentication = token;
        const saveLogin = await newRecord.save();
        return res.status(200).send({
          status: 1,
          message: "Login Successfully",
          data: saveLogin,
        });
      } else {
        if (checkUser.is_delete === 1) {
          return res.status(400).send({
            status: 0,
            message: "You have deleted your account please recover to use it.",
          });
        } else {
          // const user = this;
          const token = await jwt.sign(
            {
              email: checkUser.email,
              id: checkUser._id,
            },
            process.env.JWT_KEY
            // {
            //   expiresIn: "20hr",
            // }
          );
          const upatedRecord = await User.findOneAndUpdate(
            { _id: checkUser._id },
            {
              device_type: req.body.device_type,
              device_token: req.body.device_token,
              is_verified: 1,
              authentication: token,
            },
            { new: true }
          );
          return res.status(200).send({
            status: 1,
            message: "Login successfully",
            data: upatedRecord,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyUser,
  resendCode,
  forgotPassword,
  resetPassword,
  updatePassword,
  logOut,
  socialLogin,
};
