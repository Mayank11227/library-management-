"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      course: "UPSC Aspirant",
      text: "The discipline and environment here are unmatched. I've been studying here for 6 months and my productivity has skyrocketed. The premium seating makes long hours bearable.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      course: "CA Final Student",
      text: "Finding a quiet place to study was my biggest challenge until I found Excellence Library. The Wi-Fi is super fast and the facilities are extremely clean and well-maintained.",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      course: "SSC Aspirant",
      text: "Worth every penny. The management is very professional and the QR attendance system keeps me accountable. Best study center in the city by far.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FAF8F4] -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Student Success</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Hear From Our Scholars</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-border shadow-xl shadow-slate/5 relative card-hover"
            >
              <Quote className="absolute top-6 right-6 text-gold/20 w-12 h-12" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              
              <p className="text-slate/80 leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-lg border border-primary/10">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-primary">{testimonial.name}</h5>
                  <p className="text-sm text-gold font-medium">{testimonial.course}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
