"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800", alt: "Study Hall" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", alt: "Reading Area" },
    { src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800", alt: "Student Seating" },
    { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800", alt: "Library Interior" },
    { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", alt: "Premium Desks" },
    { src: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=800", alt: "Quiet Zone" },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#FAF8F4] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Gallery</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Experience The Ambience</h3>
          <p className="text-slate/80 text-lg">
            Take a visual tour of our premium facilities designed for absolute focus and comfort.
          </p>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 || index === 3 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={() => setSelectedImage(img.src)}
            >
              <div className="aspect-[4/3] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <ZoomIn className="text-white w-10 h-10" />
                <span className="absolute bottom-4 left-6 text-white font-medium">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-full object-contain bg-black/50"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
