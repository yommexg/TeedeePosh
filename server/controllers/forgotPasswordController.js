const twilio = require("twilio");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper function to generate OTP
function generateOTP() {
  const digits = "0123456789";
  let generatedOTP = "";

  for (let i = 0; i < 6; i++) {
    generatedOTP += digits[Math.floor(Math.random() * 10)];
  }

  return generatedOTP;
}

const handleForget = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser) return res.sendStatus(401);

  // Generate OTP
  const otp = generateOTP();

  // Send OTP via SMS (Twilio)
  // client.messages
  //   .create({
  //     body: `Your OTP is: ${otp}. Do not share with anyone`,
  //     from: process.env.TWILIO_PHONE_NUMBER,
  //     to: foundUser.phoneNumber,
  //   })
  // .then(() => {
  // Send OTP via Email (Nodemailer)
  const transporter = nodemailer.createTransport({
    service: "GMAIL", // Use your email service provider
    auth: {
      user: process.env.GMAIL, // Use your email
      pass: process.env.GMAIL_PASSWORD, // Use your app-specific password
    },
  });

  const mailOptions = {
    from: process.env.GMAIL,
    to: email, // Use the provided email from the request
    subject: "Teddeeposh Stores",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send OTP via email" });
    } else {
      console.log("Email sent: " + info.response);
      res.send(otp);
    }
  });
  // })
  // .catch((error) => {
  //   console.error("Error sending OTP via SMS:", error);
  //   res.status(500).json({ error: "Failed to send OTP via SMS" });
  // });
};

const handleResetPassword = async (req, res) => {
  const { email, pwd } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser) return res.sendStatus(401);

  const hashedPwd = await bcrypt.hash(pwd, 10);

  try {
    foundUser.password = hashedPwd;
    await foundUser.save();
    res
      .status(201)
      .json({ success: `${foundUser.username} Password was Changed` });
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error}` });
  }
};

module.exports = { handleForget, handleResetPassword };
