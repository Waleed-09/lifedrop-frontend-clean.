"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BloodCompatibilityMatrix from "@/components/home/BloodCompatibilityMatrix";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { 
  MANDANR_AREAS, 
  OTHER_PAKISTAN_CITIES, 
  DEFAULT_SEARCH_LOCATION 
} from "@/lib/locations";
import { 
  Search, 
  MapPin, 
  Phone, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Droplet, 
  Sparkles, 
  Calendar,
  Hospital,
  ShieldCheck
} from "lucide-react";

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  city?: string;
  address?: string;
  phone?: string;
  is_available?: boolean | number;
  last_donation_date?: string;
  is_verified?: boolean;
}

export default function SearchDonorsPage() {
  const toast = useToast();
  const [bloodGroup, setBloodGroup] = useState("all");
  const [city, setCity] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(true);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [dbLocations, setDbLocations] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [customLocationMode, setCustomLocationMode] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Fetch live distinct locations with active registered donors from MySQL
  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await apiFetch("/donors/locations");
        const list = Array.isArray(res) ? res : res?.data || [];
        if (list.length > 0) {
          setDbLocations(list);
        }
      } catch {
        try {
          const fallbackRes = await fetch("/api/v1/donors/locations");
          if (fallbackRes.ok) {
            const data = await fallbackRes.json();
            if (Array.isArray(data)) setDbLocations(data);
          }
        } catch {}
      }
    }
    loadLocations();
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);

    const params = new URLSearchParams();
    if (bloodGroup && bloodGroup !== "all") {
      params.set("blood_group", bloodGroup);
    }
    if (city && city.trim().toLowerCase() !== "all") {
      params.set("city", city.trim());
    }

    try {
      const response = await apiFetch(`/donors?${params.toString()}`);
      const dataList = Array.isArray(response) 
        ? response 
        : response?.data && Array.isArray(response.data) 
        ? response.data 
        : [];

      setDonors(dataList);
    } catch (err: any) {
      try {
        const nearbyRes = await apiFetch(`/donors/nearby?${params.toString()}`);
        const nearbyData = Array.isArray(nearbyRes) 
          ? nearbyRes 
          : nearbyRes?.data && Array.isArray(nearbyRes.data) 
          ? nearbyRes.data 
          : [];
        setDonors(nearbyData);
        return;
      } catch {}

      // Local route handler fallback
      try {
        const localRes = await fetch(`/api/v1/donors/nearby?${params.toString()}`);
        if (localRes.ok) {
          const localData = await localRes.json();
          setDonors(Array.isArray(localData) ? localData : localData.data || []);
          return;
        }
      } catch {}

      if (err.message && !err.message.includes("401") && !err.message.includes("Unauthorized") && !err.message.includes("Unauthenticated")) {
        toast.error(err.message || "Could not fetch live donors list.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [city, bloodGroup]);

  // Strict Multi-Criteria Match with robust, case-insensitive location & blood group matching
  const filteredDonors = donors.filter((donor) => {
    if (availableOnly && donor.is_available === false) return false;

    // Strict Blood Group match
    const selectedBloodGroup = bloodGroup && bloodGroup !== "all" ? bloodGroup.trim().toLowerCase() : "";
    const donorBlood = donor.blood_group ? donor.blood_group.trim().toLowerCase() : "";
    const matchesBlood = !selectedBloodGroup || donorBlood === selectedBloodGroup;

    // Strict Location match
    const selectedLocation = city && city.trim().toLowerCase() !== "all" ? city.trim().toLowerCase() : "";
    const primaryToken = selectedLocation.split(",")[0].trim();
    const donorCity = (donor.city || "").toLowerCase().trim();
    const donorAddress = (donor.address || "").toLowerCase().trim();

    const matchesLocation = !selectedLocation ||
      donorCity === selectedLocation ||
      donorCity === primaryToken ||
      donorCity.includes(selectedLocation) ||
      selectedLocation.includes(donorCity) ||
      (Boolean(primaryToken) && (donorCity.includes(primaryToken) || donorAddress.includes(primaryToken))) ||
      donorAddress.includes(selectedLocation) ||
      ((selectedLocation === "buner" || selectedLocation.includes("whole district buner")) && (donorCity.includes("buner") || donorAddress.includes("buner")));

    return matchesBlood && matchesLocation;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-600 uppercase border border-red-200 mb-3">
              <Droplet className="w-4 h-4 fill-red-600" /> Real-Time Donor Matcher — Buner Network
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
              Find Verified <span className="text-red-600">Blood Donors</span>
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Live donor network covering <strong>Tehsil Mandanr (Nawagai, Totalai, Chinglai, etc.), District Buner</strong> in partnership with Karam Shah Hospital.
            </p>

            <button
              onClick={() => setShowMatrix(!showMatrix)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-xl border border-red-100 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              {showMatrix ? "Hide Compatibility Calculator" : "Check Compatible Blood Groups"}
            </button>
          </div>

          {/* Optional Interactive Matrix Drawer */}
          {showMatrix && (
            <div className="mb-10 animate-in fade-in duration-300">
              <BloodCompatibilityMatrix />
            </div>
          )}

          {/* Search Card */}
          <div className="mb-10 rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              
              {/* Blood Group Select */}
              <div className="md:col-span-4">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Blood Group
                </label>
                <div className="relative">
                  <Droplet className="w-5 h-5 text-red-600 absolute left-3.5 top-3.5 fill-red-600" />
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-black text-lg bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition"
                  >
                    <option value="all">🩸 All Blood Groups</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O- (Universal Donor)</option>
                    <option value="AB+">AB+ (Universal Recipient)</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              {/* Location Select or Custom Input */}
              <div className="md:col-span-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Location / City
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (customLocationMode && city === "") setCity("all");
                      setCustomLocationMode(!customLocationMode);
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 underline"
                  >
                    {customLocationMode ? "← Choose from List" : "✏️ Type Custom City"}
                  </button>
                </div>

                <div className="relative">
                  <MapPin className="w-5 h-5 text-red-600 absolute left-3.5 top-3.5" />
                  {customLocationMode ? (
                    <input
                      type="text"
                      value={city === "all" ? "" : city}
                      onChange={(e) => setCity(e.target.value || "all")}
                      placeholder="Type city or area name (e.g. Abbottabad, Buner, Nawagai)..."
                      className="w-full rounded-2xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-bold bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition text-sm sm:text-base"
                    />
                  ) : (
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 pl-11 p-3.5 text-slate-900 font-bold bg-slate-50 focus:bg-white focus:border-red-600 outline-none transition text-sm sm:text-base"
                    >
                      <option value="all">🌐 All Locations (Every City / District)</option>

                      {/* Active locations fetched live from MySQL */}
                      {dbLocations.length > 0 && (
                        <optgroup label="📍 Active Locations with Registered Donors (Database)">
                          {dbLocations.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc} (Active Donors)
                            </option>
                          ))}
                        </optgroup>
                      )}

                      {/* Tehsil Mandanr, Buner Focus */}
                      <optgroup label="District Buner ➔ Tehsil Mandanr (Primary Focus)">
                        <option value="Buner">Whole District Buner</option>
                        {MANDANR_AREAS.map((area) => (
                          <option key={area.name} value={area.name}>
                            {area.name} {area.isPrimary ? "— (Hospital Base: Karam Shah Hospital)" : "— Tehsil Mandanr"}
                          </option>
                        ))}
                        <option value="Tehsil Mandanr, Buner">All Tehsil Mandanr, Buner</option>
                      </optgroup>

                      {/* Other Major Cities */}
                      <optgroup label="Other Districts & Cities">
                        {OTHER_PAKISTAN_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>

                      {/* If custom city is selected, ensure it appears as an option */}
                      {city && city !== "all" && !dbLocations.includes(city) && !OTHER_PAKISTAN_CITIES.includes(city) && !MANDANR_AREAS.some(a => a.name === city) && (
                        <optgroup label="Selected Location">
                          <option value={city}>{city}</option>
                        </optgroup>
                      )}
                    </select>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-extrabold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-red-300 text-base"
                >
                  <Search className="w-5 h-5" />
                  {loading ? "Searching..." : "Find Donors"}
                </button>
              </div>

            </form>

            {/* Quick Selection Pills: All Locations + Database Cities + Mandanr hubs */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-red-600" /> Quick Select:
                </span>

                {/* All Locations Pill */}
                <button
                  type="button"
                  onClick={() => setCity("all")}
                  className={`rounded-xl px-3 py-1 text-xs font-bold transition border ${
                    city === "all"
                      ? "bg-red-600 text-white border-red-600 shadow-sm"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                  }`}
                >
                  🌐 All Locations
                </button>

                {/* Database Locations Pills */}
                {dbLocations.map((loc) => {
                  const isSelected = city.toLowerCase() === loc.toLowerCase();
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setCity(loc)}
                      className={`rounded-xl px-3 py-1 text-xs font-bold transition border ${
                        isSelected
                          ? "bg-red-600 text-white border-red-600 shadow-sm"
                          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                      }`}
                    >
                      📍 {loc}
                    </button>
                  );
                })}

                {/* Key Mandanr Area Pills */}
                {MANDANR_AREAS.filter(a => !dbLocations.some(l => l.toLowerCase() === a.name.toLowerCase())).map((area) => {
                  const isSelected = city.toLowerCase() === area.name.toLowerCase();
                  return (
                    <button
                      key={area.name}
                      type="button"
                      onClick={() => setCity(area.name)}
                      className={`rounded-xl px-3 py-1 text-xs font-bold transition border ${
                        isSelected
                          ? "bg-red-600 text-white border-red-600 shadow-sm"
                          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                      }`}
                    >
                      {area.name} {area.isPrimary && "★"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
              <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                />
                <span>Show "Ready to Donate" Donors Only</span>
              </label>

              <span>
                Found {filteredDonors.length} active donor(s) in {city.split(",")[0]}
              </span>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="text-center py-20 text-slate-500 font-bold text-lg">
              Searching verified donors in {city}...
            </div>
          ) : searched && filteredDonors.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 sm:p-14 text-center shadow-md border border-slate-200 max-w-2xl mx-auto animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No {bloodGroup} donors found in {city}
              </h3>
              <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                No <span className="font-bold text-red-600">{bloodGroup}</span> donors found in{" "}
                <span className="font-bold text-slate-800">{city}</span>. Try expanding your search area or post an Emergency Request.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/request"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200 text-sm"
                >
                  <Droplet className="w-4 h-4 fill-white" />
                  Post an Emergency Request
                </Link>
                <button
                  type="button"
                  onClick={() => setCity("Buner")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 font-bold text-slate-700 hover:bg-slate-200 transition text-sm border border-slate-200"
                >
                  <MapPin className="w-4 h-4 text-red-600" />
                  Expand Search Area
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => {
                const donorLocation = donor.address || donor.city || "Tehsil Mandanr, Buner";
                const isBunerLocal = donorLocation.toLowerCase().includes("buner") || donorLocation.toLowerCase().includes("mandanr");

                return (
                  <div 
                    key={donor.id} 
                    className="rounded-3xl bg-white p-6 shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-red-300 transition-all duration-300 relative overflow-hidden"
                  >
                    {isBunerLocal && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-rose-500" />
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-red-600 bg-red-50 px-4 py-1 rounded-2xl border border-red-100">
                          {donor.blood_group}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          {isBunerLocal && (
                            <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                              Buner Local
                            </span>
                          )}
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Available
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                        <User className="w-5 h-5 text-slate-400" />
                        {donor.name}
                      </h3>

                      <div className="space-y-2 text-sm text-slate-600 mb-6">
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="font-semibold text-slate-800">{donorLocation}</span>
                        </p>
                        {donor.last_donation_date && (
                          <p className="flex items-center gap-2 text-xs text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Last Donated: {donor.last_donation_date}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <a
                      href={`tel:${donor.phone || '03480887480'}`}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700 transition shadow-md shadow-red-200 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call {donor.phone || 'Donor'}
                    </a>
                  </div>
                );
              })}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}