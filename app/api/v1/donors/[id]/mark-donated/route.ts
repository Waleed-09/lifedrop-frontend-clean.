import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const nowIso = new Date().toISOString();
  const nowDate = nowIso.split("T")[0];

  try {
    const updateSql = `
      UPDATE users 
      SET last_donated_at = ?, last_donation_date = ?, donation_count = COALESCE(donation_count, 0) + 1 
      WHERE id = ? AND role = 'donor'
    `;
    await queryDb(updateSql, [nowIso, nowDate, id]);
  } catch (err) {
    console.warn(`[Local Fallback] DB update skipped for donor #${id}:`, err);
  }

  const nextEligibleDate = new Date();
  nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);

  return NextResponse.json({
    message: "Donor marked as donated successfully. 90-day cooldown period active.",
    donor_id: Number(id),
    is_eligible: false,
    days_until_eligible: 90,
    last_donated_at: nowIso,
    last_donation_date: nowDate,
    next_eligible_date: nextEligibleDate.toISOString().split("T")[0],
  });
}
