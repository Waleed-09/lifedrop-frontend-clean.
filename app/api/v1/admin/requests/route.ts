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
  const urgency = searchParams.get("urgency");
  const status = searchParams.get("status");

  try {
    let sql = "SELECT id, patient_name, blood_group, hospital_name, city, contact_number, units, urgency, status, created_at FROM blood_requests WHERE 1=1";
    const params: any[] = [];

    if (q) {
      sql += " AND (LOWER(patient_name) LIKE ? OR LOWER(hospital_name) LIKE ? OR LOWER(city) LIKE ? OR contact_number LIKE ?)";
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (bloodGroup && bloodGroup !== "all") {
      sql += " AND LOWER(blood_group) = ?";
      params.push(bloodGroup.toLowerCase());
    }

    if (urgency && urgency !== "all") {
      sql += " AND urgency = ?";
      params.push(urgency);
    }

    if (status && status !== "all") {
      sql += " AND status = ?";
      params.push(status);
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
    console.warn("[MySQL Admin Requests] DB query failed.");
  }

  return NextResponse.json({
    total: 0,
    data: [],
  });
}
