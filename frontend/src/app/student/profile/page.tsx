"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { User, Mail, Phone, MapPin, CreditCard, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getStudent, updateStudent } from "@/services/api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        try {
          const res = await getStudent(user.id);
          if (res.status === 'success') {
            setProfile(res.data);
          }
        } catch (error) {
          console.error("Failed to load profile", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const updates = Object.fromEntries(formData);
    
    try {
      const name = `${updates.firstName} ${updates.lastName}`.trim();
      await updateStudent(user.id, { name, phone: updates.phone });
      alert("Profile updated successfully");
      const res = await getStudent(user.id);
      if (res.status === 'success') setProfile(res.data);
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">My <span className="text-gold">Profile</span></h1>
          <p className="text-sm font-medium text-slate-500 mt-2">Manage your personal information and membership details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Quick Info */}
          <div className="md:col-span-1 space-y-6">
            <PremiumCard className="p-8 text-center flex flex-col items-center">
               <div className="relative mb-6 group cursor-pointer">
                  <div className="w-32 h-32 rounded-full bg-gold/10 text-gold flex items-center justify-center text-4xl font-black shadow-xl overflow-hidden">
                     {profile?.name ? profile.name[0].toUpperCase() : 'S'}
                  </div>
                  <div className="absolute inset-0 bg-primary/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="w-6 h-6 text-white mb-1" />
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest">Update Photo</span>
                  </div>
               </div>
               <h2 className="text-xl font-black text-primary mb-1">{profile?.name || user?.name || "Loading..."}</h2>
               <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-4">{profile?.plan || "Standard Member"}</p>
               
               <div className="w-full bg-[hsl(var(--background))] rounded-xl p-4 text-left space-y-3 border border-border">
                  <div className="flex items-center gap-3">
                     <Mail className="w-4 h-4 text-slate-400" />
                     <p className="text-sm font-bold text-primary truncate">{profile?.email || user?.email || ""}</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <Phone className="w-4 h-4 text-slate-400" />
                     <p className="text-sm font-bold text-primary">{profile?.phone || "Not set"}</p>
                  </div>
               </div>
            </PremiumCard>
          </div>

          {/* Right Column: Forms */}
          <div className="md:col-span-2 space-y-8">
            <PremiumCard className="p-8">
               <h3 className="text-lg font-black text-primary mb-6">Personal <span className="text-gold">Information</span></h3>
               <form className="space-y-6" onSubmit={handleSave}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                        <input name="firstName" type="text" defaultValue={profile?.name?.split(" ")[0] || ""} className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm font-medium text-primary" required />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                        <input name="lastName" type="text" defaultValue={profile?.name?.split(" ")[1] || ""} className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm font-medium text-primary" />
                     </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-primary pt-4 border-t border-border">Contact <span className="text-gold">Details</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                        <input name="phone" type="text" defaultValue={profile?.phone || ""} className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm font-medium text-primary" />
                     </div>
                  </div>

                  <div className="flex justify-end pt-4">
                     <button type="submit" disabled={saving || loading} className="bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-lg disabled:opacity-50">
                        {saving ? "Saving..." : "Save Changes"}
                     </button>
                  </div>
               </form>
            </PremiumCard>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
