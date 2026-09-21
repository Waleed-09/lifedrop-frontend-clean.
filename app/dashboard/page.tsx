"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardRouteGuardPage() {
  const { user, isLoggedIn, isLoading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const hasToken = typeof window !== "undefined" ? Boolean(localStorage.getItem("lifedrop_token")) : Boolean(token);
      if (!isLoggedIn || !hasToken) {
        router.replace("/login");
      } else if (user?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/donor");
      }
    }
  }, [isLoading, isLoggedIn, token, user, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-black text-slate-900 mb-1">Checking Authentication...</h2>
        <p className="text-xs text-slate-500 font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
