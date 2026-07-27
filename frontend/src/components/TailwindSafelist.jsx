// src/components/TailwindSafelist.jsx
import React from 'react';

const TailwindSafelist = () => {
  return (
    <div className="hidden" aria-hidden="true">
      {/* Background 100s */}
      <div className="bg-red-100 bg-orange-100 bg-yellow-100 bg-lime-100 bg-green-100 bg-teal-100 bg-sky-100 bg-blue-100 bg-violet-100 bg-purple-100 bg-fuchsia-100 bg-pink-100 bg-rose-100 bg-slate-100 bg-zinc-100 bg-stone-100 bg-amber-100 bg-cyan-100 bg-emerald-100 bg-indigo-100" />
      
      {/* Background 300s */}
      <div className="bg-red-300 bg-orange-300 bg-yellow-300 bg-lime-300 bg-green-300 bg-teal-300 bg-sky-300 bg-blue-300 bg-violet-300 bg-purple-300 bg-fuchsia-300 bg-pink-300 bg-rose-300 bg-slate-300 bg-zinc-300 bg-stone-300 bg-amber-300 bg-cyan-300 bg-emerald-300 bg-indigo-300" />
      
      {/* Border 300s */}
      <div className="border-red-300 border-orange-300 border-yellow-300 border-lime-300 border-green-300 border-teal-300 border-sky-300 border-blue-300 border-violet-300 border-purple-300 border-fuchsia-300 border-pink-300 border-rose-300 border-slate-300 border-zinc-300 border-stone-300 border-amber-300 border-cyan-300 border-emerald-300 border-indigo-300" />
    </div>
  );
};

export default TailwindSafelist;