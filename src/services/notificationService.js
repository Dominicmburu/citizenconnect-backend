const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "oliviamarjorie787@gmail.com",
      pass: "lomq zleb oqyh yumt",
    },
  });

  try {
    await transporter.sendMail({
      from: "oliviamarjorie787@gmail.com",
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error('Failed to send email:', err);
  }
};

const sendWelcomeEmail = async (email, username) => {
  const subject = `Welcome to CitizenConnect360, ${username}!`;
  const text = `Hello ${username},\n\nThank you for registering with CitizenConnect360. We're excited to have you on board!\n\nBest regards,\nCitizenConnect360 Team`;
  await sendEmail(email, subject, text);
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const subject = `Password Reset Instructions`;
  const text = `Hello,\n\nTo reset your password, click on the following link: \n\nhttps://yourapp.com/reset-password?token=${resetToken}\n\nIf you did not request a password reset, please ignore this message.\n\nBest regards,\nCitizenConnect360 Team`;
  await sendEmail(email, subject, text);
};

module.exports = { sendEmail, sendWelcomeEmail, sendPasswordResetEmail };
