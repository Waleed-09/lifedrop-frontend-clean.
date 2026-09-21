"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isLoading, token } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [redirecting, setRedirecting] = useState(false);

  // Extra guard: Check token in localStorage or AuthContext
  const hasToken = typeof window !== "undefined" ? Boolean(localStorage.getItem("lifedrop_token")) : Boolean(token);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || !hasToken) {
        setRedirecting(true);
        toast.error("Please login to access the Admin Panel.");
        router.replace("/login");
      } else if (!isAdmin) {
        setRedirecting(true);
        toast.error("Access Denied: Only authorized administrators can access this area.");
        router.replace("/login");
      }
    }
  }, [isLoading, isLoggedIn, hasToken, isAdmin, router, toast]);

  // Minimal loading state while checking authentication or redirecting
  if (isLoading || redirecting || !isLoggedIn || !hasToken || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-black text-slate-900 mb-1">
            {isLoading ? "Verifying Admin Access..." : "Redirecting to Login..."}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            LifeDrop Moderation Command Center
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
