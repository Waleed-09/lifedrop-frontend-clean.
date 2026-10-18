"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  HeartPulse, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Activity, 
  MapPin, 
  Hospital, 
  CheckCircle2 
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50/70 via-white to-red-100/60 pt-6 pb-16 lg:py-20 border-b border-red-100/60">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-red-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 -z-10 h-72 w-72 rounded-full bg-rose-200/40 blur-[100px] pointer-events-none" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center justify-between gap-12 px-6 lg:flex-row flex-col">

        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-left"
        >

          {/* Official Deployment Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-red-100/90 border border-red-200/80 px-4 py-2 text-xs sm:text-sm font-extrabold text-red-700 shadow-sm mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <Hospital className="w-4 h-4 text-red-600" />
            <span>Official Deployment & Healthcare Partner</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-slate-900">
            Official Community Blood Network for{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
              Karam Shah Hospital
            </span>
          </h1>

          {/* Subheading with Localized Impact */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
            In official healthcare partnership with <strong className="text-slate-900 font-bold">Khidmat-e-Insaniyat Blood Bank</strong>. Providing 24/7 live patient-to-donor matching across <strong className="text-slate-900 font-bold">Karam Shah Hospital (Nawagai)</strong>, <strong className="text-slate-900 font-bold">Tehsil Mandanr</strong> (Totalai, Chinglai, Balo Khan, Rega, Amazai), aur District Buner ke gird-o-nawash mein.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/request"
              className="flex items-center gap-2.5 rounded-2xl bg-red-600 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-red-300/60 hover:bg-red-700 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <HeartPulse className="w-5 h-5 animate-pulse" />
              <span>Emergency Blood Requests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/search"
              className="flex items-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-7 py-4 text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition"
            >
              Find Donors Nearby
            </Link>

            <a
              href="tel:+923480887480"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Hospital Emergency: +92 348 0887480</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Hospital Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-600 shrink-0" />
              <span>24/7 Rapid Blood Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Khidmat-e-Insaniyat Verified</span>
            </div>
          </div>

        </motion.div>

        {/* Right Hospital Partner Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-lg"
        >
          <div className="rounded-3xl bg-white p-7 sm:p-8 shadow-2xl border border-slate-200/80 relative overflow-hidden">
            
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

            {/* Hospital Logo & Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="relative h-20 w-20 shrink-0 rounded-2xl border-2 border-red-500/30 p-1 bg-white shadow-md">
                <Image
                  src="/images/karam-shah-hospital.jpg"
                  alt="Karam Shah Hospital Official Logo"
                  width={76}
                  height={76}
                  priority
                  className="h-full w-full object-contain rounded-xl"
                />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700 border border-emerald-200 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live Operational Partner
                </span>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  Karam Shah Hospital
                </h2>
                <p className="text-xs font-bold text-red-600 mt-0.5">
                  Khidmat-e-Insaniyat Blood Bank
                </p>
              </div>
            </div>

            {/* Quick Emergency Helplines Box */}
            <div className="mt-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Emergency Blood Desks
              </p>

              {/* Reception */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 p-3 hover:bg-red-50/50 transition">
                <div>
                  <p className="text-xs font-bold text-slate-900">Hospital Emergency Hotline</p>
                  <p className="text-xs font-medium text-slate-500">24/7 Reception & Ward</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+923480887480"
                    aria-label="Call Hospital Emergency"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                  <a
                    href="https://wa.me/923480887480?text=Salam!%20Emergency%20blood%20request%20for%20Karam%20Shah%20Hospital."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Hospital Emergency"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Bilal Shah */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 p-3 hover:bg-red-50/50 transition">
                <div>
                  <p className="text-xs font-bold text-slate-900">Bilal Shah</p>
                  <p className="text-xs font-medium text-slate-500">Blood Group In-Charge</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+923463328556"
                    aria-label="Call Bilal Shah"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                  <a
                    href="https://wa.me/923463328556?text=Salam%20Bilal%20Shah%20sahib!%20Urgent%20blood%20requirement."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Bilal Shah"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Iftikhar Ali */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 p-3 hover:bg-red-50/50 transition">
                <div>
                  <p className="text-xs font-bold text-slate-900">Iftikhar Ali</p>
                  <p className="text-xs font-medium text-slate-500">Blood Group In-Charge</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+923469420358"
                    aria-label="Call Iftikhar Ali"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                  <a
                    href="https://wa.me/923469420358?text=Salam%20Iftikhar%20Ali%20sahib!%20Urgent%20blood%20requirement."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Iftikhar Ali"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Regional Coverage Notice */}
            <div className="mt-5 rounded-2xl bg-red-50/80 border border-red-100 p-3 text-center">
              <p className="text-xs text-red-900 font-semibold flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                Karam Shah Hospital, Nawagai & Tehsil Mandanr, Buner
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}