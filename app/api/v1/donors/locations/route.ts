import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function GET() {
  try {
    const rows: any = await queryDb(
      "SELECT DISTINCT city FROM users WHERE role = 'donor' AND city IS NOT NULL AND city != ''"
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const cities = Array.from(
        new Set(
          rows
            .map((r) => (r.city ? r.city.split(",")[0].trim() : ""))
            .filter(Boolean)
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
        )
      );
      return NextResponse.json(cities);
    }
  } catch (err) {
    console.warn("[Locations Fallback] MySQL query failed, using static defaults.");
  }

  // Fallback defaults
  return NextResponse.json(["Abbottabad", "Buner", "Nawagai", "Peshawar"]);
}
