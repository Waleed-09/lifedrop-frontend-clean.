"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HospitalHotlineCards from "@/components/hospital/HospitalHotlineCards";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  HeartHandshake,
  Hospital,
  ShieldCheck,
  Navigation,
  ExternalLink
} from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Accordion state for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
      });

      setSuccessMsg("Thank you! Your message has been sent successfully.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How fast do blood donors respond during emergencies?",
      a: "Once an emergency blood request is posted, nearby available donors receive instant notifications. Typically, donors initiate contact within 10 to 30 minutes."
    },
    {
      q: "Is LifeDrop completely free to use?",
      a: "Yes! LifeDrop is a 100% free community platform dedicated to saving lives. We never charge donors or seekers for blood matching."
    },
    {
      q: "How can I contact Karam Shah Hospital Blood Bank directly?",
      a: "You can call Karam Shah Hospital emergency desk at +92-3480887480, or reach blood bank coordinators Bilal Shah (+92-3463328556) and Iftikhar Ali (+92-3469420358) via direct phone call or WhatsApp."
    }
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        
        {/* Modern Gradient Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-rose-900 py-20 text-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase text-red-100 border border-white/20 mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Official Healthcare Emergency Desks
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-sm">
              Hospital Emergency Helplines & <span className="text-white">Support</span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-red-100 leading-relaxed font-medium">
              Direct emergency contact lines for <strong>Karam Shah Hospital</strong> reception and <strong>Khidmat-e-Insaniyat Blood Bank</strong> in-charges. Instant telephone and WhatsApp coordination 24/7.
            </p>
          </div>
        </section>

        {/* Dedicated Hospital Hotlines Section */}
        <section className="mx-auto max-w-7xl px-6 -mt-12 relative z-20 mb-16">
          <HospitalHotlineCards />
        </section>

        {/* Contact Information & Form Grid */}
        <section className="mx-auto max-w-7xl px-6 relative z-10 pb-16">
          <div className="grid gap-8 lg:grid-cols-12">

            {/* Left Column: Info Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      Hospital Contact & Location
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Karam Shah Hospital & Khidmat-e-Insaniyat Blood Bank
                    </p>
                  </div>
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
                    Buner Facility
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Facility Name */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <Hospital className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Facility Name</h3>
                      <p className="text-slate-800 text-sm font-extrabold mt-0.5">
                        Karam Shah Hospital & Khidmat-e-Insaniyat Blood Bank
                      </p>
                      <p className="text-red-600 text-xs mt-1 font-bold flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Emergency Desk: +92 348 0887480
                      </p>
                    </div>
                  </div>

                  {/* Blood Group In-Charges */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Blood Group In-Charges (Khidmat-e-Insaniyat)</h3>
                      <p className="text-slate-700 text-xs mt-1">
                        <strong className="text-slate-900">Bilal Shah:</strong> +92 346 3328556
                      </p>
                      <p className="text-slate-700 text-xs mt-0.5">
                        <strong className="text-slate-900">Iftikhar Ali:</strong> +92 346 9420358
                      </p>
                    </div>
                  </div>

                  {/* Location & Get Directions */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-sm">Location / Address</h3>
                      <p className="text-slate-800 text-sm font-semibold mt-0.5">
                        Main Road, Nawagai, Tehsil Mandanr, District Buner, KPK
                      </p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Nawagai+Buner+KPK+Pakistan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-sm active:scale-95"
                      >
                        <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Availability</h3>
                      <p className="text-slate-800 text-sm font-bold mt-0.5 text-emerald-700">
                        24/7 Emergency Blood Services & Donor Matching
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        Serving Nawagai, Totalai, Chinglai, Balo Khan, Rega, Amazai & surrounding areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Call Box */}
              <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-xl pointer-events-none" />
                <h3 className="text-xl font-bold mb-2">Need Immediate Blood?</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Don't wait for emails! Post a public emergency request on our network right away.
                </p>
                <a
                  href="/request"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700 transition"
                >
                  Post Emergency Request
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Send Us a Direct Message</h2>
                <p className="text-sm text-slate-500 mb-8">Fill out the form below and our team will respond within a few hours.</p>

                {successMsg && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-800 font-medium border border-emerald-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 rounded-2xl bg-red-50 p-4 text-red-700 font-medium border border-red-200 text-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Muhammad Waleed"
                          required
                          className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="waleed@example.com"
                          required
                          className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Donor Partnership / Inquiry"
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Message</label>
                    <div className="relative">
                      <MessageSquare className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        required
                        className="w-full rounded-xl border border-slate-200 pl-11 p-3.5 text-sm text-slate-900 font-medium bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Real Interactive Map Section */}
        <section className="py-12 mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100 overflow-hidden">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs bg-red-100 text-red-700 font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    Live Healthcare Facility
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-full">
                    GPS: 34.3315° N, 72.5312° E
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-red-600 shrink-0" /> Karam Shah Hospital & Blood Bank Location
                </h3>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  Main Road, Nawagai, Tehsil Mandanr, District Buner, Khyber Pakhtunkhwa (KPK), Pakistan
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Nawagai+Buner+KPK+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-red-600 transition shadow-md shadow-slate-200 shrink-0 group"
              >
                <Navigation className="w-4 h-4 text-red-400 group-hover:text-white transition" />
                Get Directions
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition" />
              </a>
            </div>

            <div className="h-80 sm:h-96 lg:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title="Karam Shah Hospital & Khidmat-e-Insaniyat Blood Bank Map"
                src="https://maps.google.com/maps?q=Nawagai%20Buner%20KPK%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* FAQs Accordion Section */}
        <section className="py-16 mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600 uppercase mb-2">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </span>
            <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition text-sm sm:text-base"
                >
        
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180 text-red-600' : ''}`} />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}