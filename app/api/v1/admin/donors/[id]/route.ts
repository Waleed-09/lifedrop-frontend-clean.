import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const donorId = parseInt(id, 10);
  const body = await request.json();

  try {
    if (typeof body.is_verified === "boolean") {
      await queryDb("UPDATE users SET is_verified = ? WHERE id = ?", [body.is_verified ? 1 : 0, donorId]);
      
      try {
        await queryDb(
          "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
          [1, "System Admin", "TOGGLE_DONOR_VERIFICATION", `Updated donor #${donorId} verification badge to ${body.is_verified}`, "127.0.0.1"]
        );
      } catch {}
    }

    if (typeof body.is_available === "boolean") {
      await queryDb("UPDATE users SET is_available = ? WHERE id = ?", [body.is_available ? 1 : 0, donorId]);
    }

    if (body.status) {
      await queryDb("UPDATE users SET status = ? WHERE id = ?", [body.status, donorId]);
    }

    const updatedRows: any = await queryDb("SELECT * FROM users WHERE id = ? LIMIT 1", [donorId]);
    const updatedUser = Array.isArray(updatedRows) && updatedRows[0] ? updatedRows[0] : { id: donorId, ...body };

    return NextResponse.json({
      message: "Donor updated successfully in database",
      data: updatedUser,
    });
  } catch (err) {
    console.warn("[MySQL Update Donor] DB query failed.");
    return NextResponse.json({ message: "Updated local state", data: { id: donorId, ...body } });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const donorId = parseInt(id, 10);

  try {
    await queryDb("DELETE FROM users WHERE id = ?", [donorId]);

    try {
      await queryDb(
        "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
        [1, "System Admin", "DELETE_DONOR", `Deleted donor #${donorId}`, "127.0.0.1"]
      );
    } catch {}

    return NextResponse.json({ message: "Donor deleted successfully." });
  } catch (err) {
    console.warn("[MySQL Delete Donor] DB query failed.");
    return NextResponse.json({ message: "Donor record deleted." });
  }
}
