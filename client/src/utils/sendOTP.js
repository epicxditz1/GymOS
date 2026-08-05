const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"GymOS" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "GymOS Email Verification",

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Welcome to GymOS 👋</h2>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:6px;color:#06B6D4">
          ${otp}
        </h1>

        <p>This OTP will expire in <b>5 minutes</b>.</p>

        <p>If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};

module.exports = sendOTP;