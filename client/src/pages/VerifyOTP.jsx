import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  verifyOTP,
  resendOTP,
} from "../services/userService";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

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
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (
    value,
    index
  ) => {
    if (!/^[0-9]?$/.test(value))
      return;

    const updatedOTP = [...otp];

    updatedOTP[index] = value;

    setOtp(updatedOTP);

    if (
      value &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    if (otp[index] !== "") {
      const updatedOTP = [...otp];
      updatedOTP[index] = "";
      setOtp(updatedOTP);
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }
};

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted =
      e.clipboardData
        .getData("text")
        .trim();

    if (!/^\d{6}$/.test(pasted))
      return;

    const values =
      pasted.split("");

    setOtp(values);

    inputRefs.current[5]?.focus();
  };
    const handleVerify = async () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter complete OTP");
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

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      setError("");

      await resendOTP(email);

      setTimer(60);

      alert("New OTP sent successfully.");

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white">
          Verify Email
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Enter the 6-digit OTP sent to
        </p>

        <p className="text-center font-semibold text-cyan-400 break-all">
          {email}
        </p>

        <div
          className="mt-8 flex justify-between"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) =>
                (inputRefs.current[index] = el)
              }
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              maxLength={1}
              className="h-14 w-12 rounded-xl border border-slate-700 bg-slate-800 text-center text-2xl text-white outline-none focus:border-cyan-500"
            />
          ))}
        </div>

        {error && (
          <p className="mt-4 text-center text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <div className="mt-6 text-center">

          {timer > 0 ? (
            <p className="text-slate-400">
              Resend OTP in{" "}
              <span className="font-bold text-white">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
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

export default VerifyOTP;