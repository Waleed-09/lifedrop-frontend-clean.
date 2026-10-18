"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedDonors from "@/components/home/FeaturedDonors";
import Stats from "@/components/home/Stats";
import BloodCompatibilityMatrix from "@/components/home/BloodCompatibilityMatrix";
import Testimonials from "@/components/home/Testimonials";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import HospitalHotlineCards from "@/components/hospital/HospitalHotlineCards";
import AboutDeveloper from "@/components/AboutDeveloper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <BloodCompatibilityMatrix />
        <FeaturedDonors />
        <Testimonials />
        <section className="bg-slate-50 py-16 px-6 border-t border-slate-200/80">
          <div className="mx-auto max-w-7xl">
            <HospitalHotlineCards />
          </div>
        </section>
        <EmergencyCTA />
        <AboutDeveloper />
      </main>
      <Footer />
    </>
  );
}