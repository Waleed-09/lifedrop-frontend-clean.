import { NextResponse } from "next/server";
import { sessionsMap } from "../session";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  // If token is registered in session map, return exact user session
  if (sessionsMap.has(token)) {
    return NextResponse.json(sessionsMap.get(token));
  }

  // If mock admin token
  if (token.includes("admin")) {
    return NextResponse.json({
      id: 1,
      name: "System Admin",
      email: "admin@lifedrop.pk",
      phone: "03493657462",
      blood_group: "B+",
      city: "Abbottabad",
      role: "admin",
      is_available: true,
      last_donation_date: "2026-05-15",
    });
  }

  // Default donor session fallback
  return NextResponse.json({
    id: 101,
    name: "Ahmed Khan",
    email: "ahmed@lifedrop.pk",
    phone: "03001234567",
    blood_group: "B+",
    city: "Abbottabad",
    role: "donor",
    is_available: true,
    last_donation_date: "2026-04-10",
  });
}
