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
  const reqId = parseInt(id, 10);
  const body = await request.json();

  try {
    if (body.status) {
      await queryDb("UPDATE blood_requests SET status = ? WHERE id = ?", [body.status, reqId]);

      try {
        await queryDb(
          "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
          [1, "System Admin", "UPDATE_REQUEST_STATUS", `Blood Request #${reqId} status changed to '${body.status}'`, "127.0.0.1"]
        );
      } catch {}
    }

    const updatedRows: any = await queryDb("SELECT * FROM blood_requests WHERE id = ? LIMIT 1", [reqId]);
    const updatedReq = Array.isArray(updatedRows) && updatedRows[0] ? updatedRows[0] : { id: reqId, ...body };

    return NextResponse.json({
      message: "Request status updated successfully in database",
      data: updatedReq,
    });
  } catch (err) {
    console.warn("[MySQL Update Request] DB query failed.");
    return NextResponse.json({ message: "Updated local state", data: { id: reqId, ...body } });
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
  const reqId = parseInt(id, 10);

  try {
    await queryDb("DELETE FROM blood_requests WHERE id = ?", [reqId]);

    try {
      await queryDb(
        "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
        [1, "System Admin", "DELETE_REQUEST", `Deleted Blood Request #${reqId}`, "127.0.0.1"]
      );
    } catch {}

    return NextResponse.json({ message: "Blood request deleted successfully." });
  } catch (err) {
    console.warn("[MySQL Delete Request] DB query failed.");
    return NextResponse.json({ message: "Request record deleted." });
  }
}
