import { useMemo, useState } from "react";
import MembersHeader from "../components/members/MembersHeader";
import MembersSearch from "../components/members/MembersSearch";
import MembersFilters from "../components/members/MembersFilters";
import MembersGrid from "../components/members/MembersGrid";

function MembersPage({
  members,
  setPage,
  setSelectedMember,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMembers = useMemo(() => {
    const totalMembers = members.length;

const activeMembers = members.filter((member) => {
  return new Date(member.expiryDate) >= new Date();
}).length;

const expiredMembers = totalMembers - activeMembers;

const expiringSoonMembers = members.filter((member) => {
  const expiry = new Date(member.expiryDate);
  const today = new Date();

  const diff =
    (expiry - today) / (1000 * 60 * 60 * 24);

  return diff >= 0 && diff <= 7;
}).length;
    return members.filter((member) => {
      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.phone.includes(search);

      const isExpired =
        new Date(member.expiryDate) < new Date();

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Active"
          ? !isExpired
          : isExpired;

      return matchesSearch && matchesFilter;
    });
  }, [members, search, filter]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <MembersHeader setPage={setPage} />

      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
    <p className="text-slate-400">Total Members</p>
    <h2 className="mt-2 text-3xl font-bold">
      {totalMembers}
    </h2>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
    <p className="text-slate-400">Active</p>
    <h2 className="mt-2 text-3xl font-bold text-green-400">
      {activeMembers}
    </h2>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
    <p className="text-slate-400">Expired</p>
    <h2 className="mt-2 text-3xl font-bold text-red-400">
      {expiredMembers}
    </h2>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
    <p className="text-slate-400">
      Expiring Soon
    </p>
    <h2 className="mt-2 text-3xl font-bold text-yellow-400">
      {expiringSoonMembers}
    </h2>
  </div>
</div>

      <MembersSearch
        search={search}
        setSearch={setSearch}
      />

      <MembersFilters
        filter={filter}
        setFilter={setFilter}
      />

      <MembersGrid
        members={filteredMembers}
        setSelectedMember={setSelectedMember}
        setPage={setPage}
      />
    </div>
  );
}

export default MembersPage;