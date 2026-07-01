"use client";

import { motion } from "framer-motion";

export default function SeatAvailability({ onCheckAvailability }: { onCheckAvailability: () => void }) {
  // Mock data for visual seat map
  const totalSeats = 100;
  const occupiedSeats = 85;
  const reservedSeats = 10;
  const availableSeats = 5;

  // Generate mock seat grid
  const seats = Array.from({ length: 40 }).map((_, i) => {
    if (i < 30) return 'occupied';
    if (i < 36) return 'reserved';
    return 'available';
  });

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Live Occupancy</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Premium Seats <br /> Fill Up Fast
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
              Our library operates at a {Math.round((occupiedSeats + reservedSeats) / totalSeats * 100)}% occupancy rate. Secure your dedicated spot today to ensure a consistent study routine.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Available Now</p>
                <p className="text-4xl font-bold text-gold">{availableSeats}</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-white/60 text-sm mb-1">Total Capacity</p>
                <p className="text-4xl font-bold text-white">{totalSeats}</p>
              </div>
            </div>

            <button
              onClick={onCheckAvailability}
              className="bg-gold hover:bg-white text-primary px-8 py-4 rounded-full text-base font-bold transition-all duration-300 shadow-lg shadow-gold/20 hover:-translate-y-1"
            >
              Check Seat Availability
            </button>
          </motion.div>

          {/* Visual Seat Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-3xl border border-white/10 relative"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#FAF8F4]" />
                <span className="text-white/80 text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-gold" />
                <span className="text-white/80 text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-white/20" />
                <span className="text-white/80 text-sm">Occupied</span>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-3 sm:gap-4 justify-items-center">
              {seats.map((status, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center ${
                    status === 'available' ? 'bg-[#FAF8F4] shadow-[0_0_10px_rgba(250,248,244,0.5)] cursor-pointer hover:scale-110 transition-transform' : 
                    status === 'reserved' ? 'bg-gold' : 
                    'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Desk visual hints */}
            <div className="mt-8 flex justify-center">
               <div className="w-32 h-2 bg-white/20 rounded-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
