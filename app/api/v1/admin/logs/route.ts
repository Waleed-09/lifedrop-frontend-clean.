import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const rows: any = await queryDb(
      "SELECT id, admin_name, action, description, ip_address, created_at FROM admin_activity_logs ORDER BY id DESC LIMIT 100"
    );

    if (Array.isArray(rows)) {
      return NextResponse.json({
        total: rows.length,
        data: rows,
      });
    }
  } catch (err) {
    console.warn("[MySQL Admin Logs] DB query failed.");
  }

  return NextResponse.json({
    total: 0,
    data: [],
  });
}
