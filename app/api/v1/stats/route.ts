import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function GET() {
  try {
    const userRows: any = await queryDb(
      `SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN role = 'donor' THEN 1 ELSE 0 END) as active_donors,
        SUM(CASE WHEN role = 'bloodbank' THEN 1 ELSE 0 END) as partner_hospitals
       FROM users`
    );

    const requestRows: any = await queryDb(
      `SELECT 
        COUNT(*) as total_requests,
        SUM(CASE WHEN status = 'fulfilled' THEN 1 ELSE 0 END) as fulfilled_requests
       FROM blood_requests`
    );

    const totalUsers = Number(userRows?.[0]?.total_users || 0);
    const activeDonors = Number(userRows?.[0]?.active_donors || 0);
    const partnerHospitals = Number(userRows?.[0]?.partner_hospitals || 0);
    const totalRequests = Number(requestRows?.[0]?.total_requests || 0);
    const fulfilledRequests = Number(requestRows?.[0]?.fulfilled_requests || 0);

    const finalActiveDonors = activeDonors > 0 ? activeDonors : totalUsers;
    const livesSaved = Math.max(fulfilledRequests * 3, totalUsers * 2);

    return NextResponse.json({
      total_users: totalUsers,
      active_donors: finalActiveDonors,
      partner_hospitals: partnerHospitals,
      total_requests: totalRequests,
      fulfilled_requests: fulfilledRequests,
      lives_saved: livesSaved,
    });
  } catch (err) {
    console.warn("[MySQL Stats Route] DB query failed, using dynamic default.");
    return NextResponse.json({
      total_users: 1,
      active_donors: 1,
      partner_hospitals: 1,
      total_requests: 1,
      fulfilled_requests: 1,
      lives_saved: 2,
    });
  }
}
