import {
  ArrowLeft,
  Camera,
  User,
  Calendar,
  Phone,
  CreditCard,
  IndianRupee,
} from "lucide-react";

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
  setPage,
}) {
  const preview =
    photo instanceof File
      ? URL.createObjectURL(photo)
      : photo;

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* Background Glow */}

      <div className="absolute top-[-180px] right-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">

              {isEditing
                ? "Edit Member"
                : "Add New Member"}

            </h1>

            <p className="mt-2 text-slate-400">

              Register a new gym member.

            </p>

          </div>

          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-5 py-3 transition hover:border-cyan-500"
          >

            <ArrowLeft size={18} />

            Dashboard

          </button>

        </div>

        {/* Form Card */}

        <div className="rounded-3xl border border-slate-800 bg-[#0F172A]/95 p-8">

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left */}

            <div>

              <h2 className="text-xl font-bold mb-6">

                Profile Photo

              </h2>

              <label className="cursor-pointer block">

                <div className="h-64 rounded-3xl border-2 border-dashed border-slate-700 hover:border-cyan-500 transition flex items-center justify-center overflow-hidden">

                  {preview ? (

                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="text-center">

                      <Camera
                        size={44}
                        className="mx-auto text-cyan-400"
                      />

                      <p className="mt-4 text-slate-400">

                        Upload Photo

                      </p>

                    </div>

                  )}

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

            </div>

            {/* Right */}

            <div className="lg:col-span-2">

              <h2 className="text-xl font-bold mb-6">

                Member Details

              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Name */}

                <div>

                  <label className="mb-2 block text-sm text-slate-400">

                    Full Name

                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter Name"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none focus:border-cyan-500"
                    />

                  </div>

                </div>

                {/* Age */}

                <div>

                  <label className="mb-2 block text-sm text-slate-400">

                    Age

                  </label>

                  <input
                    type="number"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value)
                    }
                    placeholder="Enter Age"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-500"
                  />

                </div>
                                {/* Phone */}

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="Enter Phone Number"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none focus:border-cyan-500"
                    />

                  </div>

                </div>

                {/* Membership */}

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Membership Plan
                  </label>

                  <div className="relative">

                    <CreditCard
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <select
                      value={membership}
                      onChange={(e) =>
                        setMembership(e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none focus:border-cyan-500"
                    >
                      <option value="">
                        Select Membership
                      </option>

                      <option value="1 Month">
                        1 Month
                      </option>

                      <option value="3 Months">
                        3 Months
                      </option>

                      <option value="6 Months">
                        6 Months
                      </option>

                      <option value="12 Months">
                        12 Months
                      </option>

                    </select>

                  </div>

                </div>

                {/* Join Date */}

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Join Date
                  </label>

                  <div className="relative">

                    <Calendar
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="date"
                      value={joinDate}
                      onChange={(e) =>
                        setJoinDate(e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none focus:border-cyan-500"
                    />

                  </div>

                </div>

                {/* Fees */}

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Membership Fees
                  </label>

                  <div className="relative">

                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="number"
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value)
                      }
                      placeholder="Enter Amount"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none focus:border-cyan-500"
                    />

                  </div>

                </div>

                {/* Payment Status */}

                <div className="md:col-span-2">

                  <label className="mb-3 block text-sm text-slate-400">
                    Payment Status
                  </label>

                  <div className="flex gap-4">

                    <button
                      type="button"
                      onClick={() => setStatus("Paid")}
                      className={`flex-1 rounded-2xl py-3 font-semibold transition ${
                        status === "Paid"
                          ? "bg-emerald-500 text-white"
                          : "border border-slate-700 bg-slate-900 text-slate-400 hover:border-emerald-500"
                      }`}
                    >
                      ✅ Paid
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatus("Unpaid")}
                      className={`flex-1 rounded-2xl py-3 font-semibold transition ${
                        status === "Unpaid"
                          ? "bg-red-500 text-white"
                          : "border border-slate-700 bg-slate-900 text-slate-400 hover:border-red-500"
                      }`}
                    >
                      ❌ Unpaid
                    </button>

                  </div>

                </div>
                              </div>

              {/* Action Buttons */}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setPage("home")}
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveMember}
                  className="rounded-2xl bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/20"
                >
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