"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdmissionPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  // Prevent scrolling when modal is open and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(8px)" }}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ borderRadius: "24px", boxShadow: "0 25px 80px rgba(0,0,0,0.18)" }}
            className="relative w-full max-w-[1000px] bg-white overflow-hidden flex flex-col md:flex-row z-10 max-h-[95vh]"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all shadow-md group border border-gray-100"
            >
              <X className="w-5 h-5 text-[#1F2937] group-hover:scale-110 transition-transform" />
            </button>

            {/* Left Side: Branding */}
            <div className="bg-[#C7A46A] text-white p-8 md:p-12 md:w-2/5 flex flex-col relative overflow-hidden hidden md:flex shrink-0">
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-bold mb-4">📚 Welcome to Excellence Library</h3>
                <p className="text-white/90 mb-8 text-sm leading-relaxed">
                  Join a peaceful and productive study environment designed for focused learning and academic success.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    'Comfortable Study Seats', 
                    'Air Conditioned Reading Hall', 
                    'High-Speed Wi-Fi', 
                    'QR Attendance System',
                    'Study Hour Tracking',
                    'Flexible Study Shifts',
                    'Secure Premises',
                    'Clean Environment'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 text-white shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 border-t border-white/20 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:admissions@library.com" className="hover:underline">admissions@library.com</a>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Greater Noida, Uttar Pradesh</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Open Daily: 6:00 AM – 11:00 PM</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20 flex justify-between text-sm font-bold">
                  <div>👨‍🎓 500+ Active Students</div>
                  <div>📚 100+ Study Seats</div>
                </div>
                <div className="text-center text-sm font-bold mt-2">
                  ⭐ Premium Learning Environment
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-6 md:p-12 md:w-3/5 bg-white relative overflow-y-auto custom-scrollbar">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border-4 border-green-100">
                    <span className="text-5xl">🎉</span>
                  </div>
                  <h3 className="text-3xl font-bold text-[#1E2A44] mb-4">Thank You!</h3>
                  <p className="text-[#1F2937] text-lg mb-2">
                    Your enquiry has been received successfully.
                  </p>
                  <p className="text-[#1F2937]/70 mb-10">
                    Our admission team will contact you within 24 hours.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
                    <button 
                      onClick={handleClose}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                    <a 
                      href="#memberships"
                      onClick={handleClose}
                      className="flex-1 bg-[#1E2A44] hover:bg-[#1E2A44]/90 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
                    >
                      View Plans
                    </a>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h4 className="text-3xl font-bold text-[#1E2A44] mb-2">Book Your Seat Today</h4>
                  <p className="text-[#1F2937]/70 text-sm mb-8">Fill out the form and our team will contact you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Full Name *</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Phone Number *</label>
                        <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors" placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors" placeholder="john@example.com" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Purpose</label>
                        <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors text-[#1F2937]">
                          <option value="">Select Purpose</option>
                          <option>Admission Enquiry</option>
                          <option>Seat Booking</option>
                          <option>Membership Information</option>
                          <option>Library Visit</option>
                          <option>General Enquiry</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Preferred Study Shift</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors text-[#1F2937]">
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>Evening</option>
                          <option>Full Day</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Membership Plan</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors text-[#1F2937]">
                        <option>Monthly Plan ₹450</option>
                        <option>6 Month Plan ₹2499</option>
                        <option>Annual Plan ₹4999</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">Message</label>
                      <textarea rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF8F4] focus:outline-none focus:bg-white focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A] transition-colors resize-none" placeholder="Any specific requirements..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#C7A46A] hover:bg-[#C7A46A]/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#C7A46A]/20 hover:-translate-y-0.5 mt-2">
                      Book My Seat
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
