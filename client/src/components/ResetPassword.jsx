import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../services/api";

function ResetPassword({
  email,
  goToLogin,
}) {
  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleResetPassword() {
    if (!password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/users/reset-password",
        {
          email,
          password,
        }
      );

      alert("Password Reset Successfully");

      goToLogin();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to reset password"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0F172A] p-10">

        <h1 className="text-3xl font-bold text-center text-white">
          Reset Password
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Create a new password
        </p>

        <div className="relative mt-8">

          <Lock
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-11 pr-12 py-3 text-white outline-none focus:border-cyan-500"
          />

          <button
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-4 text-slate-400"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        <div className="relative mt-5">

          <Lock
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-11 pr-12 py-3 text-white outline-none focus:border-cyan-500"
          />

          <button
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-4 text-slate-400"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600"
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>

      </div>

    </div>
  );
}

export default ResetPassword;