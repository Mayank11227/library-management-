"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Book,
  CheckCircle,
  Users,
  Armchair,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Wifi,
  Clock,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const WHY_CHOOSE_US = [
  {
    title: "Comfortable Study Environment",
    desc: "Quiet and distraction-free spaces designed for maximum productivity.",
    icon: Armchair,
  },
  {
    title: "High-Speed Wi-Fi",
    desc: "Reliable internet access for online classes and research.",
    icon: Wifi,
  },
  {
    title: "QR Attendance System",
    desc: "Modern QR Check-In and Check-Out for automated attendance tracking.",
    icon: Zap,
  },
  {
    title: "Study Hour Tracking",
    desc: "Monitor your learning progress and productivity.",
    icon: Clock,
  },
  {
    title: "Air-Conditioned Study Halls",
    desc: "Comfortable environment for long study sessions.",
    icon: Shield,
  },
  {
    title: "Safe & Secure Premises",
    desc: "CCTV-monitored study environment for student safety.",
    icon: Shield,
  },
  {
    title: "Power Backup",
    desc: "Uninterrupted study experience during power outages.",
    icon: Zap,
  },
  {
    title: "Flexible Membership Plans",
    desc: "Affordable options for every student.",
    icon: CheckCircle,
  },
];

const STATS = [
  { label: "Students Served", value: "500+", icon: Users },
  { label: "Study Seats", value: "144", icon: Armchair },
  { label: "Student Satisfaction", value: "95%", icon: Star },
  { label: "Membership Plans", value: "3", icon: Book },
];

const TESTIMONIALS = [
  {
    name: "Anjali Gupta",
    exam: "UPSC Aspirant",
    text: "The environment here is incredibly disciplined. The study hour tracking helped me stay consistent with my 10-hour daily goal.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    exam: "NEET Preparation",
    text: "Best library in the area. High-speed Wi-Fi and comfortable seating make it easy to focus on long video lectures.",
    rating: 5,
  },
  {
    name: "Sidhharth Singh",
    exam: "CAT Aspirant",
    text: "I love the QR check-in system. It feels professional and the space is always clean and peaceful.",
    rating: 4,
  },
];

export const About = () => {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            setCounts(
              STATS.map((stat) => {
                const val = parseInt(stat.value);
                return Math.floor(val * progress);
              })
            );
            if (frame === totalFrames) clearInterval(timer);
          }, frameDuration);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white">

      {/* Hero Banner */}
      <section className="relative pt-24 pb-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#c2a265] font-bold tracking-wider uppercase text-sm mb-4 block">
              About Our Library
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight leading-tight">
              Building a Culture of Learning, Discipline, and Success
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              We are more than just a study space. Our library is designed to
              provide students with a peaceful, focused, and productive
              environment where they can prepare for competitive exams,
              university studies, and lifelong learning goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#membership-plans"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("membership-plans")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-[#2563EB] text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
              >
                Book Your Seat
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:border-[#c2a265] hover:text-[#c2a265] transition-all cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story, Mission, Vision */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/images/hanuman_view.jpg"
                  alt="Library environment"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-bold text-[#1E293B] mb-4">
                  Our Journey
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Founded with the vision of creating a distraction-free
                  learning environment, our library was built to support
                  students in achieving academic excellence.
                  <br />
                  <br />
                  We understand that success requires consistency, discipline,
                  and the right environment. That&apos;s why we have created a
                  modern study center equipped with comfortable seating,
                  high-speed internet, attendance tracking, and student-focused
                  facilities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-[#FAF9F6] rounded-2xl border border-slate-100">
                  <h4 className="text-xl font-bold text-[#2563EB] mb-3">
                    Our Mission
                  </h4>
                  <p className="text-sm text-slate-600">
                    To provide a world-class study environment that empowers
                    students to achieve their academic and career goals through
                    discipline.
                  </p>
                </div>
                <div className="p-6 bg-[#FAF9F6] rounded-2xl border border-slate-100">
                  <h4 className="text-xl font-bold text-[#c2a265] mb-3">
                    Our Vision
                  </h4>
                  <p className="text-sm text-slate-600">
                    To become the most trusted study center, helping learners
                    build successful careers through quality study spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#1E293B] text-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Why Students Choose Our Library
            </h3>
            <div className="w-24 h-1.5 bg-[#c2a265] mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[#c2a265]/20 text-[#c2a265] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-[#2563EB]/5 text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-black text-[#1E293B] mb-1">
                  {counts[i]}
                  {stat.value.includes("+")
                    ? "+"
                    : stat.value.includes("%")
                    ? "%"
                    : ""}
                </div>
                <p className="text-sm font-bold text-[#c2a265] uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Philosophy */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1000px] text-center">
          <GraduationCap className="w-16 h-16 text-[#2563EB] mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
            A Place Designed for Serious Learners
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Every aspect of our library is designed to help students stay
            focused and consistent. From the seating arrangement to attendance
            tracking, we create an environment where learning becomes a habit
            and success becomes achievable.
            <br />
            <br />
            Whether you are preparing for UPSC, SSC, Banking, Railway, CAT,
            GATE, NEET, JEE, or university examinations, our library provides
            the atmosphere you need to stay committed to your goals.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {[
              "UPSC",
              "SSC",
              "Banking",
              "NEET",
              "JEE",
              "GATE",
              "CAT",
              "UGC NET",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <h3 className="text-3xl font-bold text-[#1E293B] mb-12 text-center">
            What Our Students Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-8 bg-white border border-slate-100 shadow-xl rounded-3xl relative"
              >
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={cn(
                        "w-4 h-4 fill-current",
                        j >= t.rating && "text-slate-200"
                      )}
                    />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-6">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#1E293B] leading-none">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#c2a265] mt-1 uppercase font-bold">
                      {t.exam}
                    </p>
                  </div>
                </div>
                <div className="absolute top-8 right-8 opacity-5">
                  <GraduationCap className="w-12 h-12 text-slate-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
          <div className="bg-[#1E293B] p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">
                View Our Learning Spaces
              </h3>
              <p className="text-slate-400">
                Explore our study hall, reading zones, and premium seating
                facilities.
              </p>
            </div>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 md:mt-0 px-10 py-4 bg-[#c2a265] text-white font-bold rounded-2xl hover:bg-[#b09050] transition-all relative z-10 flex items-center gap-2 cursor-pointer"
            >
              View Full Gallery <ArrowRight className="w-5 h-5" />
            </a>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c2a265]/10 blur-2xl rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
};
