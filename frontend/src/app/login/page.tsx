"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  User,
  Users,
  ArrowRight,
  Loader2,
  CheckCircle,
  Wifi,
  QrCode,
  Clock,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();
  const [loginType, setLoginType] = useState<"admin" | "student">("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    await login(loginType, email, password);
    setShowSuccess(true);
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-[hsl(var(--background))] flex flex-col lg:flex-row font-sans relative">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl shadow-emerald-600/20 flex items-center gap-3 font-bold"
          >
            <ShieldCheck className="w-5 h-5" />
            Login Successful. Accessing portal...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side: Premium Branding - 45% on laptop, 40% on desktop */}
      <section className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative bg-primary flex-col justify-center p-8 xl:p-12 text-white shadow-2xl">
         {/* Background Image with Warm White & Gold Overlay */}
         <div className="absolute inset-0 z-0">
            <Image 
               src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2000&auto=format&fit=crop"
               alt="Luxury Reading Room"
               fill
               className="object-cover"
               priority
            />
            <div className="absolute inset-0 bg-primary/95 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
         </div>

         <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
               <div className="w-10 h-10 bg-gold text-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
               </div>
               <div>
                  <h1 className="text-xl font-black tracking-tight text-white">Premium <span className="text-gold">Library</span></h1>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gold/80">Where Focus Meets Success</p>
               </div>
            </Link>

            {/* Main Content */}
            <div className="space-y-6">
               <div>
                  <h2 className="text-3xl xl:text-4xl font-black leading-tight mb-2">
                     Build Your Future in a <span className="text-gold">Premium Space.</span>
                  </h2>
                  <p className="text-white/80 text-sm font-medium leading-relaxed max-w-md">
                     Join hundreds of students preparing for competitive exams in a peaceful, luxury, and productive learning environment.
                  </p>
               </div>

               {/* Condensed Stats */}
               <div className="flex gap-4">
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-gold">500+</span>
                     <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Students</span>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-gold">100+</span>
                     <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Seats</span>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-gold">4.9</span>
                     <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Rating</span>
                  </div>
               </div>

               {/* Condensed Features */}
               <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                     { text: "Premium Study Hall", icon: CheckCircle },
                     { text: "High-Speed Wi-Fi", icon: Wifi },
                     { text: "QR Attendance", icon: QrCode },
                     { text: "Flexible Shifts", icon: Clock }
                  ].map((feature, i) => (
                     <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2.5">
                        <feature.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="text-xs font-bold text-white/90">{feature.text}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Bottom Note */}
            <div>
               <p className="text-sm font-medium text-white/80 italic">
                  "Success begins with the right environment."
               </p>
            </div>
         </div>
      </section>

      {/* Right Side: Login Section - 55% on laptop, 60% on desktop */}
      <section className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-center items-center relative p-4 sm:p-6 lg:p-8 h-full">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#C7A46A 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
        
        <div className="w-full max-w-[440px] relative z-10 flex flex-col justify-center">
          
          {/* Mobile Branding Header (Hidden on Desktop) */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
             <div className="w-8 h-8 bg-gold text-primary rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-4 h-4" />
             </div>
             <div>
                <h1 className="text-lg font-black tracking-tight text-primary leading-none">Premium <span className="text-gold">Library</span></h1>
             </div>
          </div>

          {/* Welcome Header */}
          <div className="space-y-1.5 mb-6 text-center lg:text-left">
             <h2 className="text-3xl sm:text-4xl font-black text-primary tracking-tight">Welcome Back 👋</h2>
             <p className="text-slate-500 font-medium text-sm">Sign in to continue your learning journey.</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[24px] shadow-lg border-2 border-gold/20 relative">
             
             {/* Loading Overlay */}
             <AnimatePresence>
                {isLoading && (
                   <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-[24px]"
                   >
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                         <p className="font-bold text-primary text-xs uppercase tracking-widest animate-pulse">Authenticating...</p>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Segmented Control */}
             <div className="bg-[hsl(var(--background))] p-1 rounded-xl flex relative h-12 border border-border mb-6">
               <motion.div 
                 className="absolute h-[40px] w-[calc(50%-4px)] bg-gold rounded-lg shadow-md z-0"
                 animate={{ x: loginType === "student" ? "100%" : "0%" }}
                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
               />
               <button 
                 type="button"
                 onClick={() => setLoginType("admin")}
                 className={cn("flex-1 z-10 font-black text-xs uppercase tracking-widest transition-colors", loginType === "admin" ? "text-white" : "text-slate-500 hover:text-primary")}
               >
                 Admin
               </button>
               <button 
                 type="button"
                 onClick={() => setLoginType("student")}
                 className={cn("flex-1 z-10 font-black text-xs uppercase tracking-widest transition-colors", loginType === "student" ? "text-white" : "text-slate-500 hover:text-primary")}
               >
                 Student
               </button>
             </div>

             <form className="space-y-4" onSubmit={handleSubmit}>
               {/* Identifier Field */}
               <div className="space-y-1.5">
                 <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">
                   {loginType === "admin" ? "Email Address" : "Student ID / Mobile"}
                 </label>
                 <div className="relative group">
                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors">
                     {loginType === "admin" ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                   </div>
                   <input 
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type={loginType === "admin" ? "email" : "text"} 
                     placeholder={loginType === "admin" ? "admin@library.edu" : "Enter SID or Mobile"}
                     className="w-full bg-[hsl(var(--background))] border border-transparent rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-primary font-bold text-sm placeholder:text-slate-400"
                   />
                 </div>
               </div>

               {/* Password Field */}
               <div className="space-y-1.5">
                 <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Password</label>
                 <div className="relative group">
                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors">
                     <Lock className="w-4 h-4" />
                   </div>
                   <input 
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type={showPassword ? "text" : "password"} 
                     placeholder="••••••••"
                     className="w-full bg-[hsl(var(--background))] border border-transparent rounded-xl py-3 pl-10 pr-10 outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-primary font-bold text-sm placeholder:text-slate-400"
                   />
                   <button 
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors"
                   >
                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                 </div>
               </div>

               {/* Remember Me & Forgot Password */}
               <div className="flex items-center justify-between px-1 pt-1">
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <div className="relative flex items-center">
                     <input type="checkbox" className="peer sr-only" />
                     <div className="w-3.5 h-3.5 bg-[hsl(var(--background))] border border-border rounded flex items-center justify-center peer-checked:bg-gold peer-checked:border-gold transition-all">
                        <ShieldCheck className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                     </div>
                   </div>
                   <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">Remember Me</span>
                 </label>
                 <Link href="#" className="text-xs font-bold text-gold hover:text-primary transition-colors">
                   Forgot Password?
                 </Link>
               </div>

               {/* Buttons */}
               <div className="pt-2 flex flex-col gap-3">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-gold text-white font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In Securely"} <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link 
                     href="/" 
                     className="w-full h-12 rounded-xl bg-transparent border-2 border-primary text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                     <Home className="w-4 h-4" /> Back to Homepage
                  </Link>
               </div>
             </form>
          </div>
        </div>
      </section>

    </main>
  );
}
