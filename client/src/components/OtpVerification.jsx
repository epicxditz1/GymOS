import { useState } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import api from "../services/api";

function OtpVerification({
  email,
  goToForgotPassword,
  goToResetPassword,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerifyOTP() {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/users/verify-forgot-password-otp",
        {
          email,
          otp,
        }
      );

      goToResetPassword(email);

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0F172A] p-10">

        <div className="flex justify-center mb-6">

          <div className="h-16 w-16 rounded-2xl bg-cyan-500 flex items-center justify-center">

            <ShieldCheck className="text-white" />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Verify OTP
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Enter the OTP sent to
          <br />
          <span className="text-cyan-400">
            {email}
          </span>
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="mt-8 w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-center tracking-[8px] text-2xl text-white outline-none focus:border-cyan-500"
        />

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600"
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <button
          onClick={goToForgotPassword}
          className="mt-4 w-full flex justify-center items-center gap-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

    </div>
  );
}

export default OtpVerification;