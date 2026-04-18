import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDatabase } from './config/database.js';
import appointmentRoutes from './routes/appointments.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const start = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`\nDental API corriendo en http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/api/health`);
      console.log(`   Appointments: http://localhost:${PORT}/api/appointments\n`);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
};

start();
