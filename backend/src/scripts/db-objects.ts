import pool from '../config/database.js';

interface DbObject {
  schema: string;
  name: string;
  type: string;
}

const run = async () => {
  try {
    const result = await pool.query<DbObject>(`
      SELECT
        n.nspname AS schema,
        c.relname AS name,
        CASE c.relkind
          WHEN 'r' THEN 'table'
          WHEN 'i' THEN 'index'
          WHEN 'S' THEN 'sequence'
          WHEN 'v' THEN 'view'
          WHEN 'm' THEN 'materialized_view'
          WHEN 'f' THEN 'foreign_table'
          WHEN 'p' THEN 'partitioned_table'
          ELSE c.relkind::text
        END AS type
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public'
        AND c.relname LIKE 'appointments%'
      ORDER BY type, name
    `);

    console.log(JSON.stringify(result.rows, null, 2));
  } catch (error) {
    console.error('Error consultando objetos de DB:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void run();
