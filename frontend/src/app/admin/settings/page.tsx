"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { Building, Settings as SettingsIcon, Shield, CreditCard, Save, RefreshCw, Key, Bell } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/services/api";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    institution_name: "Premium Library Hub",
    contact_email: "admin@premiumlibrary.edu",
    physical_address: "123 Education Hub",
    opening_time: "08:00",
    closing_time: "22:00"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        if (response.status === 'success' && Object.keys(response.data).length > 0) {
          setSettings(prev => ({...prev, ...response.data}));
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({ settings });
      alert("Settings updated successfully!");
    } catch (error) {
      alert("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">System <span className="text-gold">Settings</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Configure library details, security, and global preferences.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all disabled:opacity-50">
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Settings Navigation */}
          <div className="lg:col-span-3 space-y-4">
             <PremiumCard className="p-4">
                <nav className="flex flex-col gap-2">
                   {[
                      { id: "general", label: "General Config", icon: Building },
                      { id: "security", label: "Security & Roles", icon: Shield },
                      { id: "billing", label: "Billing & Plans", icon: CreditCard },
                      { id: "notifications", label: "Notifications", icon: Bell },
                      { id: "advanced", label: "Advanced", icon: SettingsIcon },
                   ].map(tab => (
                      <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-left",
                            activeTab === tab.id 
                               ? "bg-primary text-white shadow-lg" 
                               : "text-slate-500 hover:bg-[hsl(var(--background))] hover:text-primary"
                         )}
                      >
                         <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-gold" : "text-slate-400")} />
                         {tab.label}
                      </button>
                   ))}
                </nav>
             </PremiumCard>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9">
             {activeTab === "general" && (
                <PremiumCard className="p-8 space-y-8 animate-fade-in">
                   <div>
                      <h3 className="text-xl font-black text-primary mb-1">Library Information</h3>
                      <p className="text-sm font-medium text-slate-500">Update your institution's core details and branding.</p>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Institution Name</label>
                            <input 
                               type="text" 
                               value={settings.institution_name}
                               onChange={e => setSettings({...settings, institution_name: e.target.value})}
                               className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Email</label>
                            <input 
                               type="email" 
                               value={settings.contact_email}
                               onChange={e => setSettings({...settings, contact_email: e.target.value})}
                               className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Physical Address</label>
                         <textarea 
                            rows={3}
                            value={settings.physical_address}
                            onChange={e => setSettings({...settings, physical_address: e.target.value})}
                            className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors resize-none"
                         />
                      </div>

                      <div className="pt-6 border-t border-border">
                         <h4 className="text-sm font-black text-primary mb-4 uppercase tracking-widest">Operating Hours</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Opening Time</label>
                               <input 
                                  type="time" 
                                  value={settings.opening_time}
                                  onChange={e => setSettings({...settings, opening_time: e.target.value})}
                                  className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Closing Time</label>
                               <input 
                                  type="time" 
                                  value={settings.closing_time}
                                  onChange={e => setSettings({...settings, closing_time: e.target.value})}
                                  className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                               />
                            </div>
                         </div>
                      </div>
                   </div>
                </PremiumCard>
             )}

             {activeTab === "security" && (
                <PremiumCard className="p-8 space-y-8 animate-fade-in">
                   <div>
                      <h3 className="text-xl font-black text-primary mb-1">Security Settings</h3>
                      <p className="text-sm font-medium text-slate-500">Manage administrator access, API keys, and QR check-in security.</p>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-[hsl(var(--background))] rounded-2xl border border-border">
                         <div>
                            <h4 className="text-sm font-black text-primary">Two-Factor Authentication</h4>
                            <p className="text-xs font-bold text-slate-500 mt-1">Require 2FA for all administrator accounts.</p>
                         </div>
                         <div className="w-12 h-6 bg-gold rounded-full relative cursor-pointer shadow-inner">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-6 bg-[hsl(var(--background))] rounded-2xl border border-border">
                         <div>
                            <h4 className="text-sm font-black text-primary">Dynamic QR Codes</h4>
                            <p className="text-xs font-bold text-slate-500 mt-1">QR codes expire and refresh every 30 seconds to prevent sharing.</p>
                         </div>
                         <div className="w-12 h-6 bg-gold rounded-full relative cursor-pointer shadow-inner">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                         </div>
                      </div>

                      <div className="pt-6 border-t border-border">
                         <h4 className="text-sm font-black text-primary mb-4 uppercase tracking-widest">API Configuration</h4>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secret Key</label>
                            <div className="flex gap-2">
                               <input 
                                  type="password" 
                                  defaultValue="sk_test_1234567890abcdef"
                                  className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                                  disabled
                               />
                               <button className="px-4 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-gold transition-colors">
                                  <RefreshCw className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                </PremiumCard>
             )}
             
             {/* Stub for other tabs */}
             {["billing", "notifications", "advanced"].includes(activeTab) && (
                <PremiumCard className="p-8 text-center space-y-4 animate-fade-in bg-[hsl(var(--background))] border-dashed border-border py-20">
                   <SettingsIcon className="w-12 h-12 text-slate-300 mx-auto" />
                   <h3 className="text-xl font-black text-primary">Module Coming Soon</h3>
                   <p className="text-sm font-bold text-slate-400">This configuration module is currently being finalized.</p>
                </PremiumCard>
             )}
          </div>
        </div>
      </div>
    </>
  );
}
