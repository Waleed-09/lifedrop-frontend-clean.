import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("search")?.toLowerCase();
  const bloodGroup = searchParams.get("blood_group");
  const isAvailable = searchParams.get("is_available");
  const isVerified = searchParams.get("is_verified");

  try {
    let sql = "SELECT id, name, email, phone, blood_group, city, address, role, is_available, is_verified, status, last_donation_date, created_at FROM users WHERE role = 'donor'";
    const params: any[] = [];

    if (q) {
      sql += " AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ? OR LOWER(city) LIKE ?)";
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (bloodGroup && bloodGroup !== "all") {
      sql += " AND LOWER(blood_group) = ?";
      params.push(bloodGroup.toLowerCase());
    }

    if (isAvailable !== null && isAvailable !== undefined && isAvailable !== "all" && isAvailable !== "") {
      const availBool = isAvailable === "true" || isAvailable === "1";
      sql += " AND is_available = ?";
      params.push(availBool ? 1 : 0);
    }

    if (isVerified !== null && isVerified !== undefined && isVerified !== "all" && isVerified !== "") {
      const verBool = isVerified === "true" || isVerified === "1";
      sql += " AND is_verified = ?";
      params.push(verBool ? 1 : 0);
    }

    sql += " ORDER BY id DESC";

    const rows: any = await queryDb(sql, params);
    if (Array.isArray(rows)) {
      return NextResponse.json({
        total: rows.length,
        data: rows,
      });
    }
  } catch (err) {
    console.warn("[MySQL Admin Donors] DB query failed. Using fallback list.");
  }

  return NextResponse.json({
    total: 0,
    data: [],
  });
}
