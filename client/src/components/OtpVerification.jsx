import { useEffect, useRef, useState } from "react";

import {
  verifyOTP,
  resendOTP,
} from "../services/userService";

import {
  ShieldCheck,
  RotateCw,
} from "lucide-react";

function OtpVerification({
  email,
  setIsLoggedIn,
}) {
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [timer, setTimer] =
    useState(60);

  const [error, setError] =
    useState("");

  const inputRefs = useRef([]);

useEffect(() => {
  inputRefs.current[0]?.focus();
}, []);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
    // ==========================
  // OTP Input Logic
  // ==========================

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOTP = [...otp];
    updatedOTP[index] = value;

    setOtp(updatedOTP);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pasted)) return;

    const values = pasted.split("");

    setOtp(values);

    inputRefs.current[5]?.focus();
  };

  // ==========================
  // Verify OTP
  // ==========================

  const handleVerify = async () => {

    if (loading) return;
    
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter complete OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await verifyOTP(
  email,
  enteredOTP
);


      localStorage.setItem(
  "token",
  response.token
);

localStorage.setItem(
  "owner",
  JSON.stringify(response.user)
);

      setOtp(["", "", "", "", "", ""]);

      setIsLoggedIn(true);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "OTP Verification Failed"
      );

      setOtp(["", "", "", "", "", ""]);
inputRefs.current[0]?.focus();

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Resend OTP
  // ==========================

  const handleResend = async () => {

    if (resending) return;

    try {
      setResending(true);
      setError("");

      await resendOTP(email);

      setOtp(["", "", "", "", "", ""]);
setError("");

setTimer(60);

setTimeout(() => {
  inputRefs.current[0]?.focus();
}, 100);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  const formatTime = () => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

  return (
  <div className="relative min-h-screen overflow-hidden bg-[#09090B] flex items-center justify-center px-6">

    {/* Background Glow */}

    <div className="absolute -top-52 -left-52 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

    <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[130px]" />

    {/* Card */}

    <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">

      {/* Logo */}

      <div className="flex justify-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">

          <ShieldCheck
            size={30}
            className="text-white"
          />

        </div>

      </div>

      {/* Heading */}

      <h1 className="mt-6 text-center text-3xl font-bold text-white">
        Verify Email
      </h1>

      <p className="mt-3 text-center text-slate-400 leading-7">
        Enter the 6-digit verification code sent to
      </p>

      <p className="mt-1 text-center font-semibold text-cyan-400 break-all">
        {email}
      </p>

      {/* OTP Boxes */}

      <div
  className="mt-8 flex justify-between gap-2"
  onPaste={handlePaste}
>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) =>
              (inputRefs.current[index] = el)
            }
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) =>
              handleChange(
                e.target.value,
                index
              )
            }
            onKeyDown={(e) => {
  handleKeyDown(e, index);

  if (e.key === "Enter") {
    handleVerify();
  }
}}

          className="h-14 w-12 rounded-xl border border-white/10 bg-[#111113] text-center text-2xl font-bold text-white outline-none transition-all duration-300 focus:scale-105 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
          />
        ))}
      </div>

      {/* Error */}

      {error && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Verify Button */}

      <button
        onClick={handleVerify}
        disabled={
  loading ||
  resending ||
  otp.join("").length !== 6
}

        className="mt-8 flex w-full items-center justify-center rounded-xl bg-white py-3.5 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-black"></div>
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* Countdown */}

      <div className="mt-6 text-center">

        {timer > 0 ? (
          <p className="text-sm text-slate-400">
            Resend OTP in{" "}
            <span className="font-semibold text-cyan-400">
              {formatTime()}
            </span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition hover:text-cyan-300 disabled:opacity-60"
          >
            <RotateCw
  size={16}
  className={resending ? "animate-spin" : ""}
/>

            {resending
              ? "Sending..."
              : "Resend OTP"}
          </button>
        )}

      </div>

    </div>

  </div>
);
}

export default OtpVerification;