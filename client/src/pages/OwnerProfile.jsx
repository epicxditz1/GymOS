import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import {
  getOwnerProfile,
  updateOwnerProfile,
} from "../services/userService";

function OwnerProfile() {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gymName: "",
    ownerName: "",
    phone: "",
    gymAddress: "",
    gymLogo: null,
  });

  useEffect(() => {
    loadOwner();
  }, []);

  async function loadOwner() {
    try {
      const data = await getOwnerProfile();

      setOwner(data);

      setFormData({
        gymName: data.gymName || "",
        ownerName: data.ownerName || "",
        phone: data.phone || "",
        gymAddress: data.gymAddress || "",
        gymLogo: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load owner profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const data = new FormData();

data.append("gymName", formData.gymName);
data.append("ownerName", formData.ownerName);
data.append("phone", formData.phone);
data.append("gymAddress", formData.gymAddress);

if (formData.gymLogo) {
  data.append("gymLogo", formData.gymLogo);
}

const response = await updateOwnerProfile(data);
      console.log(response.user);

      setOwner(response.user);

      localStorage.setItem(
  "owner",
  JSON.stringify({
    name: response.user.ownerName,
    gymName: response.user.gymName,
    photo: response.user.gymLogo,
    email: response.user.email,
    phone: response.user.phone,
  })
);

      setFormData({
        gymName: response.user.gymName,
        ownerName: response.user.ownerName,
        phone: response.user.phone,
        gymAddress: response.user.gymAddress,
        gymLogo: null,
      });

      toast.success("Profile Updated Successfully");

      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        Loading Profile...
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#020617] text-white p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition mb-8"
      >
        <ArrowLeft size={20} />
      
      </button>

      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#0F172A]/90 backdrop-blur-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-6">

            <div className="h-24 w-24 rounded-full bg-cyan-500/20 overflow-hidden flex items-center justify-center">

              {owner?.gymLogo ? (
                <img
                  src={owner.gymLogo}
                  alt="Gym Logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={42} className="text-cyan-400" />
              )}

            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {owner?.ownerName}
              </h1>

              <p className="text-cyan-400 mt-2">
                Owner • {owner?.gymName}
              </p>
            </div>

          </div>

          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold hover:bg-cyan-600 transition"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

        </div>
      </div>

      <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("owner");
    window.location.reload();
  }}
  className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
>
  <LogOut size={18} />
  Logout
</button>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* Gym Info */}
        <div className="rounded-3xl border border-white/10 bg-[#0F172A]/90 p-8">

          <h2 className="text-2xl font-bold mb-8">
             Gym Information
          </h2>

          <div className="space-y-6">

            <div className="flex gap-4">
              <Building2 className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Gym Name</p>
                <p className="text-xl font-semibold">
                  {owner?.gymName}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Address</p>
                <p className="text-xl font-semibold">
                  {owner?.gymAddress}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Owner Info */}
        <div className="rounded-3xl border border-white/10 bg-[#0F172A]/90 p-8">

          <h2 className="text-2xl font-bold mb-8">
             Owner Information
          </h2>

          <div className="space-y-6">

            <div className="flex gap-4">
              <User className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Owner Name</p>
                <p className="text-xl font-semibold">
                  {owner?.ownerName}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-xl font-semibold">
                  {owner?.email}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-xl font-semibold">
                  {owner?.phone}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Account */}
        <div className="rounded-3xl border border-white/10 bg-[#0F172A]/90 p-8 md:col-span-2">

          <h2 className="text-2xl font-bold mb-8">
             Account Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-slate-800 p-5">
              <Calendar className="text-cyan-400 mb-3" />
              <p className="text-slate-400 text-sm">
                Member Since
              </p>
              <p className="font-semibold mt-1">
                {owner?.createdAt
                  ? new Date(owner.createdAt).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <ShieldCheck className="text-green-400 mb-3" />
              <p className="text-slate-400 text-sm">
                Status
              </p>
              <p className="font-semibold text-green-400 mt-1">
                Active
              </p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <User className="text-cyan-400 mb-3" />
              <p className="text-slate-400 text-sm">
                User ID
              </p>
              <p className="font-semibold mt-1">
                {owner?._id?.slice(-8)}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

          <div className="bg-[#0F172A] rounded-3xl w-full max-w-xl p-8 border border-white/10">

            <h2 className="text-3xl font-bold mb-6">
              Edit Profile
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={formData.gymName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gymName: e.target.value,
                  })
                }
                placeholder="Gym Name"
                className="w-full bg-slate-800 rounded-xl p-3 outline-none"
              />

              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerName: e.target.value,
                  })
                }
                placeholder="Owner Name"
                className="w-full bg-slate-800 rounded-xl p-3 outline-none"
              />

              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
                className="w-full bg-slate-800 rounded-xl p-3 outline-none"
              />

              <textarea
                rows={3}
                value={formData.gymAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gymAddress: e.target.value,
                  })
                }
                placeholder="Gym Address"
                className="w-full bg-slate-800 rounded-xl p-3 outline-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gymLogo: e.target.files[0],
                  })
                }
                className="w-full"
              />

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={() => setEditing(false)}
                className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default OwnerProfile;