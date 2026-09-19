import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || process.env.DB_DATABASE || 'lifedrop';

export async function queryDb(sql: string, params: any[] = []) {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectTimeout: 3000,
    });

    const [rows] = await connection.execute(sql, params);
    await connection.end();
    return rows;
  } catch (err: any) {
    // Fallback attempt for 'lifedrop_db' schema name
    if (err.code === 'ER_BAD_DB_ERROR') {
      try {
        const fallbackConn = await mysql.createConnection({
          host: DB_HOST,
          port: DB_PORT,
          user: DB_USER,
          password: DB_PASSWORD,
          database: 'lifedrop_db',
          connectTimeout: 3000,
        });

        const [rows] = await fallbackConn.execute(sql, params);
        await fallbackConn.end();
        return rows;
      } catch (fallbackErr) {
        throw err;
      }
    }
    throw err;
  }
}
