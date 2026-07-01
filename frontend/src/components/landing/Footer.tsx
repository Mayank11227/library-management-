import { BookOpen, Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 border-t-4 border-gold">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="#home" className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <BookOpen className="text-primary w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">
                  Excellence Library
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                  Premium Study Center
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              A premium, distraction-free reading room and study center designed for ambitious students and professionals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Facilities', 'Gallery', 'Testimonials', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '')}`} className="text-white/70 hover:text-gold transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Memberships */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Memberships</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#memberships" className="text-white/70 hover:text-gold transition-colors text-sm font-medium">
                  Monthly Plan
                </Link>
              </li>
              <li>
                <Link href="#memberships" className="text-white/70 hover:text-gold transition-colors text-sm font-medium flex items-center gap-2">
                  6 Months Plan <span className="bg-gold/20 text-gold text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>
                </Link>
              </li>
              <li>
                <Link href="#memberships" className="text-white/70 hover:text-gold transition-colors text-sm font-medium">
                  Annual Plan
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gold hover:text-white transition-colors text-sm font-bold mt-2 inline-block">
                  Member Login &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li>123 Education Hub, Knowledge Avenue</li>
              <li>Sector 45, City - 123456</li>
              <li className="pt-2 text-white font-medium">+91 98765 43210</li>
              <li className="text-white font-medium">admissions@excellencelibrary.com</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Excellence Library. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Designed for Excellence Library
          </p>
        </div>
      </div>
    </footer>
  );
}
