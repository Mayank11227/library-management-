"use client";

import { Search, Atom, Cpu, History, Dna } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const books = [
  {
    title: "Principles of Astrophysics",
    author: "Dr. Stephen Thorne • Shelf B-09",
    status: "Available",
    icon: Atom,
    color: "text-emerald border-emerald/20 bg-emerald/10",
    glow: "group-hover:border-emerald/50"
  },
  {
    title: "Micro-Architecture 2026",
    author: "Tech Council • Shelf E-12",
    status: "New Arrival",
    icon: Cpu,
    color: "text-violet border-violet/20 bg-violet/10",
    glow: "group-hover:border-violet/50"
  },
  {
    title: "Modern Indian History",
    author: "Prof. Amit Ray • Shelf H-01",
    status: "Available",
    icon: History,
    color: "text-primary border-primary/20 bg-primary/10",
    glow: "group-hover:border-primary/50"
  },
  {
    title: "Gene Editing & Ethics",
    author: "Sarah Jennings • Shelf M-22",
    status: "Reserved",
    icon: Dna,
    color: "text-orange-400 border-orange-400/20 bg-orange-400/10",
    glow: "group-hover:border-orange-400/50"
  }
];

export const CatalogBrowser = () => {
  return (
    <section id="catalog" className="py-32 px-6 lg:px-20 relative">
      {/* Blueprint Grid background in Next.js will be handled by the layout, but we can ensure it here too */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Filter & Search */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Real-Time Access</span>
              <h2 className="text-4xl font-bold text-white leading-tight">Explore the <br /> <span className="text-gradient-nasa">Digital Stacks</span></h2>
              <p className="text-slate-400 text-sm max-w-sm">Search across 50,000+ scientific and academic titles with zero latency.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, author, or ISBN..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-medium text-white placeholder:text-slate-600"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary/80 transition-colors px-4 rounded-lg font-bold text-[10px] text-navy-deep tracking-widest uppercase">Search</button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-widest">Science</button>
              {["Fiction", "History", "Technology", "Arts", "Biography"].map(cat => (
                <button key={cat} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">{cat}</button>
              ))}
            </div>
          </div>

          {/* Right: Book List */}
          <div className="lg:col-span-8 space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {books.map((book, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl glass border-white/5 hover:border-primary/30 hover:bg-white/[0.04] transition-all group">
                <div className={cn("w-16 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/10 shadow-xl transition-all", book.glow)}>
                  <book.icon className="w-8 h-8 text-slate-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{book.title}</h4>
                  <p className="text-[11px] text-slate-500 tracking-wider uppercase font-mono italic">{book.author}</p>
                </div>
                <span className={cn("px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.1em]", book.color)}>
                  {book.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
