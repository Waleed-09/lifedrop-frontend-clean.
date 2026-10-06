"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  Heart,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
  Cpu,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function AboutDeveloper() {
  const techStack = [
    { name: "Next.js 15", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Laravel", category: "Backend" },
    { name: "MySQL", category: "Database" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "REST API", category: "Architecture" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Waleed-09",
      icon: Github,
      ariaLabel: "Visit Muhammad Waleed Khan's GitHub Profile",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-waleed-khan-b129b9378/?isSelfProfile=true",
      icon: Linkedin,
      ariaLabel: "Connect with Muhammad Waleed Khan on LinkedIn",
    },
    {
      name: "Email",
      href: "mailto:waleedali36559@gmail.com",
      icon: Mail,
      ariaLabel: "Send an email to Muhammad Waleed Khan",
    },
  ];

  return (
    <section
      id="developer"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-24 text-slate-100 border-t border-slate-800/80"
    >
      {/* Background Decorative Ambient Lights */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-red-900/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Developer Photo Column (Left on Desktop, Top on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative group">
              {/* Animated Accent Frame Glow */}
              <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-r from-red-600 via-rose-500 to-red-700 opacity-75 blur-md group-hover:opacity-100 transition duration-500 group-hover:blur-lg" />
              
              {/* Image Container Card */}
              <div className="relative w-72 h-[380px] sm:w-80 sm:h-[440px] rounded-[28px] overflow-hidden bg-slate-900 p-2 ring-1 ring-slate-800 shadow-2xl">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                  <Image
                    src="/waleed.jpg"
                    alt="Muhammad Waleed Khan - Creator & Lead Engineer of PulseDrop"
                    fill
                    sizes="(max-width: 640px) 288px, 320px"
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay at image base for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-slate-900/90 backdrop-blur-xl border border-red-500/30 px-5 py-2 shadow-xl"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-xs font-bold tracking-wide text-slate-200">
                  Lead Engineer & Architect
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Developer Details Column (Right on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left mt-6 lg:mt-0"
          >
            {/* Top Badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 shadow-sm">
                <Code2 className="w-4 h-4 text-red-500" />
                <span>Creator & Lead Engineer</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse ml-0.5" />
              </span>
            </div>

            {/* Name & Title */}
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white">
              Muhammad Waleed Khan
            </h2>
            <p className="mt-2 text-lg sm:text-xl font-bold text-red-400 flex items-center justify-center lg:justify-start gap-2">
              <Terminal className="w-5 h-5 text-red-400" />
              Full-Stack Engineer / Software Developer
            </p>

            {/* Mission / Bio Card */}
            <div className="mt-6 rounded-2xl bg-slate-900/60 backdrop-blur-md p-6 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-rose-600 rounded-l-2xl" />
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;PulseDrop was developed with the mission to eliminate critical delays in medical emergencies by seamlessly connecting blood donors with patients in real-time. Built with a scalable Next.js and Laravel architecture to ensure fast, reliable, and community-driven healthcare access.&rdquo;
              </p>
            </div>

            {/* Tech Highlights */}
            <div className="mt-8">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                <Cpu className="w-4 h-4 text-red-400" />
                <span>Core Engineering Stack</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700/60 hover:border-red-500/50 hover:bg-slate-800 transition duration-200 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Social & Contact Actions */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Connect with Creator:
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="group flex items-center gap-2 rounded-xl bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-red-600 hover:border-red-500 transition duration-300 shadow-md transform hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </a>
                  );
                })}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
