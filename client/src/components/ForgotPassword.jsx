import { useState } from "react";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  Dumbbell,
} from "lucide-react";
import api from "../services/api";

function ForgotPassword({
  goToLogin,
  goToOtpVerification,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendOTP() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/forgot-password", {
        email,
      });

      goToOtpVerification(email);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to send OTP"
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

            <Dumbbell className="text-white" />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Forgot Password
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Enter your registered email to receive OTP.
        </p>

        <div className="mt-8">

          <label className="text-slate-300">
            Email Address
          </label>

          <div className="relative mt-2">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-11 pr-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

        </div>

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600 transition"
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

        <button
          onClick={goToLogin}
          className="mt-4 w-full flex justify-center items-center gap-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back To Login
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;