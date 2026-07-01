"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Facilities", href: "#facilities" },
    { name: "Membership Plans", href: "#memberships" },
    { name: "Gallery", href: "#gallery" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-[80px] flex items-center ${
        scrolled ? "glass" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary rounded-lg group-hover:bg-gold transition-colors duration-300">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary tracking-tight">
              Excellence Library
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
              Premium Study Center
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:text-gold transition-colors"
          >
            Login
          </Link>
          <button
            onClick={onBookClick}
            className="bg-primary hover:bg-gold text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-[0_4px_14px_0_rgba(30,42,68,0.39)] hover:shadow-[0_6px_20px_rgba(199,164,106,0.23)] hover:-translate-y-0.5"
          >
            Book Your Seat
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[80px] left-0 w-full bg-white border-b border-border shadow-lg lg:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate hover:text-gold"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link
                href="/login"
                className="text-base font-medium text-primary"
              >
                Login
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="bg-primary text-white px-6 py-3 rounded-full text-center font-medium mt-2"
              >
                Book Your Seat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
