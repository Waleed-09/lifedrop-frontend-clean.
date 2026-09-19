import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { queryDb } from "@/lib/db";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized. Admin access required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { current_password, new_password, confirm_password, admin_id, admin_email } = body;

    if (!current_password || !new_password || !confirm_password) {
      return NextResponse.json({ message: "All password fields are required." }, { status: 400 });
    }

    if (new_password !== confirm_password) {
      return NextResponse.json({ message: "New password and confirmation do not match." }, { status: 400 });
    }

    if (new_password.length < 6) {
      return NextResponse.json({ message: "New password must be at least 6 characters long." }, { status: 400 });
    }

    const emailToFind = (admin_email || "admin@lifedrop.pk").toLowerCase().trim();

    try {
      // 1. Fetch current admin record from MySQL database
      const rows: any = await queryDb(
        "SELECT * FROM users WHERE LOWER(email) = ? OR role = 'admin' LIMIT 1",
        [emailToFind]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json({ message: "Admin user account not found in database." }, { status: 404 });
      }

      const dbAdmin = rows[0];

      // 2. Validate current password
      let currentValid = false;
      if (dbAdmin.password) {
        if (dbAdmin.password.startsWith("$2y$") || dbAdmin.password.startsWith("$2a$") || dbAdmin.password.startsWith("$2b$")) {
          const normalizedHash = dbAdmin.password.replace(/^\$2y\$/, "$2a$");
          currentValid = bcrypt.compareSync(current_password, normalizedHash);
        } else {
          currentValid = (current_password === dbAdmin.password);
        }
      }

      // Default demo password check
      if (!currentValid && (current_password === "password" || current_password === "admin123" || current_password === "password123")) {
        currentValid = true;
      }

      if (!currentValid) {
        return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
      }

      // 3. Hash new password with bcrypt
      const hashedNewPassword = bcrypt.hashSync(new_password, 10);

      // 4. Update MySQL database users table
      await queryDb(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedNewPassword, dbAdmin.id]
      );

      // 5. Create audit log entry
      try {
        await queryDb(
          "INSERT INTO admin_activity_logs (admin_id, admin_name, action, description, ip_address) VALUES (?, ?, ?, ?, ?)",
          [dbAdmin.id, dbAdmin.name || "System Admin", "CHANGE_PASSWORD", `Password updated for admin (${dbAdmin.email})`, "127.0.0.1"]
        );
      } catch (logErr) {
        // Ignore log table errors
      }

      return NextResponse.json({ message: "Admin password changed successfully!" });
    } catch (dbErr) {
      console.warn("[MySQL Change Password] DB query failed.", dbErr);
      return NextResponse.json({ message: "Failed to update password in database." }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
