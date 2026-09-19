import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("search")?.toLowerCase();
  const role = searchParams.get("role");
  const status = searchParams.get("status");

  try {
    let sql = "SELECT id, name, email, phone, blood_group, city, role, status, created_at FROM users WHERE 1=1";
    const params: any[] = [];

    if (q) {
      sql += " AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ? OR LOWER(city) LIKE ?)";
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (role && role !== "all") {
      sql += " AND role = ?";
      params.push(role);
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
    console.warn("[MySQL Admin Users] DB query failed.");
  }

  return NextResponse.json({
    total: 0,
    data: [],
  });
}
