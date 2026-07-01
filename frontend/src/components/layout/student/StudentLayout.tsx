"use client";

import { StudentSidebar } from "./StudentSidebar";
import { AdminHeader } from "../admin/AdminHeader"; // Reusing the header as the structure is identical
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'student')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-primary text-sm animate-pulse">Loading Your Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))]">
      <StudentSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
