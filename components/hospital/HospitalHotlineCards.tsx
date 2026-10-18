"use client";

import Image from "next/image";
import { Phone, MessageCircle, Hospital, ShieldCheck, HeartPulse, Clock, UserCheck } from "lucide-react";

interface ContactCardProps {
  title: string;
  subtitle: string;
  name?: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  roleBadge: string;
  colorScheme: "red" | "emerald" | "blue";
  timing: string;
}

const emergencyContacts: ContactCardProps[] = [
  {
    title: "Karam Shah Hospital Reception",
    subtitle: "Nawagai, Tehsil Mandanr, Buner (24/7 Desk)",
    name: "Hospital Emergency Desk",
    phone: "+923480887480",
    displayPhone: "+92 348 0887480",
    whatsappNumber: "923480887480",
    roleBadge: "24/7 Hospital Emergency",
    colorScheme: "red",
    timing: "24/7 Round the Clock",
  },
  {
    title: "Khidmat-e-Insaniyat Blood Bank",
    subtitle: "Blood Group In-Charge — Tehsil Mandanr, Buner",
    name: "Bilal Shah",
    phone: "+923463328556",
    displayPhone: "+92 346 3328556",
    whatsappNumber: "923463328556",
    roleBadge: "Blood Group In-Charge",
    colorScheme: "emerald",
    timing: "Immediate Response Available",
  },
  {
    title: "Khidmat-e-Insaniyat Blood Bank",
    subtitle: "Blood Group In-Charge — Tehsil Mandanr, Buner",
    name: "Iftikhar Ali",
    phone: "+923469420358",
    displayPhone: "+92 346 9420358",
    whatsappNumber: "923469420358",
    roleBadge: "Blood Group In-Charge",
    colorScheme: "blue",
    timing: "Immediate Response Available",
  },
];

export default function HospitalHotlineCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-red-900 via-slate-900 to-rose-950 p-6 sm:p-8 text-white shadow-xl border border-red-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-md border-2 border-red-500/50">
              <Image
                src="/images/karam-shah-hospital.jpg"
                alt="Karam Shah Hospital Emblem"
                width={80}
                height={80}
                className="h-full w-full object-contain rounded-xl"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 px-3 py-1 text-xs font-bold text-red-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                Nawagai, Tehsil Mandanr, District Buner
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Karam Shah Hospital & Khidmat-e-Insaniyat
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
                Anchor healthcare facility in Nawagai serving Tehsil Mandanr (Totalai, Chinglai, Balo Khan, Rega, Amazai) and surrounding areas across District Buner.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-2 shrink-0">
            <span className="flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-1.5 text-xs font-extrabold text-emerald-300">
              <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" />
              Emergency Desks Active
            </span>
          </div>
        </div>
      </div>

      {/* 3 Hotlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {emergencyContacts.map((contact, idx) => {
          const isRed = contact.colorScheme === "red";
          const isEmerald = contact.colorScheme === "emerald";
          const isBlue = contact.colorScheme === "blue";

          const badgeBg = isRed
            ? "bg-red-50 text-red-700 border-red-200"
            : isEmerald
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-blue-50 text-blue-700 border-blue-200";

          const iconColor = isRed
            ? "text-red-600"
            : isEmerald
            ? "text-emerald-600"
            : "text-blue-600";

          return (
            <div
              key={idx}
              className="rounded-3xl bg-white p-6 sm:p-7 shadow-lg border border-slate-200 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative group"
            >
              <div>
                {/* Top Badge & Timing */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${badgeBg}`}>
                    {isRed ? <Hospital className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    {contact.roleBadge}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {contact.timing.includes("24/7") ? "24/7" : "Fast"}
                  </span>
                </div>

                {/* Name & Title */}
                <h3 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition">
                  {contact.name}
                </h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  {contact.title}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {contact.subtitle}
                </p>

                {/* Phone Display */}
                <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
                    Direct Contact Number
                  </span>
                  <a
                    href={`tel:${contact.phone}`}
                    className={`text-lg sm:text-xl font-black tracking-tight ${iconColor} hover:underline`}
                  >
                    {contact.displayPhone}
                  </a>
                </div>
              </div>

              {/* Action Buttons: Direct Call & WhatsApp */}
              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                    `Salam! I am contacting from LifeDrop regarding an emergency blood requirement at Karam Shah Hospital / Khidmat-e-Insaniyat Blood Bank.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
