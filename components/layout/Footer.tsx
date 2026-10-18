"use client";

import Link from "next/link";
import { Heart, Droplets, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-black text-white mb-4">
            <Droplets className="w-8 h-8 text-red-600 fill-red-600" />
            <span>LifeDrop</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Official Community Blood Network for <strong className="text-white">Karam Shah Hospital</strong> in partnership with <strong className="text-white">Khidmat-e-Insaniyat Blood Bank</strong>.
          </p>
          <p className="text-xs text-emerald-400 font-semibold mb-4">
            ● 24/7 Live Emergency Transfusion Desks
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" /> for humanity.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link href="/search" className="hover:text-red-500 transition">Find Donors</Link></li>
            <li><Link href="/request" className="hover:text-red-500 transition">Emergency Requests</Link></li>
            <li><Link href="/signup" className="hover:text-red-500 transition">Become a Donor</Link></li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Support & Hospital</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-red-500 transition">About Partnership</Link></li>
            <li><Link href="/contact" className="hover:text-red-500 transition">Hospital Hotlines</Link></li>
            <li><Link href="/privacy" className="hover:text-red-500 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-red-500 transition">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Hospital Helplines</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Karam Shah Hospital, KPK, Pakistan</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold">+92 348 0887480</p>
                <p className="text-xs text-gray-400">Hospital Emergency Reception (24/7)</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold">+92 346 3328556 / +92 346 9420358</p>
                <p className="text-xs text-gray-400">Khidmat-e-Insaniyat Blood In-Charges</p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>support@lifedrop.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} LifeDrop. All rights reserved.
      </div>
    </footer>
  );
}