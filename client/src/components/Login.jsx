import { useState } from "react";
import {
  Eye,
  EyeOff,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import api from "../services/api";

function Login({ setIsLoggedIn, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);


      const response = await api.post(
        "/users/login",
        {
          email,
          password,
        }
      );

      console.log("Full Response:", response.data);
console.log("Token:", response.data.token);
console.log("User:", response.data.user);

      localStorage.setItem(
  "token",
  response.data.token
);

if (response.data.user) {
  localStorage.setItem(
    "owner",
    JSON.stringify(response.data.user)
  );
}

console.log("Token:", response.data.token);
console.log("User:", response.data.user);

setIsLoggedIn(true);

    } catch (err) {
      console.error(err);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] flex items-center justify-center px-6">

      {/* Background Glow */}

      <div className="absolute -top-52 -left-52 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[140px]" />

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-10">

          {/* Logo */}

          <div className="flex justify-center">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">

              <Dumbbell
                size={28}
                className="text-white"
              />

            </div>

          </div>

          {/* Heading */}

          <div className="text-center mt-8">

            <h1 className="text-4xl font-bold text-white tracking-tight">
              GymOS
            </h1>

            <p className="text-slate-400 mt-3 leading-7">
              Welcome back.
              <br />
              Sign in to continue managing
              your gym.
            </p>

          </div>

          {/* Email */}

          <div className="mt-10">

            <label className="text-sm text-slate-400">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
            />

          </div>

          {/* Password */}

          <div className="mt-6">

            <label className="text-sm text-slate-400">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>
                    {/* Options */}

          <div className="mt-6 flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">

              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-[#111113] accent-cyan-500"
              />

              Remember me

            </label>

            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white text-black py-3.5 font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-black"></div>
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          {/* Divider */}

          <div className="my-8 flex items-center">

            <div className="h-px flex-1 bg-white/10"></div>

            <span className="px-4 text-xs uppercase tracking-widest text-slate-500">
              GymOS
            </span>

            <div className="h-px flex-1 bg-white/10"></div>

          </div>

          {/* Signup */}

          <p className="text-center text-slate-400">

            Don't have an account?{" "}

            <button
              onClick={goToSignup}
              className="font-semibold text-white transition hover:text-cyan-400"
            >
              Create Account
            </button>

          </p>

        </div>

        {/* Footer */}

        <p className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} GymOS • Built for modern gyms.
        </p>

      </div>

    </div>
  );
}

export default Login;