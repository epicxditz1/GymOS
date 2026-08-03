import {
  Menu,
  Search,
  ChevronDown,
  Building2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

function Topbar({
  setSidebarOpen,
  setPage,
  members,
  setSelectedMember,
})

{
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const owner =
  JSON.parse(
    localStorage.getItem("owner")
  ) || {};

const ownerName =
  owner.name ||
  owner.ownerName ||
  "Owner";

const ownerPhoto =
  owner.photo ||
  owner.gymLogo ||
  "";

const gymName =
  owner.gymName ||
  "GymOS";

  const [search, setSearch] = useState("");

const searchContainerRef = useRef(null);

const searchRef = useRef(null);

const query = search.trim().toLowerCase();

const filteredMembers =
query === ""
  ? []
  : (members || [])
      .filter((member) =>
        member.name.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.name.localeCompare(b.name);
      });

const pages = [
  {
    title: "Dashboard",
    page: "dashboard",
    icon: "🏠",
  },
  {
    title: "Add Member",
    page: "add-member",
    icon: "➕",
  },
  {
    title: "View Members",
    page: "view-members",
    icon: "👥",
  },
  {
    title: "Fees",
    page: "fees",
    icon: "💰",
  },
  {
    title: "Attendance",
    page: "attendance",
    icon: "📅",
  },
  {
    title: "Owner Profile",
    page: "owner-profile",
    icon: "👤",
  },
];


const filteredPages =
query === ""
  ? []
  : pages
      .filter((page) =>
        page.title.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(query);
        const bStarts = b.title.toLowerCase().startsWith(query);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.title.localeCompare(b.title);
      });

      useEffect(() => {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchRef.current?.focus();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setSearch("");
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  const hour = today.getHours();

let greeting = "Good Evening";

if (hour < 12) greeting = "Good Morning";
else if (hour < 17) greeting = "Good Afternoon";

  return (
   <header className="sticky top-0 z-[100] mb-6 pt-5">
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-xl">
        {/* Glow */}

        <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative flex h-[72px] items-center justify-between px-6">
          {/* Left */}

          <div className="flex items-center gap-4">

            {/* Sidebar Button */}

            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10">

              <Menu
                size={20}
                className="text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400"
              />
            </button>

            {/* Title */}

            <div className="flex items-center gap-3">

  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

    <Building2
      size={20}
      className="text-cyan-400"
    />

  </div>

  <div>

    <h2 className="text-base font-bold text-white">
      {gymName}
    </h2>

    <p className="text-xs text-slate-400">
      Premium Gym Dashboard
    </p>

  </div>

</div>

          </div>

                    {/* Right */}

          <div className="flex items-center gap-3">

            {/* Search */}

            <div
  ref={searchContainerRef}
  className="relative hidden xl:block w-[360px]"
>

<div className="group flex h-11 items-center rounded-2xl border border-white/10 bg-slate-900/60 px-4 transition-all duration-300 focus-within:scale-[1.02] focus-within:border-cyan-500/50 focus-within:bg-slate-900 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.18)]">

<Search
size={16}
className="text-slate-500 shrink-0"
/>

<input
ref={searchRef}
type="text"
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search members, pages, settings..."
className="ml-2 w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
/>

<div className="hidden xl:flex items-center gap-1 rounded-lg border border-white/10 bg-slate-800/80 px-2.5 py-1">

  <kbd className="text-[10px] font-semibold text-slate-400">
    Ctrl
  </kbd>

  <span className="text-[9px] text-slate-600">
    +
  </span>

  <kbd className="text-[10px] font-semibold text-slate-400">
    K
  </kbd>

</div>

</div>

{(filteredPages.length > 0 ||
filteredMembers.length > 0) && (

<div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0F172A] shadow-2xl z-[999]">

{filteredPages.length > 0 && (

<>

<div className="border-b border-white/10 px-4 py-2">

<div className="flex items-center justify-between">

  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
    Quick Actions
  </p>

  <span className="text-[10px] text-slate-500">
    {filteredPages.length}
  </span>

</div>

</div>

{filteredPages.map((item) => (

<button
key={item.page}
onClick={() => {
  setPage(item.page);
  setSearch("");
}}
className="group flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition-all duration-200 hover:bg-cyan-500/10 hover:pl-5"
>

<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-cyan-500/20">

{item.icon}

</div>

<div className="flex flex-1 items-center justify-between">

  <div>

    <h4 className="text-sm font-semibold text-white">
      {item.title}
    </h4>

    <p className="text-xs text-slate-400">
      Open page
    </p>

  </div>

  <span className="translate-x-2 opacity-0 text-slate-500 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
    →
  </span>

</div>

</button>

))}

</>

)}

{filteredMembers.length > 0 && (

  <div className="border-b border-white/10 px-4 py-2">

    <div className="flex items-center justify-between">

  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
    Members
  </p>

  <span className="text-[10px] text-slate-500">
    {filteredMembers.length}
  </span>

</div>

  </div>

)}

{filteredMembers
.slice(0,6)
.map((member)=>(

<button
key={member._id}
onClick={()=>{
setSelectedMember(member);
setPage("member-profile");
setSearch("");
}}
className="group flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition-all duration-200 hover:bg-cyan-500/10 hover:pl-5">

<img
src={
member.photo ||
`https://ui-avatars.com/api/?background=06B6D4&color=fff&name=${encodeURIComponent(member.name)}`
}

alt=""
className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 group-hover:ring-cyan-500/40"
/>

<div className="flex flex-1 items-center justify-between">

  <div>

    <h4 className="text-sm font-semibold text-white">
      {member.name}
    </h4>

    <p className="text-xs text-slate-400">
      {member.phone}
    </p>

  </div>

  <span className="translate-x-2 opacity-0 text-slate-500 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
    →
  </span>

</div>

</button>

))}

</div>

)}

{search.length > 0 &&
filteredMembers.length === 0 && (

<div className="absolute mt-2 w-full rounded-2xl border border-white/10 bg-[#0F172A] p-5 text-center text-sm text-slate-400 shadow-2xl">

<div className="flex flex-col items-center gap-2">

  <span className="text-2xl">🔍</span>

  <p>No pages or members found</p>

</div>

</div>

)}

</div>

            {/* Date Card */}

            <div className="hidden lg:flex items-center rounded-xl border border-white/10 bg-slate-900/60 px-4 h-10">

<p className="text-xs font-semibold text-slate-300">

{formattedDate}

</p>

</div>

            {/* Owner */}

            <button
  onClick={() => setPage?.("owner-profile")}
  className="group flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900/60 px-2 pr-3 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-800/70"
>

{ownerPhoto ? (

<img
src={
  ownerPhoto
    ? ownerPhoto
    : `https://ui-avatars.com/api/?background=06B6D4&color=fff&name=${encodeURIComponent(ownerName)}`
}
alt={ownerName}
className="h-8 w-8 rounded-lg object-cover"
/>

) : (

<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 text-xs font-black text-white">

{ownerName
.split(" ")
.map(word => word[0])
.slice(0,2)
.join("")
.toUpperCase()}

</div>

)}

<div className="hidden md:block text-left">

<h3 className="text-sm font-semibold leading-none text-white">
{ownerName}

</h3>

<p className="text-[11px] text-slate-500">
Owner
</p>

</div>

<ChevronDown
size={14}
className="hidden md:block text-slate-500 transition-transform duration-300 group-hover:rotate-180"
/>

</button>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;