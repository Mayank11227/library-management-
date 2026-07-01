"use client";

import {
  Armchair, Lock, CheckCircle, Clock,
  Plus, Edit, Trash2, RefreshCw, Filter,
  Map as MapIcon, Zap, User
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { getSeats, updateSeatStatus } from "@/services/api";

type SeatStatus = "available" | "occupied" | "reserved" | "maintenance" | "blocked";

const floors = ["Ground Floor", "1st Floor", "2nd Floor"];
const sections = ["Section A", "Section B", "Section C", "Section D", "Section E"];

const statusConfig: Record<SeatStatus, { label: string; color: string; bg: string; border: string }> = {
  available:   { label: "Available",   color: "text-emerald-600", bg: "bg-emerald-500",  border: "border-emerald-200" },
  occupied:    { label: "Occupied",    color: "text-red-500",     bg: "bg-red-500",      border: "border-red-200" },
  reserved:    { label: "Reserved",    color: "text-amber-600",   bg: "bg-amber-500",    border: "border-amber-200" },
  maintenance: { label: "Maintenance", color: "text-slate-500",   bg: "bg-slate-400",    border: "border-slate-200" },
  blocked:     { label: "Blocked",     color: "text-violet-600",  bg: "bg-violet-500",   border: "border-violet-200" },
};

function generateSeats(floor: number) {
  const statuses: SeatStatus[] = ["available", "occupied", "reserved", "maintenance", "blocked"];
  return Array.from({ length: 48 }, (_, i) => ({
    id: `${["G","F","S"][floor]}${String(i + 1).padStart(2, "0")}`,
    status: (statuses[Math.floor(Math.abs(Math.sin(i + floor * 10) * 5))] ?? "available") as SeatStatus,
    student: Math.random() > 0.5 ? "Rahul S." : null,
    section: sections[Math.floor(i / 10)],
    type: i < 8 ? "premium" : "standard",
  }));
}

export default function AdminSeats() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [seatsData, setSeatsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await getSeats({ floor: floors[activeFloor] });
      if (response.status === 'success') {
        // Map backend seat_master to frontend format, fallback to generated if empty
        if (response.data && response.data.length > 0) {
           setSeatsData(response.data.map((s: any) => ({
             id: s.id,
             status: s.status,
             student: s.current_student_id ? `Student #${s.current_student_id}` : null,
             section: s.section,
             type: s.type
           })));
        } else {
           setSeatsData(generateSeats(activeFloor)); // fallback for visual testing
        }
      }
    } catch (error) {
      console.error("Failed to fetch seats", error);
      setSeatsData(generateSeats(activeFloor)); // fallback for visual testing
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, [activeFloor]);

  const seats = seatsData.length > 0 ? seatsData : generateSeats(activeFloor);

  const counts = {
    available:   seats.filter(s => s.status === "available").length,
    occupied:    seats.filter(s => s.status === "occupied").length,
    reserved:    seats.filter(s => s.status === "reserved").length,
    maintenance: seats.filter(s => s.status === "maintenance").length,
    blocked:     seats.filter(s => s.status === "blocked").length,
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Seat <span className="text-gold">Management</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Manage all 144 seats across 3 floors and 5 sections in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-xl text-sm font-bold shadow-sm hover:bg-[hsl(var(--background))] hover:text-primary transition-all text-slate-500">
              <Filter className="w-4 h-4" /> Filter Seats
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
              <Plus className="w-4 h-4" /> Add Seat
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(Object.entries(counts) as [SeatStatus, number][]).map(([status, count]) => (
            <PremiumCard key={status} className={cn("p-5 flex items-center gap-4", statusConfig[status].border)}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${statusConfig[status].bg.split('-')[1]}-50`)}>
                <div className={cn("w-3 h-3 rounded-full", statusConfig[status].bg)} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{statusConfig[status].label}</p>
                <p className="text-2xl font-black text-primary">{count}</p>
              </div>
            </PremiumCard>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Seat Map (9 cols) */}
          <div className="xl:col-span-9">
            <PremiumCard className="p-8 space-y-8">
              {/* Floor Selector */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <MapIcon className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-black text-primary">Floor <span className="text-gold">Map</span></h3>
                </div>
                <div className="flex gap-2 p-1.5 bg-[hsl(var(--background))] rounded-2xl">
                  {floors.map((f, i) => (
                    <button key={f} onClick={() => { setActiveFloor(i); setSelected(null); }}
                      className={cn("px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeFloor === i ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
                      )}>{f}</button>
                  ))}
                </div>
                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4">
                  {(Object.entries(statusConfig) as [SeatStatus, typeof statusConfig[SeatStatus]][]).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-1.5">
                      <div className={cn("w-2.5 h-2.5 rounded-full", v.bg)} />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="relative p-8 bg-[hsl(var(--background))] rounded-[32px] border border-border">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white border border-border rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                  <MapIcon className="w-3 h-3" /> Entrance (North)
                </div>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 pt-8">
                  {seats.map((seat) => {
                    const cfg = statusConfig[seat.status as SeatStatus] || statusConfig["available"];
                    const isSelected = selected === seat.id;
                    return (
                      <button
                        key={seat.id}
                        onClick={() => setSelected(isSelected ? null : seat.id)}
                        className={cn(
                          "aspect-square rounded-2xl flex flex-col items-center justify-center gap-0.5 border-2 transition-all relative group bg-white border-border hover:border-gold hover:shadow-md cursor-pointer",
                          seat.status === "occupied"    ? "opacity-70" : "",
                          seat.status === "available"   ? "" : "",
                          seat.status === "reserved"    ? "opacity-80" : "",
                          seat.status === "maintenance" ? "opacity-40 cursor-not-allowed" : "",
                          seat.status === "blocked"     ? "opacity-40 cursor-not-allowed" : "",
                          isSelected ? "!border-gold !bg-gold text-white scale-110 shadow-xl shadow-gold/30" : "",
                        )}
                      >
                        <Armchair className={cn("w-4 h-4", isSelected ? "text-white" : cfg.color)} />
                        <span className={cn("text-[7px] font-black leading-none", isSelected ? "text-white" : "text-slate-400")}>{seat.id}</span>
                        {seat.type === "premium" && !isSelected && (
                          <Zap className="absolute -top-1.5 -right-1.5 w-3 h-3 text-gold fill-gold" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Seat Detail Panel (3 cols) */}
          <div className="xl:col-span-3 space-y-6">
            {selected ? (
              <PremiumCard className="p-8 space-y-6 border-gold shadow-xl shadow-gold/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-primary">Seat <span className="text-gold">{selected}</span></h3>
                  <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border bg-[hsl(var(--background))]",
                    statusConfig[(seats.find(s => s.id === selected)?.status as SeatStatus) ?? "available"].color,
                    statusConfig[(seats.find(s => s.id === selected)?.status as SeatStatus) ?? "available"].border
                  )}>
                    {statusConfig[(seats.find(s => s.id === selected)?.status as SeatStatus) ?? "available"].label}
                  </span>
                </div>
                <div className="space-y-4 text-xs font-bold">
                  {[
                    { l: "Floor",    v: floors[activeFloor] },
                    { l: "Section",  v: seats.find(s => s.id === selected)?.section ?? "—" },
                    { l: "Type",     v: seats.find(s => s.id === selected)?.type === "premium" ? "⚡ Premium" : "Standard" },
                    { l: "Assigned", v: seats.find(s => s.id === selected)?.student ?? "—" },
                  ].map((d, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-[hsl(var(--background))]">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.l}</span>
                      <span className="text-primary">{d.v}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button className="p-3 bg-[hsl(var(--background))] text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-1.5 border border-border">
                    <User className="w-3.5 h-3.5" /> Assign
                  </button>
                  <button onClick={async () => {
                     await updateSeatStatus(selected, 'available');
                     fetchSeats();
                  }} className="p-3 bg-[hsl(var(--background))] text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-1.5 border border-border">
                    <Edit className="w-3.5 h-3.5" /> Free Up
                  </button>
                  <button onClick={async () => {
                     await updateSeatStatus(selected, 'blocked');
                     fetchSeats();
                  }} className="p-3 bg-amber-50 text-amber-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Block
                  </button>
                  <button className="p-3 bg-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </PremiumCard>
            ) : (
              <PremiumCard className="p-8 border-dashed text-center space-y-3 bg-[hsl(var(--background))]">
                <Armchair className="w-12 h-12 mx-auto text-slate-200" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Click any seat<br />to view details</p>
              </PremiumCard>
            )}

            {/* Quick Stats */}
            <PremiumCard className="p-8 bg-primary text-white border-none">
              <h4 className="font-black text-lg">Floor Analytics</h4>
              <div className="space-y-4 mt-6">
                {[
                  { l: "Occupancy Rate", v: `${Math.round((counts.occupied / seats.length) * 100)}%`, bar: (counts.occupied / seats.length) * 100 },
                  { l: "Reserved Rate",  v: `${Math.round((counts.reserved / seats.length) * 100)}%`,  bar: (counts.reserved / seats.length) * 100 },
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold"><span className="text-slate-400">{stat.l}</span><span>{stat.v}</span></div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", i === 0 ? "bg-gold" : "bg-white")} style={{ width: `${stat.bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={fetchSeats} className="w-full mt-6 py-3 bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <RefreshCw className={cn("w-3.5 h-3.5", loading ? "animate-spin" : "")} /> Refresh Layout
              </button>
            </PremiumCard>
          </div>
        </div>
      </div>
    </>
  );
}
