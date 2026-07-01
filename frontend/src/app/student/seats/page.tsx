"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Armchair, ShieldCheck, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import { useState, useEffect } from "react";
import { getSeats, releaseSeat } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function SeatBookingPage() {
  const { user } = useAuth();
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSeat, setActiveSeat] = useState<any>(null);

  const fetchSeats = async () => {
    try {
      const response = await getSeats();
      if (response.status === 'success') {
        const mapped = response.data.map((s: any) => ({
          id: s.id,
          isPremium: s.type === 'premium',
          isOccupied: s.status === 'occupied' || s.status === 'reserved',
          isMine: s.current_student_id && s.current_student_id.toString() === user?.id
        }));
        setSeats(mapped);
        const mySeat = mapped.find((s: any) => s.isMine);
        setActiveSeat(mySeat || null);
      }
    } catch (error) {
      console.error("Failed to fetch seats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchSeats();
  }, [user]);

  const handleRelease = async () => {
    if (!activeSeat) return;
    try {
      await releaseSeat(activeSeat.id);
      alert("Seat released successfully.");
      fetchSeats();
    } catch (error) {
      alert("Failed to release seat.");
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fade-in pb-20">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Seat <span className="text-gold">Booking</span></h1>
            <p className="text-sm font-medium text-slate-500 mt-2">Reserve your preferred study space in real-time.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--background))] border border-border" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Occupied</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Seat</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Seat Map */}
          <div className="lg:col-span-8">
            <PremiumCard className="p-8">
              <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-gold" />
                   <h3 className="text-sm font-black text-primary uppercase tracking-widest">Premium Section</h3>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.isOccupied && !seat.isMine}
                    className={cn(
                      "aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group border",
                      seat.isMine 
                        ? "bg-gold border-gold text-white shadow-lg shadow-gold/20" 
                        : seat.isOccupied 
                          ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60" 
                          : "bg-[hsl(var(--background))] border-border text-primary hover:border-gold hover:text-gold hover:shadow-md cursor-pointer"
                    )}
                  >
                    <Armchair className={cn("w-6 h-6", seat.isMine ? "text-white" : seat.isOccupied ? "text-slate-300" : "text-slate-400 group-hover:text-gold")} />
                    <span className="text-[10px] font-bold tracking-widest">{seat.id}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 flex items-center justify-center p-4 bg-[hsl(var(--background))] rounded-2xl border border-dashed border-border text-xs font-bold text-slate-400 uppercase tracking-widest">
                 Main Entrance & Reception
              </div>
            </PremiumCard>
          </div>

          {/* Active Booking Details */}
          <div className="lg:col-span-4 space-y-6">
            <PremiumCard className="p-8 bg-primary text-white border-none relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
               <h3 className="text-lg font-black relative z-10">Current <span className="text-gold">Reservation</span></h3>
               
               <div className="mt-8 space-y-6 relative z-10">
                  <div className="flex items-center justify-center py-8">
                     <div className="w-24 h-24 rounded-full bg-gold/10 border-4 border-gold/30 flex items-center justify-center flex-col">
                        <span className="text-2xl font-black text-gold">{activeSeat ? activeSeat.id : "None"}</span>
                     </div>
                  </div>
                  
                  {activeSeat && (
                    <div className="space-y-4">
                       <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <div className="flex items-center gap-2 text-slate-300">
                             <Clock className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-widest">Shift</span>
                          </div>
                          <span className="text-sm font-black text-white">Anytime</span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <div className="flex items-center gap-2 text-slate-300">
                             <MapPin className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-widest">Zone</span>
                          </div>
                          <span className="text-sm font-black text-emerald-400">{activeSeat.isPremium ? "Premium Section" : "Standard Section"}</span>
                       </div>
                    </div>
                  )}
               </div>

               {activeSeat && (
                 <button onClick={handleRelease} className="w-full mt-6 py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-lg text-center">
                    Release Seat
                 </button>
               )}
            </PremiumCard>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
