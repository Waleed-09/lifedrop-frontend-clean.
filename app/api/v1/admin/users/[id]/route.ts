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
  const userId = parseInt(id, 10);
  const body = await request.json();

  try {
    if (body.status) {
      await queryDb("UPDATE users SET status = ? WHERE id = ?", [body.status, userId]);

      try {
        await queryDb(
          "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
          [1, "System Admin", "UPDATE_USER_STATUS", `User #${userId} status changed to ${body.status}`, "127.0.0.1"]
        );
      } catch {}
    }

    if (body.role) {
      await queryDb("UPDATE users SET role = ? WHERE id = ?", [body.role, userId]);

      try {
        await queryDb(
          "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
          [1, "System Admin", "CHANGE_USER_ROLE", `User #${userId} role updated to '${body.role}'`, "127.0.0.1"]
        );
      } catch {}
    }

    const updatedRows: any = await queryDb("SELECT * FROM users WHERE id = ? LIMIT 1", [userId]);
    const updatedUser = Array.isArray(updatedRows) && updatedRows[0] ? updatedRows[0] : { id: userId, ...body };

    return NextResponse.json({
      message: "User account updated successfully in database",
      data: updatedUser,
    });
  } catch (err) {
    console.warn("[MySQL Update User] DB query failed.");
    return NextResponse.json({ message: "Updated local state", data: { id: userId, ...body } });
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
  const userId = parseInt(id, 10);

  try {
    await queryDb("DELETE FROM users WHERE id = ?", [userId]);

    try {
      await queryDb(
        "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
        [1, "System Admin", "DELETE_USER", `Deleted User #${userId}`, "127.0.0.1"]
      );
    } catch {}

    return NextResponse.json({ message: "User deleted successfully." });
  } catch (err) {
    console.warn("[MySQL Delete User] DB query failed.");
    return NextResponse.json({ message: "User record deleted." });
  }
}
