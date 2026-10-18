"use client";

import Link from "next/link";
import { AlertCircle, Search, PlusCircle, Phone, MessageCircle, Hospital, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyCTA() {
  return (
    <section className="bg-red-700 py-16 text-white overflow-hidden relative">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-700 to-rose-900 opacity-95" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4"
        >
          <span className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide border border-white/30 text-white">
            <Hospital className="w-4 h-4 text-white" />
            Official Healthcare Partner: Karam Shah Hospital
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight"
        >
          Urgent Blood Requirement at Karam Shah Hospital?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-red-100 font-medium leading-relaxed"
        >
          Connect instantly with registered donors or reach out directly to the <strong className="text-white font-bold">Khidmat-e-Insaniyat Blood Bank</strong> coordinators for immediate patient matching across Karam Shah Hospital aur gird-o-nawash ke ilaaqon mein.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href="/request"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-red-700 shadow-xl hover:bg-red-50 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-5 h-5 text-red-600" />
            Post Emergency Request
          </Link>

          <Link
            href="/search"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-8 py-3.5 font-bold text-white hover:bg-white/10 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search className="w-5 h-5" />
            Find Donors Nearby
          </Link>

          <a
            href="tel:+923480887480"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-xl hover:bg-emerald-700 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone className="w-4 h-4" />
            Hospital Emergency: +92 348 0887480
          </a>
        </motion.div>

        {/* Quick Hotlines Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-red-500/40 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-red-100"
        >
          <div className="flex items-center gap-2 bg-red-800/40 px-3.5 py-1.5 rounded-full border border-red-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Karam Shah Hospital Reception: +92 348 0887480</span>
          </div>

          <div className="flex items-center gap-2 bg-red-800/40 px-3.5 py-1.5 rounded-full border border-red-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Bilal Shah (Blood In-Charge): +92 346 3328556</span>
          </div>

          <div className="flex items-center gap-2 bg-red-800/40 px-3.5 py-1.5 rounded-full border border-red-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Iftikhar Ali (Blood In-Charge): +92 346 9420358</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}