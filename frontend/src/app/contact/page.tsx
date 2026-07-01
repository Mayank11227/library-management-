"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Send, Clock, ChevronDown, CheckCircle, Navigation, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/sections/Footer";

const CONTACT_CARDS = [
  {
    title: "Call Us",
    desc: "Speak directly with our library staff.",
    val: "+91 98765 43210",
    icon: Phone,
    actionText: "Call Now",
    href: "tel:+919876543210",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "WhatsApp Support",
    desc: "Get quick responses about seat bookings.",
    val: "+91 98765 43210",
    icon: MessageCircle,
    actionText: "Chat on WhatsApp",
    href: "https://wa.me/919876543210",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Email Us",
    desc: "Send us your questions anytime.",
    val: "support@studyzone.com",
    icon: Mail,
    actionText: "Send Email",
    href: "mailto:support@studyzone.com",
    color: "text-[#c2a265]",
    bg: "bg-[#c2a265]/10",
  },
  {
    title: "Visit Our Library",
    desc: "Explore our study environment in person.",
    val: "123 Study Plaza, Civil Lines, North Delhi",
    icon: MapPin,
    actionText: "Get Directions",
    href: "#map",
    color: "text-slate-800",
    bg: "bg-slate-100",
  },
];

const FAQS = [
  { q: "How do I join the library?", a: "You can join by visiting us in person or choosing a membership plan on our website. Simply select a plan, book a seat, and complete the registration." },
  { q: "What membership plans are available?", a: "We offer Monthly (₹450), 6-Month (₹2499), and Annual (₹4999) plans designed for different study needs." },
  { q: "Can I reserve a seat?", a: "Yes, you can reserve your preferred seat through our student dashboard or by contacting us directly." },
  { q: "How does QR attendance work?", a: "Every student gets a unique ID. You simply scan the QR code at the entry and exit points to log your study hours automatically." },
  { q: "What are the library timings?", a: "We are open Monday-Saturday (6:00 AM – 11:00 PM) and Sunday (7:00 AM – 9:00 PM)." },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px] text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c2a265]/10 text-[#c2a265] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E293B] mb-6 tracking-tight">
            We're Here to Help You Succeed
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you have questions about memberships, seat availability, study shifts, or library timings, our team is always ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="px-8 py-4 bg-[#2563EB] text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href="https://wa.me/919876543210" className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {CONTACT_CARDS.map((card, i) => (
               <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", card.bg, card.color)}>
                     <card.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{card.desc}</p>
                  <p className="font-bold text-slate-800 mb-6">{card.val}</p>
                  <a href={card.href} className="text-[#2563EB] font-bold text-sm hover:underline flex items-center gap-1">
                    {card.actionText} <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Form & Map Split */}
      <section className="py-24 bg-[#1E293B] text-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
             {/* Contact Form */}
             <div className="bg-white rounded-[2.5rem] p-10 text-slate-800 shadow-2xl">
                <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-slate-500 mb-8">Have a question? Fill out the form and we'll get back to you.</p>
                
                {submitted ? (
                  <div className="bg-emerald-50 text-emerald-700 p-8 rounded-2xl flex flex-col items-center text-center animate-fade-in">
                    <CheckCircle className="w-12 h-12 mb-4" />
                    <h4 className="text-xl font-bold mb-2">Thank you for contacting us!</h4>
                    <p>Our team will respond shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                          <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]" placeholder="John Doe" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                          <input required type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]" placeholder="+91 XXXX" />
                       </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                        <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c2a265]" placeholder="Inquiry about memberships" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                        <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c2a265] resize-none" placeholder="Your message here..."></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#2563EB] text-white font-black rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2">
                       <Send className="w-5 h-5" /> Send Message
                    </button>
                  </form>
                )}
             </div>

             {/* Info & Map */}
             <div className="space-y-12">
                <div id="map">
                   <h2 className="text-3xl font-bold mb-6">Find Us</h2>
                   <div className="h-[400px] w-full rounded-[2.5rem] bg-slate-800 border-4 border-white/5 overflow-hidden flex items-center justify-center relative group">
                      {/* Placeholder for Map */}
                      <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" alt="Map View" className="absolute inset-0 object-cover opacity-50" />
                      <div className="relative z-10 text-center">
                         <MapPin className="w-12 h-12 text-[#c2a265] mx-auto mb-4" />
                         <p className="font-bold text-xl mb-4">Study Zone Library</p>
                         <button className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-[#c2a265] hover:text-white transition-all flex items-center gap-2">
                            <Navigation className="w-4 h-4" /> Get Directions
                         </button>
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                      <h4 className="font-bold text-[#c2a265] mb-4 flex items-center gap-2">
                         <Clock className="w-5 h-5" /> Operating Hours
                      </h4>
                      <p className="text-sm font-bold">Mon - Sat</p>
                      <p className="text-slate-400 mb-3 italic">6:00 AM – 11:00 PM</p>
                      <p className="text-sm font-bold">Sunday</p>
                      <p className="text-slate-400 italic">7:00 AM – 9:00 PM</p>
                   </div>
                   <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                      <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
                         <MessageCircle className="w-5 h-5" /> Quick Support
                      </h4>
                      <p className="text-sm">Available via WhatsApp and Phone for instant seat bookings.</p>
                      <div className="mt-4 flex gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-xs uppercase font-bold text-slate-400">Online Now</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-[800px]">
          <h2 className="text-3xl font-bold text-[#1E293B] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
             {FAQS.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                   <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
                   >
                      <span className="font-bold text-slate-800">{faq.q}</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform", openFaq === i && "rotate-180")} />
                   </button>
                   {openFaq === i && (
                     <div className="px-6 py-5 text-slate-600 bg-white animate-fade-in border-t border-slate-100 leading-relaxed">
                        {faq.a}
                     </div>
                   )}
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Quick Action Bar */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
         <div className="container mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-slate-500 font-bold text-sm uppercase tracking-widest">
            <Link href="/#membership-plans" className="flex items-center gap-2 hover:text-[#2563EB]">📚 Plans</Link>
            <Link href="/#membership-plans" className="flex items-center gap-2 hover:text-[#2563EB]">🪑 Book Seat</Link>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-[#2563EB]">📞 Call</a>
            <a href="https://wa.me/919876543210" className="flex items-center gap-2 hover:text-[#2563EB]">💬 WhatsApp</a>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8 max-w-[1000px] text-center">
             <h2 className="text-4xl font-bold text-[#1E293B] mb-4">Ready to Start Your Learning Journey?</h2>
             <p className="text-slate-600 text-lg mb-10">Join hundreds of students who trust our library for focused study.</p>
             <div className="flex gap-4 justify-center">
                <Link href="/#membership-plans" className="px-10 py-4 bg-[#2563EB] text-white font-bold rounded-full shadow-lg">Book Your Seat</Link>
                <Link href="/#membership-plans" className="px-10 py-4 border border-slate-200 text-slate-700 font-bold rounded-full">View Plans</Link>
             </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
