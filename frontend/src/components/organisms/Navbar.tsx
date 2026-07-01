"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

const NAV_LINKS = [
  { label: "Home", href: "/", sectionId: "hero" },
  { label: "Facilities", href: "/#facilities", sectionId: "facilities" },
  { label: "Membership Plans", href: "/#membership-plans", sectionId: "membership-plans" },
  { label: "Gallery", href: "/#gallery", sectionId: "gallery" },
  { label: "About Us", href: "/#about", sectionId: "about" },
  { label: "Contact Us", href: "/#contact", sectionId: "contact" },
];

const NAVBAR_HEIGHT = 80; // px offset for sticky navbar

const handleSectionNav = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string | null) => {
  if (!sectionId || sectionId === "hero") return; // let default routing handle Home / Contact
  e.preventDefault();
  // If we're not on the homepage, navigate there first (edge case)
  if (window.location.pathname !== "/") {
    window.location.href = `/#${sectionId}`;
    return;
  }
  const el = document.getElementById(sectionId);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { openModal } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header logic
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);

      // Scroll Spy Logic
      const sections = [
        { id: "hero", label: "Home" },
        { id: "facilities", label: "Facilities" },
        { id: "membership-plans", label: "Membership Plans" },
        { id: "gallery", label: "Gallery" },
        { id: "about", label: "About Us" },
        { id: "contact", label: "Contact Us" },
      ];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 xl:px-8",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-3"
            : "bg-white py-5"
        )}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">
          
          {/* Left: Library Branding */}
          <Link href="/" className="flex items-center gap-3" onClick={scrollToTop}>
            <div className="w-11 h-11 border-2 border-[#2563EB] rounded-full flex items-center justify-center">
              <Book className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[22px] font-semibold text-slate-900 leading-none mb-1">
                StudyZone.Library
              </span>
              <span className="text-[9px] font-medium tracking-widest text-slate-500 uppercase">
                Your Professional Study Space
              </span>
            </div>
          </Link>

          {/* Right: Navigation + Actions */}
          <div className="hidden lg:flex items-center justify-end gap-x-8">
            
            {/* Links with Active Highlighting */}
            <nav className="flex items-center gap-x-6 lg:gap-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.label;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleSectionNav(e, link.sectionId)}
                    className={cn(
                      "text-[14px] font-bold transition-all duration-300 relative py-1",
                      isActive ? "text-[#2563EB]" : "text-slate-600 hover:text-[#2563EB]"
                    )}
                  >
                    {link.label}
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[#2563EB] transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )} 
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal()}
                className="px-6 py-2.5 rounded-full bg-[#c2a265] text-white font-bold text-sm hover:bg-[#b09050] hover:shadow-lg transition-all active:scale-95"
              >
                Book Your Seat
              </button>
              <Link
                href="/login"
                className="px-8 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg transition-all duration-300 origin-top overflow-hidden",
            isMobileMenuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
          )}
        >
          <div className="flex flex-col px-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleSectionNav(e, link.sectionId);
                  setIsMobileMenuOpen(false);
                }}
                className="text-slate-600 font-bold hover:text-[#2563EB] py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-black text-white font-bold"
              >
                Login
              </Link>
              <button
                onClick={() => { setIsMobileMenuOpen(false); openModal(); }}
                className="w-full text-center py-3 rounded-full bg-[#c2a265] text-white font-bold"
              >
                Book Your Seat
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Back To Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-[60] w-12 h-12 bg-[#2563EB] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
        )}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </button>
    </>
  );
};
