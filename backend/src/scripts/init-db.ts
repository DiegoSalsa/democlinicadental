import pool, { initDatabase } from '../config/database.js';

const run = async () => {
  try {
    await initDatabase();
    console.log('Inicializacion de base de datos completada');
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void run();
