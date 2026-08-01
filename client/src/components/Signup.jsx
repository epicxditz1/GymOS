import { useState } from "react";
import {
  Dumbbell,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import api from "../services/api";

function Signup({ goToLogin }) {
  const [gymName, setGymName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {
    if (
      !gymName ||
      !ownerName ||
      !email ||
      !phone ||
      !gymAddress ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/users/signup",
        {
          gymName,
          ownerName,
          email,
          phone,
          gymAddress,
          password,
        }
      );

      alert(response.data.message);

      goToLogin();
    } catch (error) {
      console.error(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] flex items-center justify-center px-6 py-10">

      {/* Background Glow */}

      <div className="absolute -top-48 -left-48 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[130px]" />

      {/* Signup Card */}

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">

            <Dumbbell
              className="text-white"
              size={28}
            />

          </div>

        </div>

        {/* Heading */}

        <div className="mt-6 text-center">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-3 text-slate-400 leading-7">
            Start managing your gym with
            GymOS.
          </p>

        </div>

        {/* Gym Name */}

        <div className="mt-8">

          <label className="text-sm text-slate-400">
            Gym Name
          </label>

          <input
            type="text"
            placeholder="Gym Name"
            value={gymName}
            onChange={(e) =>
              setGymName(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
          />

        </div>

        {/* Owner Name */}

        <div className="mt-5">

          <label className="text-sm text-slate-400">
            Owner Name
          </label>

          <input
            type="text"
            placeholder="Your Name"
            value={ownerName}
            onChange={(e) =>
              setOwnerName(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
          />

        </div>

        {/* Email */}

        <div className="mt-5">

          <label className="text-sm text-slate-400">
            Email Address
          </label>

          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
                {/* Phone */}

        <div className="mt-5">

          <label className="text-sm text-slate-400">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="+91-0000000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
          />

        </div>

        {/* Gym Address */}

        <div className="mt-5">

          <label className="text-sm text-slate-400">
            Gym Address
          </label>

          <textarea
            rows={3}
            placeholder="Enter your gym address"
            value={gymAddress}
            onChange={(e) => setGymAddress(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#111113] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
          />

        </div>

        {/* Password */}

        <div className="mt-5">

          <label className="text-sm text-slate-400">
            Password
          </label>

          <div className="relative mt-2">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-xl border border-white/10 bg-[#111113] px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

        {/* Create Account Button */}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-black"></div>
              Creating Account...
            </>
          ) : (
            <>
              Create Account
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

        {/* Login */}

        <p className="text-center text-slate-400">

          Already have an account?{" "}

          <button
            onClick={goToLogin}
            className="font-semibold text-white transition hover:text-cyan-400"
          >
            Login
          </button>

        </p>

      </div>

      {/* Footer */}

      <p className="mt-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} GymOS • Built for modern gyms.
      </p>

    </div>


  );
}

export default Signup;