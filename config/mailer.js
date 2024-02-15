const nodemailer = require("nodemailer");

// Email function
// const transporter = nodemailer.createTransport({
//     service: "appsstaging",
//     host: "server.appsstaging.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "noreply@server.appsstaging.com",
//         pass: "Technado@12345",
//     },
// });

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6651dbb465d8d9",
    pass: "4e6608fa083538"
  }
});

const sendEmail = (user_email, verification_code, subject) => {
  const mailOptions = {
    from: "noreply@server.appsstaging.com",
    to: user_email,
    subject: subject,
    html: `<p>Your verification code is ${verification_code} </p>`,
  };
  transport.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = { sendEmail };
