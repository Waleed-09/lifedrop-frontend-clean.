"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartPulse, ArrowRight, X, ShieldCheck } from "lucide-react";

export default function HospitalAnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Official Hospital Partner Announcement"
      className="relative z-50 bg-gradient-to-r from-red-900 via-red-700 to-rose-800 text-white shadow-md border-b border-red-500/30"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 text-xs sm:text-sm">
        
        {/* Left: Badge & Live Partner Text */}
        <div className="flex flex-1 items-center justify-center lg:justify-start gap-2.5 text-center lg:text-left flex-wrap sm:flex-nowrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-white border border-white/30 shrink-0">
            <HeartPulse className="w-3.5 h-3.5 text-white animate-pulse" />
            24/7 Emergency
          </span>

          <span className="font-medium tracking-tight text-red-50 leading-snug">
            <strong className="font-bold text-white">Official Digital Partner:</strong>{" "}
            Khidmat-e-Insaniyat Blood Bank — Karam Shah Hospital | Serving Emergency Blood Requests 24/7
          </span>
        </div>

        {/* Right: Emergency Request CTA & Dismiss Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            href="/request"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-red-700 hover:bg-red-50 transition shadow-sm hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
            <span>Emergency Requests</span>
            <ArrowRight className="w-3 h-3 text-red-600" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="rounded-full p-1 text-red-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="sm:hidden text-red-200 hover:text-white p-1 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </aside>
  );
}
