import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';
const { Pool, Client } = pg;

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const envCandidates = [
  path.resolve(currentDir, '../../.env'),
  path.resolve(currentDir, '../../src/config/.env'),
  path.resolve(currentDir, '.env'),
];

const loaded = new Set<string>();
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath) && !loaded.has(envPath)) {
    dotenv.config({ path: envPath, override: true });
    loaded.add(envPath);
  }
}

const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = Number(process.env.DB_PORT ?? 5432);
const dbName = process.env.DB_NAME || 'dental';
const adminDatabase = process.env.DB_ADMIN_DB || 'postgres';

const baseConfig = {
  user: dbUser,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
};

const isValidDatabaseName = (name: string): boolean => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

export const ensureDatabaseExists = async (): Promise<void> => {
  if (!isValidDatabaseName(dbName)) {
    throw new Error(`DB_NAME invalido: ${dbName}`);
  }

  const adminClient = new Client({
    ...baseConfig,
    database: adminDatabase,
  });

  await adminClient.connect();

  try {
    const result = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);

    if (result.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Base de datos "${dbName}" creada`);
    }
  } finally {
    await adminClient.end();
  }
};

const pool = new Pool({
  ...baseConfig,
  database: dbName,
});

const createAppointmentsTable = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.appointments (
        id SERIAL PRIMARY KEY,
        service_name VARCHAR(100) NOT NULL,
        service_duration INTEGER NOT NULL,
        service_price VARCHAR(20) NOT NULL,
        dentist_name VARCHAR(100) NOT NULL,
        dentist_specialty VARCHAR(100) NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time VARCHAR(10) NOT NULL,
        patient_name VARCHAR(150) NOT NULL,
        patient_phone VARCHAR(30) NOT NULL,
        patient_email VARCHAR(150),
        patient_notes TEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS appointments_unique_active_slot_idx
      ON public.appointments (dentist_name, appointment_date, appointment_time)
      WHERE status <> 'cancelada';
    `);

    console.log('✓ Tabla "appointments" lista');
  } finally {
    client.release();
  }
};

export const initDatabase = async (): Promise<void> => {
  try {
    await createAppointmentsTable();
  } catch (error) {
    const dbError = error as { code?: string };

    // PostgreSQL code 3D000: target database does not exist.
    if (dbError.code === '3D000') {
      await ensureDatabaseExists();
      await createAppointmentsTable();
      return;
    }

    throw error;
  }
};

export default pool;
