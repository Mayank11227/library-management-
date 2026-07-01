"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Users, Armchair, Wifi, Target } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = ["All", "Study Hall", "Reading Area", "Facilities", "Student Seating", "Library Interior"];

const GALLERY_IMAGES = [
  {
    id: 1,
    category: "Library Interior",
    title: "Premium Library Exterior",
    description: "A modern and welcoming study environment designed for focus.",
    src: "/images/hanuman_view.jpg",
    featured: true,
  },
  {
    id: 2,
    category: "Study Hall",
    title: "Main Study Hall",
    description: "Quiet and spacious main hall for long study sessions.",
    src: "/images/hanuman_view.jpg",
  },
  {
    id: 3,
    category: "Student Seating",
    title: "Individual Study Desks",
    description: "Private partitioned desks for distraction-free learning.",
    src: "/images/hanuman_view.jpg",
  },
  {
    id: 4,
    category: "Reading Area",
    title: "Reading Zone",
    description: "Casual reading area with comfortable lounge seating.",
    src: "/images/hanuman_view.jpg",
  },
  {
    id: 5,
    category: "Facilities",
    title: "High-Speed Wi-Fi Zone",
    description: "Seamless connectivity for online resources and research.",
    src: "/images/hanuman_view.jpg",
  },
  {
    id: 6,
    category: "Student Seating",
    title: "Student Seating Area",
    description: "Ergonomic chairs designed for marathon study goals.",
    src: "/images/hanuman_view.jpg",
  },
  {
    id: 7,
    category: "Library Interior",
    title: "Reception & Entry",
    description: "Professional welcoming area with QR access control.",
    src: "/images/hanuman_view.jpg",
  },
  {
    id: 8,
    category: "Facilities",
    title: "Air Conditioned Zone",
    description: "Temperature controlled environment for peak comfort.",
    src: "/images/hanuman_view.jpg",
  },
];

export const Gallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeTab === "All" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  const currentIdx = selectedImage !== null 
    ? GALLERY_IMAGES.findIndex(img => img.id === selectedImage) 
    : -1;

  const navigate = (dir: number) => {
    const nextIdx = (currentIdx + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[nextIdx].id);
  };

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#c2a265] font-bold tracking-wider uppercase text-sm mb-4 block">
            Inside Our Library
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight">
            Explore Our Study Environment
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Take a look inside our premium study space designed for focused learning, productivity, and academic success. Every detail is designed to help students achieve their goals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                activeTab === tab 
                  ? "bg-[#2563EB] text-white shadow-lg" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all duration-500",
                image.featured ? "lg:col-span-2 lg:row-span-2 h-[400px] lg:h-full" : "h-[300px]"
              )}
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[#c2a265] text-xs font-bold uppercase mb-1 block">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-slate-200 text-sm mb-4 line-clamp-2">{image.description}</p>
                  <button className="flex items-center gap-2 text-white text-sm font-bold bg-[#c2a265] px-4 py-2 rounded-lg">
                    <Maximize2 className="w-4 h-4" /> View Image
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Stats */}
        <div className="mt-20 py-12 border-y border-slate-100 grid grid-cols-2 lg:grid-cols-5 gap-8 text-center bg-slate-50 rounded-[2rem]">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-6 h-6 text-[#2563EB]" />
            <p className="text-2xl font-black text-[#1E293B]">500+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Students Served</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Armchair className="w-6 h-6 text-[#2563EB]" />
            <p className="text-2xl font-black text-[#1E293B]">144</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Study Seats</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wifi className="w-6 h-6 text-[#2563EB]" />
            <p className="text-2xl font-black text-[#1E293B]">Gigabit</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">High-Speed Wi-Fi</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Target className="w-6 h-6 text-[#2563EB]" />
            <p className="text-2xl font-black text-[#1E293B]">24/7</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Environment</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Target className="w-6 h-6 text-[#c2a265]" />
            <p className="text-2xl font-black text-[#1E293B]">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Focused</p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
           <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800" 
                alt="Student success" 
                fill 
                className="object-cover"
              />
           </div>
           <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] tracking-tight">A Space Designed For Success</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our library offers a peaceful, distraction-free environment where students can focus on their studies, prepare for competitive exams, and achieve their academic goals. Comfortable seating, modern facilities, QR attendance tracking, and a disciplined atmosphere make it the ideal place for serious learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <button className="px-8 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all">Book Your Seat</button>
                 <button className="px-8 py-3 bg-white border-2 border-slate-200 hover:border-[#c2a265] hover:text-[#c2a265] text-slate-700 font-bold rounded-xl transition-all">Contact Us</button>
              </div>
           </div>
        </div>

      </div>

      {/* Lightbox / Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center">
            {/* Nav Arrows */}
            <button 
              className="absolute -left-12 lg:-left-20 text-white p-4 hover:bg-white/10 rounded-full transition-all"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button 
              className="absolute -right-12 lg:-right-20 text-white p-4 hover:bg-white/10 rounded-full transition-all"
              onClick={() => navigate(1)}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden animate-fade-in">
              <Image 
                src={GALLERY_IMAGES.find(img => img.id === selectedImage)?.src || ""} 
                alt="Selected view" 
                fill 
                className="object-contain"
              />
            </div>
          </div>

          {/* Lightbox Caption */}
          <div className="mt-8 text-center text-white max-w-2xl px-4">
            <h3 className="text-2xl font-bold mb-2">
              {GALLERY_IMAGES.find(img => img.id === selectedImage)?.title}
            </h3>
            <p className="text-slate-400 text-balance animate-fade-in">
              {GALLERY_IMAGES.find(img => img.id === selectedImage)?.description}
            </p>
            <div className="mt-4 text-sm text-slate-500">
              {currentIdx + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
