import {
  Search,
  Users,
  Phone,
  Eye,
  Pencil,
  Trash2,
  ArrowLeft,
  BadgeCheck,
  BadgeX,
  UserPlus,
  IndianRupee,
  TriangleAlert,
} from "lucide-react";

import { useState } from "react";

import MemberDetailsModal from "../components/MemberDetailsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function MembersPage({
  members,
  search,
  setSearch,
  setPage,
  statusFilter,
  setStatusFilter,
  deleteMember,
  startEdit,
  selectedMember,
  setSelectedMember,
}) {
  const [showMemberDetails, setShowMemberDetails] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [memberToDelete, setMemberToDelete] =
    useState(null);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      member.phone?.includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paidMembers = members.filter(
    (m) => m.status === "Paid"
  ).length;

  const unpaidMembers = members.filter(
    (m) => m.status === "Unpaid"
  ).length;

  const expiringMembers = members.filter((m) => {
    if (!m.expiryDate) return false;

    const today = new Date();

    const expiry = new Date(m.expiryDate);

    const diff = Math.ceil(
      (expiry - today) /
        (1000 * 60 * 60 * 24)
    );

    return diff >= 0 && diff <= 7;
  }).length;

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <div className="mx-auto max-w-[1600px] px-8 py-8">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              GymOS
            </p>

            <h1 className="mt-2 text-5xl font-black tracking-tight">
              Members
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              Manage all registered gym members from one place.
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => setPage("add-member")}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              <UserPlus size={18} />
              Add Member
            </button>

            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500 hover:bg-white/10"
            >
              <ArrowLeft size={18} />
              Dashboard
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="mb-8 grid grid-cols-2 gap-6 xl:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <Users className="mb-4 text-cyan-400" />

            <h2 className="text-4xl font-bold">
              {members.length}
            </h2>

            <p className="mt-2 text-slate-400">
              Total Members
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <BadgeCheck className="mb-4 text-emerald-400" />

            <h2 className="text-4xl font-bold">
              {paidMembers}
            </h2>

            <p className="mt-2 text-slate-400">
              Paid Members
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <IndianRupee className="mb-4 text-amber-400" />

            <h2 className="text-4xl font-bold">
              {unpaidMembers}
            </h2>

            <p className="mt-2 text-slate-400">
              Pending Fees
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <TriangleAlert className="mb-4 text-violet-400" />

            <h2 className="text-4xl font-bold">
              {expiringMembers}
            </h2>

            <p className="mt-2 text-slate-400">
              Expiring Soon
            </p>

          </div>

        </div>
        {/* Search & Filters */}

<div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

    {/* Search */}

    <div className="relative flex-1">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or phone number..."
        className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-3 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
      />

    </div>

    {/* Filter Pills */}

    <div className="flex flex-wrap gap-3">

      {["All", "Paid", "Unpaid"].map((status) => (

        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
            statusFilter === status
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
              : "border border-white/10 bg-slate-900/60 text-slate-400 hover:border-cyan-500 hover:text-white"
          }`}
        >
          {status}
        </button>

      ))}

    </div>

  </div>

  <div className="mt-6 flex items-center justify-between">

    <div className="flex items-center gap-3">

      <Users
        size={18}
        className="text-cyan-400"
      />

      <span className="text-slate-400">

        Showing

        <span className="mx-2 font-bold text-white">
          {filteredMembers.length}
        </span>

        Members

      </span>

    </div>

  </div>

</div>

{/* Members Grid */}

<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

  {filteredMembers.length === 0 ? (

    <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">

      <Users
        size={64}
        className="mx-auto text-slate-600"
      />

      <h2 className="mt-6 text-3xl font-bold">
        No Members Found
      </h2>

      <p className="mt-3 text-slate-400">
        Try changing your search or add your first member.
      </p>

      <button
        onClick={() => setPage("add-member")}
        className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold transition hover:scale-105"
      >
        Add Member
      </button>

    </div>

  ) : (

    filteredMembers.map((member) => (
      <div
  key={member._id}
  className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10"
>

  {/* Top */}

  <div className="flex items-start justify-between">

    <div className="flex items-center gap-4">

      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-cyan-500/30">

        {member.photo ? (

          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover"
          />

        ) : (

          member.name?.charAt(0).toUpperCase()

        )}

      </div>

      <div>

        <h2 className="text-xl font-bold text-white">
          {member.name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-slate-400">

          <Phone size={15} />

          <span>{member.phone}</span>

        </div>

      </div>

    </div>

    {member.status === "Paid" ? (

      <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">

        <BadgeCheck size={16} />

        Paid

      </span>

    ) : (

      <span className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">

        <BadgeX size={16} />

        Unpaid

      </span>

    )}

  </div>

  {/* Info Cards */}

  <div className="mt-6 grid grid-cols-2 gap-4">

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">

      <p className="text-xs uppercase tracking-widest text-slate-500">
        Membership
      </p>

      <p className="mt-2 text-lg font-semibold text-white">
        {member.membership}
      </p>

    </div>

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">

      <p className="text-xs uppercase tracking-widest text-slate-500">
        Join Date
      </p>

      <p className="mt-2 text-lg font-semibold text-white">
        {member.joinDate}
      </p>

    </div>

  </div>

  {/* Buttons */}

  <div className="mt-6 flex gap-3">

    <button
      onClick={() => {
        setSelectedMember(member);
        setPage("member-profile");
      }}
      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
    >
      <Eye size={18} />
      View
    </button>


    <button
      onClick={() => {
        setMemberToDelete(member);
        setShowDeleteModal(true);
      }}
      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 py-3 font-semibold text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white"
    >
      <Trash2 size={18} />
      Delete
    </button>

  </div>

</div>
    ))
  )}

</div>

</div>

{/* Member Details Modal */}

<MemberDetailsModal
  member={selectedMember}
  show={showMemberDetails}
  onClose={() => setShowMemberDetails(false)}
  onEdit={() => {
    startEdit(selectedMember);
    setShowMemberDetails(false);
  }}
  onDelete={() => {
    if (!selectedMember) return;

    deleteMember(selectedMember._id);

    setShowMemberDetails(false);
  }}
/>

{/* Delete Confirmation Modal */}

<DeleteConfirmationModal
  show={showDeleteModal}
  memberName={memberToDelete?.name}
  onCancel={() => {
    setShowDeleteModal(false);
    setMemberToDelete(null);
  }}
  onConfirm={() => {
    if (!memberToDelete) return;

    deleteMember(memberToDelete._id);

    setShowDeleteModal(false);
    setMemberToDelete(null);
  }}
/>

</div>
);
}

export default MembersPage;