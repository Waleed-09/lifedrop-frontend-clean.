import { NextResponse } from "next/server";
import { sessionsMap, UserSessionData } from "../session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, blood_group, address, city, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 422 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const isExplicitAdmin = cleanEmail.includes("admin") || role === "admin";
    const userRole: UserSessionData["role"] = isExplicitAdmin ? "admin" : (role || "donor");

    const user: UserSessionData = {
      id: Date.now(),
      name: name,
      email: cleanEmail,
      phone: phone || "03000000000",
      blood_group: blood_group || "B+",
      address: address || city || "Abbottabad",
      city: city || address || "Abbottabad",
      role: userRole,
      is_available: true,
      last_donation_date: new Date().toISOString().split("T")[0],
    };

    const token = `lifedrop_token_${user.id}`;
    sessionsMap.set(token, user);

    return NextResponse.json({
      token,
      user,
      message: "Account created successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({ message: "Registration failed" }, { status: 400 });
  }
}
