import pool from '../config/database.js';

interface DatabaseStatus {
  user: string;
  serverAddress: string | null;
  serverPort: number | null;
  database: string;
  table: string | null;
  rows: number;
}

const run = async () => {
  try {
    const dbResult = await pool.query<{
      db: string;
      user_name: string;
      server_address: string | null;
      server_port: number | null;
    }>(`
      SELECT
        current_database() AS db,
        current_user AS user_name,
        inet_server_addr()::text AS server_address,
        inet_server_port() AS server_port
    `);
    const tableResult = await pool.query<{ table_name: string | null }>(
      "SELECT to_regclass('public.appointments') AS table_name",
    );

    let rows = 0;
    if (tableResult.rows[0]?.table_name) {
      const countResult = await pool.query<{ count: number }>('SELECT COUNT(*)::int AS count FROM public.appointments');
      rows = countResult.rows[0]?.count ?? 0;
    }

    const status: DatabaseStatus = {
      user: dbResult.rows[0]?.user_name ?? 'unknown',
      serverAddress: dbResult.rows[0]?.server_address ?? null,
      serverPort: dbResult.rows[0]?.server_port ?? null,
      database: dbResult.rows[0]?.db ?? 'unknown',
      table: tableResult.rows[0]?.table_name ?? null,
      rows,
    };

    console.log(JSON.stringify(status, null, 2));
  } catch (error) {
    console.error('Error consultando estado de DB:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void run();
