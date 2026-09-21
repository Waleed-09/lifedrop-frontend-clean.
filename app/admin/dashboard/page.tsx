"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardAliasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-black text-slate-900 mb-1">Redirecting to Admin Panel...</h2>
      </div>
    </div>
  );
}
