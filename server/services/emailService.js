const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
  try {
    console.log("Sending OTP to:", email);

    const result = await resend.emails.send({
      from: "GymOS <noreply@gymos.space>",
      to: email,
      subject: "Verify your GymOS Account",
      html: `
        <h2>GymOS Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
      `,
    });

    console.log("Resend Result:", result);

    return result;
  } catch (error) {
    console.error("========== RESEND ERROR ==========");
    console.error(error);
    console.error("==================================");
    throw error;
  }
};

module.exports = sendOTP;