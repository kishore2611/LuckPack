
const Feedback = require("../models/feedbackModel");



const addFeedback = async (req, res) => {
  try {
    if (!req.body.subject) {
      return res.status(400).send({
        status: 0,
        message: "Subject field can't be empty.",
      });
    } else if (!req.body.message) {
        return res.status(400).send({
          status: 0,
          message: "Message field can't be empty.",
        });
      } else {
        // if(req.files.length < 1){
        //     return res.status(400).json({ status: 0, message: "Image is required" })  
        //   }
        //   console.log(req.files)
          if (req.files) {
              var feedback_images = []
              for (let i = 0; i < req.files.length; i++) {
                feedback_images.push(req.files[i].path)

              }
          }
      
        const feedback = new Feedback({
          user_id: req.user._id,
          subject: req.body.subject,
          message: req.body.message,
          feedback_images: req.files ? feedback_images : req.body.images,
        });
        await feedback.save();

        return res.status(200).send({
          status: 1,
          message: "Feedback sent successfully.",
          data: feedback,
        });
      
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate("user_id").sort({createdAt: -1})
    if (feedback.length < 1) {
      return res.status(404).send({
        status: 0,
        message: "No feedback.",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "Feedback.",
        data: feedback,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports = {
    addFeedback,
    getFeedback,
};
