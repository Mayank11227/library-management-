"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FacilitiesSection from "@/components/landing/FacilitiesSection";
import MembershipPlans from "@/components/landing/MembershipPlans";
import StudyEnvironment from "@/components/landing/StudyEnvironment";
import SeatAvailability from "@/components/landing/SeatAvailability";
import GallerySection from "@/components/landing/GallerySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import AboutLibrary from "@/components/landing/AboutLibrary";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import AdmissionPopup from "@/components/landing/AdmissionPopup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onBookClick={openPopup} />
      
      <main className="flex-grow">
        <HeroSection onBookClick={openPopup} />
        <FacilitiesSection />
        <MembershipPlans onEnquireClick={openPopup} />
        <StudyEnvironment onScheduleClick={openPopup} />
        <SeatAvailability onCheckAvailability={openPopup} />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <AboutLibrary />
        <ContactSection />
      </main>

      <Footer />

      <AdmissionPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}
