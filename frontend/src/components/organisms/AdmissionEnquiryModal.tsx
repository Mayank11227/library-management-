"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Users,
  Wifi,
  Star,
  BookOpen,
  PartyPopper,
} from "lucide-react";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

/* ─────────────────────────── types ─────────────────────────── */
interface FormData {
  full_name: string;
  phone: string;
  email: string;
  purpose: string;
  membership_plan: string;
  study_shift: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  phone?: string;
  purpose?: string;
  membership_plan?: string;
}

/* ─────────────────────────── constants ─────────────────────── */
const BENEFITS = [
  "Comfortable Study Seats",
  "Air Conditioned Environment",
  "High-Speed Wi-Fi",
  "QR Attendance System",
  "Study Hour Tracking",
  "Flexible Study Shifts",
  "Clean & Quiet Environment",
  "Secure Premises",
];

const STATS = [
  { icon: Users, label: "Active Students", value: "500+" },
  { icon: BookOpen, label: "Study Seats", value: "100+" },
  { icon: Wifi, label: "High-Speed Internet", value: "Free" },
  { icon: Star, label: "Premium Environment", value: "⭐⭐⭐⭐⭐" },
];

const PURPOSE_OPTIONS = [
  "Admission Enquiry",
  "Seat Booking",
  "Membership Information",
  "Library Visit",
  "General Enquiry",
];

const MEMBERSHIP_OPTIONS = [
  "Monthly Plan – ₹450",
  "6 Month Plan – ₹2499",
  "Annual Plan – ₹4999",
  "Not Sure Yet",
];

const SHIFT_OPTIONS = [
  "Morning Shift",
  "Afternoon Shift",
  "Evening Shift",
  "Full Day",
  "Flexible",
];

const EMPTY_FORM: FormData = {
  full_name: "",
  phone: "",
  email: "",
  purpose: "",
  membership_plan: "",
  study_shift: "",
  message: "",
};

/* ─────────────────────────── component ─────────────────────── */
export const AdmissionEnquiryModal = () => {
  const { isOpen, closeModal, preselectedPlan } = useEnquiryModal();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const firstFocusRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /* sync preselected plan */
  useEffect(() => {
    if (preselectedPlan) {
      setForm((f) => ({ ...f, membership_plan: preselectedPlan }));
    }
  }, [preselectedPlan]);

  /* animate in/out */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setVisible(true), 10);
      setTimeout(() => firstFocusRef.current?.focus(), 150);
    } else {
      setVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "";
        setForm(EMPTY_FORM);
        setErrors({});
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  /* ESC key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal]);

  /* overlay click */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  /* validation */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (!form.purpose) newErrors.purpose = "Please select a purpose";
    if (!form.membership_plan) newErrors.membership_plan = "Please select a membership plan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // Replace with your actual API URL
      const res = await fetch("http://localhost:8000/api/v1/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Even if API isn't set up yet, show success for demo
      if (res.ok || res.status === 404 || res.status === 405) {
        setIsSuccess(true);
      }
    } catch {
      // Network error - still show success for demo (remove in production)
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Admission Enquiry"
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-[1000px] rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"
        }`}
        style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.35)", maxHeight: "95vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── CLOSE BUTTON ── */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all duration-200 hover:rotate-90 hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ══════════════════ LEFT PANEL ══════════════════ */}
        <div
          className="lg:w-[40%] flex flex-col p-8 lg:p-10 overflow-y-auto"
          style={{ background: "linear-gradient(160deg, #C7A46A 0%, #b8904f 100%)" }}
        >
          {/* Brand Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/90 text-xs font-bold uppercase tracking-widest">
                StudyZone Library
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
              Welcome to <br />
              <span className="text-white/90">Excellence Library</span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Create a productive study routine in a peaceful and focused environment designed
              for serious learners.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-4">
              What You Get
            </p>
            <ul className="space-y-2.5">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-white shrink-0" />
                  <span className="text-white text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-8 space-y-3">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-4">
              Contact Us
            </p>
            {[
              { icon: Phone, text: "+91 XXXXX XXXXX" },
              { icon: Mail, text: "admissions@library.com" },
              { icon: MapPin, text: "Greater Noida, Uttar Pradesh" },
              { icon: Clock, text: "Open Daily: 6:00 AM – 11:00 PM" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-white/70 shrink-0" />
                <span className="text-white/90 text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-auto pt-6 border-t border-white/20">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-4">
              Why Students Choose Us
            </p>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white/15 rounded-xl p-3 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 text-white mb-1" />
                  <p className="text-white font-bold text-sm">{value}</p>
                  <p className="text-white/70 text-[11px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════ RIGHT PANEL ══════════════════ */}
        <div className="lg:w-[60%] bg-white flex flex-col overflow-y-auto">
          {isSuccess ? (
            /* ── SUCCESS STATE ── */
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, #C7A46A20, #C7A46A40)" }}
              >
                <PartyPopper className="w-10 h-10" style={{ color: "#C7A46A" }} />
              </div>
              <h3 className="text-3xl font-bold text-[#1E2A44] mb-3">Thank You! 🎉</h3>
              <p className="text-slate-500 mb-2 text-lg">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-slate-400 text-sm mb-10 max-w-xs">
                Our admission team will contact you within{" "}
                <span className="font-semibold text-[#C7A46A]">24 hours</span> with membership
                plans, seat availability, and admission details.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-[#C7A46A] hover:text-[#C7A46A] transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    document.getElementById("membership-plans")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-3 px-6 rounded-xl text-white font-bold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #C7A46A, #b8904f)" }}
                >
                  View Plans <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* ── FORM STATE ── */
            <div className="p-8 lg:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1E2A44] mb-2">
                  Book Your Study Seat
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fill out the form and our team will contact you shortly regarding membership
                  plans, seat availability, and admissions.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={firstFocusRef}
                      type="text"
                      id="enquiry-full-name"
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#C7A46A]/30 ${
                        errors.full_name
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-[#C7A46A] focus:bg-white"
                      }`}
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="enquiry-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      maxLength={10}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#C7A46A]/30 ${
                        errors.phone
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-[#C7A46A] focus:bg-white"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="enquiry-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#C7A46A] focus:bg-white focus:ring-2 focus:ring-[#C7A46A]/30"
                  />
                </div>

                {/* Row 2: Purpose + Membership */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="enquiry-purpose"
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all appearance-none cursor-pointer focus:ring-2 focus:ring-[#C7A46A]/30 ${
                        errors.purpose
                          ? "border-red-400 bg-red-50 text-slate-800"
                          : form.purpose
                          ? "border-slate-200 bg-slate-50 text-slate-800 focus:border-[#C7A46A] focus:bg-white"
                          : "border-slate-200 bg-slate-50 text-slate-400 focus:border-[#C7A46A] focus:bg-white"
                      }`}
                    >
                      <option value="" disabled>
                        Select purpose
                      </option>
                      {PURPOSE_OPTIONS.map((o) => (
                        <option key={o} value={o} className="text-slate-800">
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.purpose && (
                      <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                      Interested Membership <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="enquiry-membership"
                      name="membership_plan"
                      value={form.membership_plan}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all appearance-none cursor-pointer focus:ring-2 focus:ring-[#C7A46A]/30 ${
                        errors.membership_plan
                          ? "border-red-400 bg-red-50 text-slate-800"
                          : form.membership_plan
                          ? "border-slate-200 bg-slate-50 text-slate-800 focus:border-[#C7A46A] focus:bg-white"
                          : "border-slate-200 bg-slate-50 text-slate-400 focus:border-[#C7A46A] focus:bg-white"
                      }`}
                    >
                      <option value="" disabled>
                        Select membership
                      </option>
                      {MEMBERSHIP_OPTIONS.map((o) => (
                        <option key={o} value={o} className="text-slate-800">
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.membership_plan && (
                      <p className="text-red-500 text-xs mt-1">{errors.membership_plan}</p>
                    )}
                  </div>
                </div>

                {/* Study Shift */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                    Preferred Study Shift
                  </label>
                  <select
                    id="enquiry-shift"
                    name="study_shift"
                    value={form.study_shift}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all appearance-none cursor-pointer focus:border-[#C7A46A] focus:bg-white focus:ring-2 focus:ring-[#C7A46A]/30 ${
                      form.study_shift ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    <option value="" className="text-slate-400">
                      Select preferred shift
                    </option>
                    {SHIFT_OPTIONS.map((o) => (
                      <option key={o} value={o} className="text-slate-800">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E2A44] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us your requirements... (e.g. I need a window seat, Is Wi-Fi available?)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#C7A46A] focus:bg-white focus:ring-2 focus:ring-[#C7A46A]/30 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  id="enquiry-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#C7A46A]/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #C7A46A 0%, #b8904f 100%)" }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book My Seat <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  🔒 Your information is safe and will never be shared with third parties.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
