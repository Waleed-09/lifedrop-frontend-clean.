import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "LifeDrop — Emergency Blood Donation & Assistance Platform",
  description: "Official digital network with Khidmat-e-Insaniyat Blood Bank & Karam Shah Hospital, connecting verified blood donors across Tehsil Mandanr, Buner & KPK.",
  keywords: ["blood donation", "pakistan", "blood donor", "emergency blood", "karam shah hospital", "khidmat-e-insaniyat", "buner blood bank", "nawagai", "lifedrop"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}