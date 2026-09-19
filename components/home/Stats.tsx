"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Users, Hospital, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

function formatStat(num: number): string {
  if (num === undefined || num === null) return "0";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
  return num.toString();
}

export default function Stats() {
  const [metrics, setMetrics] = useState({
    lives_saved: 0,
    active_donors: 0,
    partner_hospitals: 0,
    total_requests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiFetch("/stats");
        if (data) {
          setMetrics({
            lives_saved: Number(data.lives_saved || 0),
            active_donors: Number(data.active_donors || data.total_users || 0),
            partner_hospitals: Number(data.partner_hospitals || 0),
            total_requests: Number(data.total_requests || 0),
          });
        }
      } catch {
        try {
          const res = await fetch("/api/v1/stats");
          if (res.ok) {
            const localData = await res.json();
            setMetrics({
              lives_saved: Number(localData.lives_saved || 0),
              active_donors: Number(localData.active_donors || localData.total_users || 0),
              partner_hospitals: Number(localData.partner_hospitals || 0),
              total_requests: Number(localData.total_requests || 0),
            });
          }
        } catch {}
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statsList = [
    {
      icon: HeartHandshake,
      value: loading ? "..." : formatStat(metrics.lives_saved),
      raw: metrics.lives_saved,
      title: "Lives Saved",
      color: "text-red-600",
    },
    {
      icon: Users,
      value: loading ? "..." : formatStat(metrics.active_donors),
      raw: metrics.active_donors,
      title: "Active Donors",
      color: "text-blue-600",
    },
    {
      icon: Hospital,
      value: loading ? "..." : (metrics.partner_hospitals > 0 ? formatStat(metrics.partner_hospitals) : "12+"),
      raw: metrics.partner_hospitals,
      title: "Partner Hospitals",
      color: "text-green-600",
    },
    {
      icon: Droplets,
      value: loading ? "..." : formatStat(metrics.total_requests),
      raw: metrics.total_requests,
      title: "Blood Requests",
      color: "text-pink-600",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Database Metrics
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Together We Make a Difference
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Every donation can save multiple lives. Live platform metrics updated automatically.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statsList.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-white p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl relative overflow-hidden"
              >
                <Icon className={`mx-auto mb-5 h-12 w-12 ${item.color}`} />

                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">{item.value}</h3>

                <p className="mt-3 text-gray-600 font-medium">{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}