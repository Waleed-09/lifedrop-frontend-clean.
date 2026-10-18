import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

const mockDonors = [
  {
    id: 101,
    name: "Dr. Usman Ali",
    email: "usman@lifedrop.pk",
    blood_group: "O+",
    city: "Buner",
    address: "Nawagai, Tehsil Mandanr, Buner",
    phone: "03480887480",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-04-10",
  },
  {
    id: 102,
    name: "Hamza Khan",
    email: "hamza@lifedrop.pk",
    blood_group: "B+",
    city: "Buner",
    address: "Totalai, Tehsil Mandanr, Buner",
    phone: "03463328556",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-03-01",
  },
  {
    id: 103,
    name: "Sajjad Ahmad",
    email: "sajjad@lifedrop.pk",
    blood_group: "A-",
    city: "Buner",
    address: "Chinglai, Tehsil Mandanr, Buner",
    phone: "03469420358",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-05-20",
  },
  {
    id: 104,
    name: "Irfan Ullah",
    email: "irfan@lifedrop.pk",
    blood_group: "AB+",
    city: "Buner",
    address: "Balo Khan, Tehsil Mandanr, Buner",
    phone: "03001234567",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-02-14",
  },
  {
    id: 105,
    name: "Tariq Shah",
    email: "tariq@lifedrop.pk",
    blood_group: "O-",
    city: "Buner",
    address: "Rega, Tehsil Mandanr, Buner",
    phone: "03129876543",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-01-05",
  },
  {
    id: 106,
    name: "Bilal Tariq",
    email: "bilal@lifedrop.pk",
    blood_group: "B-",
    city: "Buner",
    address: "Amazai, Tehsil Mandanr, Buner",
    phone: "03493657462",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-05-01",
  },
  {
    id: 107,
    name: "Muhammad Rizwan",
    email: "rizwan@lifedrop.pk",
    blood_group: "A+",
    city: "Buner",
    address: "Mandanr Proper, Tehsil Mandanr, Buner",
    phone: "03331122334",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-04-18",
  },
  {
    id: 108,
    name: "Ahmed Khan",
    email: "ahmed@lifedrop.pk",
    blood_group: "B+",
    city: "Abbottabad",
    address: "Main Mansehra Road, Abbottabad",
    phone: "03001234567",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-04-10",
  },
  {
    id: 109,
    name: "Ayesha Bibi",
    email: "ayesha@lifedrop.pk",
    blood_group: "A+",
    city: "Islamabad",
    address: "F-7 Markaz, Islamabad",
    phone: "03335554433",
    is_available: true,
    is_verified: true,
    last_donation_date: "2026-05-20",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bg = searchParams.get("blood_group");
  const city = searchParams.get("city");

  try {
    let sql = "SELECT id, name, email, phone, blood_group, city, address, role, is_available, is_verified, last_donation_date FROM users WHERE role = 'donor'";
    const params: any[] = [];

    if (bg && bg !== "all") {
      sql += " AND LOWER(blood_group) = ?";
      params.push(bg.toLowerCase());
    }

    if (city && city.trim() && city.trim().toLowerCase() !== "all") {
      const cleanCity = city.trim().split(",")[0].trim().toLowerCase();
      sql += " AND (LOWER(city) LIKE ? OR LOWER(address) LIKE ?)";
      params.push(`%${cleanCity}%`, `%${cleanCity}%`);
    }

    // 90-day cooldown: only return eligible donors
    sql += " AND (last_donation_date IS NULL OR last_donation_date <= DATE_SUB(NOW(), INTERVAL 90 DAY))";

    const rows: any = await queryDb(sql, params);
    if (Array.isArray(rows)) {
      return NextResponse.json(rows);
    }
  } catch (err) {
    console.warn("[MySQL Donors] DB unavailable. Using fallback list.");
  }

  let filtered = [...mockDonors];

  // 90-day cooldown check for fallback donors
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  filtered = filtered.filter((d: any) => {
    const donationDateStr = d.last_donated_at || d.last_donation_date;
    if (!donationDateStr) return true;
    const donationDate = new Date(donationDateStr);
    return !isNaN(donationDate.getTime()) && donationDate <= ninetyDaysAgo;
  });

  if (bg && bg !== "all") {
    filtered = filtered.filter(
      (d) => d.blood_group.toLowerCase() === bg.toLowerCase()
    );
  }

  if (city && city.trim() && city.trim().toLowerCase() !== "all") {
    const cleanCity = city.trim().toLowerCase();
    const primaryToken = cleanCity.split(",")[0].trim();

    filtered = filtered.filter((d) => {
      const donorCity = (d.city || "").toLowerCase();
      const donorAddress = (d.address || "").toLowerCase();

      // Check full string match
      if (donorCity.includes(cleanCity) || donorAddress.includes(cleanCity)) {
        return true;
      }

      // Check primary area token (e.g. "Nawagai" from "Nawagai, Tehsil Mandanr, Buner")
      if (primaryToken && (donorCity.includes(primaryToken) || donorAddress.includes(primaryToken))) {
        return true;
      }

      // If user selected "Whole District Buner" or "Buner"
      if ((cleanCity === "buner" || cleanCity.includes("whole district buner")) && (donorCity.includes("buner") || donorAddress.includes("buner"))) {
        return true;
      }

      return false;
    });
  }

  return NextResponse.json(filtered);
}
