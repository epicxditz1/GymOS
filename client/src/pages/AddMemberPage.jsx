import {
  ArrowLeft,
  Camera,
  User,
  Calendar,
  Phone,
  CreditCard,
  IndianRupee,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function AddMemberPage({
  name,
  setName,
  age,
  setAge,
  membership,
  setMembership,
  phone,
  setPhone,
  joinDate,
  setJoinDate,
  amount,
  setAmount,
  status,
  setStatus,
  photo,
  setPhoto,
  isEditing,
  saveMember,

}) {
  const preview =
    photo instanceof File
      ? URL.createObjectURL(photo)
      : photo;
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

              <Sparkles
                size={15}
                className="text-cyan-300"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                GymOS Premium
              </span>

            </div>

            <h1 className="text-5xl font-black tracking-tight">

              {isEditing
                ? "Edit Member"
                : "Add New Member"}

            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

              Register members, upload profile photo,
              assign membership and manage payments —
              all from one beautiful workspace.

            </p>

          </div>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
          >

            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </button>

        </div>

        {/* Form */}

        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

          {/* Top Strip */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-8 py-6">

            <div>

              <h2 className="text-2xl font-bold">

                Member Registration

              </h2>

              <p className="mt-2 text-slate-400">

                Complete all required information below.

              </p>

            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3">

              <ShieldCheck
                size={20}
                className="text-emerald-400"
              />

              <div>

                <p className="text-xs uppercase tracking-widest text-emerald-300">
                  Secure
                </p>

                <p className="text-sm font-semibold text-white">
                  Auto Saved Form
                </p>

              </div>

            </div>

          </div>

          <div className="grid gap-10 p-8 lg:grid-cols-3">

                      {/* LEFT COLUMN */}

            <div>

              <div className="sticky top-8">

                <h3 className="text-xl font-bold">
                  Profile Photo
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Upload a clear member profile photo.
                  This will be used across GymOS.
                </p>

                <label className="group mt-8 block cursor-pointer">

                  <div className="relative overflow-hidden rounded-[30px] border-2 border-dashed border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

                    {preview ? (

                      <img
                        src={preview}
                        alt="Preview"
                        className="h-[340px] w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-[340px] flex-col items-center justify-center">

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10">

                          <Camera
                            size={36}
                            className="text-cyan-400"
                          />

                        </div>

                        <h4 className="mt-6 text-xl font-semibold">
                          Upload Photo
                        </h4>

                        <p className="mt-2 max-w-xs text-center text-sm leading-6 text-slate-400">
                          Drag & drop or click here to
                          upload a member profile image.
                        </p>

                      </div>

                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  </div>

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setPhoto(e.target.files[0])
                    }
                  />

                </label>

                {/* Live Preview */}

                <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6">

                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                    Live Preview
                  </p>

                  <div className="mt-6 flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-cyan-500/10">

                      {preview ? (

                        <img
                          src={preview}
                          alt=""
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <User
                          size={28}
                          className="text-cyan-400"
                        />

                      )}

                    </div>

                    <div>

                      <h4 className="text-lg font-bold">
                        {name || "Member Name"}
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        {membership || "No Plan Selected"}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 space-y-3 text-sm">

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Phone
                      </span>

                      <span>
                        {phone || "--"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Status
                      </span>

                      <span
                        className={
                          status === "Paid"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      >
                        {status || "--"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Fees
                      </span>

                      <span>
                        ₹{amount || "0"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

                        {/* RIGHT COLUMN */}

            <div className="lg:col-span-2">

              <h3 className="text-2xl font-bold">
                Personal Information
              </h3>

              <p className="mt-2 text-slate-400">
                Fill the member details below.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                {/* Name */}

                <div>

                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter member name"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                    />

                  </div>

                </div>

                {/* Age */}

                <div>

                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Age
                  </label>

                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                  />

                </div>

                {/* Phone */}

                <div>

                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                    />

                  </div>

                </div>

                {/* Membership */}

                <div>

                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Membership Plan
                  </label>

                  <div className="relative">

                    <CreditCard
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <select
                      value={membership}
                      onChange={(e) => setMembership(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 outline-none transition-all duration-300 focus:border-cyan-500 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                    >
                      <option value="">Select Membership</option>
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                    </select>

                  </div>

                </div>

                {/* Join Date */}

                <div>

                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Join Date
                  </label>

                  <div className="relative">

                    <Calendar
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                      type="date"
                      value={joinDate}
                      onChange={(e) => setJoinDate(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 outline-none transition-all duration-300 focus:border-cyan-500 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                    />

                  </div>

                </div>

                {/* Fees */}

                <div>

                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Membership Fees
                  </label>

                  <div className="relative">

                    <IndianRupee
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter fees"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                    />

                  </div>

                </div>
                  
                  {/* Payment Status */}

                <div className="md:col-span-2">

                  <label className="mb-4 block text-sm font-medium text-slate-400">
                    Payment Status
                  </label>

                  <div className="grid grid-cols-2 gap-5">

                    <button
                      type="button"
                      onClick={() => setStatus("Paid")}
                      className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                        status === "Paid"
                          ? "border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20"
                          : "border-white/10 bg-white/[0.04] hover:border-emerald-500/40"
                      }`}
                    >
                      <h4 className="text-lg font-bold text-emerald-400">
                        ✅ Paid
                      </h4>

                      <p className="mt-2 text-sm text-slate-400">
                        Payment received
                      </p>

                    </button>

                    <button
                      type="button"
                      onClick={() => setStatus("Unpaid")}
                      className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                        status === "Unpaid"
                          ? "border-red-500 bg-red-500/20 shadow-lg shadow-red-500/20"
                          : "border-white/10 bg-white/[0.04] hover:border-red-500/40"
                      }`}
                    >
                      <h4 className="text-lg font-bold text-red-400">
                        ❌ Unpaid
                      </h4>

                      <p className="mt-2 text-sm text-slate-400">
                        Payment pending
                      </p>

                    </button>

                  </div>

                </div>

              </div>

                            {/* Action Buttons */}

              <div className="mt-12 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="group h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-8 font-semibold text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveMember}
                  className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-10 font-bold text-white shadow-[0_10px_35px_rgba(34,211,238,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(34,211,238,0.45)]"
                >
                  <Camera
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />

                  {isEditing
                    ? "Update Member"
                    : "Save Member"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddMemberPage;