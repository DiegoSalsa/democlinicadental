import pool, { initDatabase } from '../config/database.js';

interface SeedAppointment {
  service_name: string;
  service_duration: number;
  service_price: string;
  dentist_name: string;
  dentist_specialty: string;
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  patient_notes: string;
  status: 'pendiente' | 'confirmada' | 'cancelada';
}

const dateAfterDays = (days: number): string => {
  const formatLocalDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
};

const seedAppointments: SeedAppointment[] = [
  {
    service_name: 'Evaluacion General',
    service_duration: 30,
    service_price: 'Gratis',
    dentist_name: 'Dra. Carolina Munoz',
    dentist_specialty: 'Odontologia General',
    appointment_date: dateAfterDays(1),
    appointment_time: '09:30',
    patient_name: 'Maria Lopez',
    patient_phone: '+56 9 5555 1001',
    patient_email: 'maria.lopez@example.com',
    patient_notes: 'Primera visita',
    status: 'pendiente',
  },
  {
    service_name: 'Limpieza Dental',
    service_duration: 45,
    service_price: '$25.000',
    dentist_name: 'Dr. Felipe Araya',
    dentist_specialty: 'Ortodoncia',
    appointment_date: dateAfterDays(2),
    appointment_time: '11:00',
    patient_name: 'Carlos Rojas',
    patient_phone: '+56 9 5555 1002',
    patient_email: 'carlos.rojas@example.com',
    patient_notes: 'Control semestral',
    status: 'confirmada',
  },
  {
    service_name: 'Blanqueamiento',
    service_duration: 60,
    service_price: '$80.000',
    dentist_name: 'Dr. Andres Reyes',
    dentist_specialty: 'Estetica Dental',
    appointment_date: dateAfterDays(3),
    appointment_time: '15:30',
    patient_name: 'Ana Perez',
    patient_phone: '+56 9 5555 1003',
    patient_email: 'ana.perez@example.com',
    patient_notes: 'Solicita evaluacion previa',
    status: 'pendiente',
  },
];

const run = async () => {
  try {
    await initDatabase();

    const countResult = await pool.query<{ count: string }>('SELECT COUNT(*) AS count FROM public.appointments');
    const existingRows = Number(countResult.rows[0]?.count ?? '0');

    if (existingRows > 0) {
      console.log('Seeder omitido: la tabla appointments ya contiene datos');
      return;
    }

    for (const appointment of seedAppointments) {
      await pool.query(
        `INSERT INTO public.appointments (
          service_name,
          service_duration,
          service_price,
          dentist_name,
          dentist_specialty,
          appointment_date,
          appointment_time,
          patient_name,
          patient_phone,
          patient_email,
          patient_notes,
          status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          appointment.service_name,
          appointment.service_duration,
          appointment.service_price,
          appointment.dentist_name,
          appointment.dentist_specialty,
          appointment.appointment_date,
          appointment.appointment_time,
          appointment.patient_name,
          appointment.patient_phone,
          appointment.patient_email,
          appointment.patient_notes,
          appointment.status,
        ],
      );
    }

    console.log(`Seeder completado: ${seedAppointments.length} citas insertadas`);
  } catch (error) {
    console.error('Error ejecutando seeder:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void run();
