import {
  Menu,
  Search,
  ChevronDown,
  Sparkles,
  Activity,
} from "lucide-react";

import { useState } from "react";

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

  const [search, setSearch] =
useState("");

const filteredMembers =
search.trim() === ""
? []
: (members || []).filter((member) =>

member.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);

  const hour = today.getHours();

let greeting = "Good Evening";

if (hour < 12) greeting = "Good Morning";
else if (hour < 17) greeting = "Good Afternoon";

  return (
    <header className="sticky top-0 z-30 mb-8">

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0F172A]/90 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

        {/* Glow */}

        <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative flex items-center justify-between gap-5 px-5 md:px-7 py-3.5">

          {/* Left */}

          <div className="flex items-center gap-4">

            {/* Sidebar Button */}

            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10">

              <Menu
                size={20}
                className="text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400"
              />
            </button>

            {/* Title */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1">

                  <Sparkles
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                    {gymName}
                  </span>

                </div>

                <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">

                  <Activity
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-xs font-semibold text-emerald-300">
                    Live Dashboard
                  </span>

                </div>

              </div>

              <h1 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-white">
                {greeting}, {ownerName} 👋
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Welcome back to GymOS. Manage members, attendance,
                payments and daily operations from one dashboard.
              </p>

            </div>

          </div>

                    {/* Right */}

          <div className="flex flex-wrap items-center justify-end gap-4">

            {/* Search */}

            <div className="relative hidden lg:block w-80">

<div className="flex items-center h-11 rounded-2xl border border-white/10 bg-slate-900/70 px-4">

<Search
size={18}
className="text-slate-500"
/>

<input
type="text"
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
placeholder="Search members..."
className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
/>

</div>

{filteredMembers.length > 0 && (

<div className="absolute mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl z-50">

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
className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-cyan-500/10"
>

<img
src={
member.photo ||
"https://ui-avatars.com/api/?name="+member.name
}
alt=""
className="h-10 w-10 rounded-full object-cover"
/>

<div>

<h4 className="text-sm font-semibold text-white">

{member.name}

</h4>

<p className="text-xs text-slate-400">

{member.phone}

</p>

</div>

</button>

))}

</div>

)}

{search.length > 0 &&
filteredMembers.length === 0 && (

<div className="absolute mt-2 w-full rounded-2xl border border-white/10 bg-[#0F172A] p-5 text-center text-sm text-slate-400 shadow-2xl">

No member found

</div>

)}

</div>

            {/* Date Card */}

            <div className="hidden xl:block rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-3">

              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">

                Today

              </p>

              <p className="mt-1 text-sm font-semibold text-white">

                {formattedDate}

              </p>

            </div>

            {/* Owner */}

            <button
onClick={() => {
  if (setPage) {
    setPage("owner-profile");
  }
}}
className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-1.5 pl-2 pr-3 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
>

{ownerPhoto ? (

<img
src={
  ownerPhoto
    ? ownerPhoto
    : `https://ui-avatars.com/api/?background=06B6D4&color=fff&name=${encodeURIComponent(ownerName)}`
}
alt={ownerName}
className="h-11 w-11 rounded-xl object-cover"
/>

) : (

<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 text-sm font-black text-white">

{ownerName
.split(" ")
.map(word => word[0])
.slice(0,2)
.join("")
.toUpperCase()}

</div>

)}

<div className="hidden md:block text-left">

<h3 className="text-sm font-bold text-white">

{ownerName}

</h3>

<p className="text-xs text-slate-400">

Gym Owner

</p>

</div>

<ChevronDown
size={16}
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