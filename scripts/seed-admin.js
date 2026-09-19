const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function seedAdmin() {
  const DB_HOST = process.env.DB_HOST || "127.0.0.1";
  const DB_PORT = Number(process.env.DB_PORT) || 3306;
  const DB_USER = process.env.DB_USER || "root";
  const DB_PASSWORD = process.env.DB_PASSWORD || "";
  const DB_NAME = process.env.DB_NAME || "lifedrop";

  console.log(`Connecting to MySQL database at ${DB_HOST}:${DB_PORT}...`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  } catch (err) {
    try {
      connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: "lifedrop_db",
      });
      console.log("Connected to fallback database 'lifedrop_db'.");
    } catch (err2) {
      console.error("Could not connect to MySQL database:", err2.message);
      process.exit(1);
    }
  }

  const adminEmail = "admin@lifedrop.pk";
  const adminPassword = "admin123";
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  // Check if admin user exists
  const [rows] = await connection.execute(
    "SELECT id, email, role FROM users WHERE LOWER(email) = ?",
    [adminEmail]
  );

  if (Array.isArray(rows) && rows.length > 0) {
    // Update existing user password and role to admin
    await connection.execute(
      "UPDATE users SET password = ?, role = 'admin' WHERE LOWER(email) = ?",
      [hashedPassword, adminEmail]
    );
    console.log(`SUCCESS: Admin account updated in MySQL database.`);
  } else {
    // Create new admin user in MySQL database
    await connection.execute(
      `INSERT INTO users (name, email, password, phone, blood_group, address, role, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ["System Admin", adminEmail, hashedPassword, "03493657462", "B+", "Abbottabad, PK", "admin", "active"]
    );
    console.log(`SUCCESS: New Admin account created in MySQL database.`);
  }

  await connection.end();

  console.log("\n==========================================");
  console.log("  OFFICIAL ADMIN CREDENTIALS SET IN MYSQL ");
  console.log("==========================================");
  console.log(`  EMAIL   : ${adminEmail}`);
  console.log(`  PASSWORD: ${adminPassword}`);
  console.log("==========================================\n");
}

seedAdmin();
