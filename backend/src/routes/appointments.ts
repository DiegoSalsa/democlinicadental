import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';
import { CreateAppointmentDTO } from '../types/index.js';

type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada';

const router = Router();

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^(?:[01]\d|2[0-3]):(?:00|30)$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_STATUSES: AppointmentStatus[] = ['pendiente', 'confirmada', 'cancelada'];

const asTrimmedString = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isAppointmentStatus = (value: string): value is AppointmentStatus => {
  return VALID_STATUSES.includes(value as AppointmentStatus);
};

const isValidDateString = (value: string): boolean => {
  if (!DATE_REGEX.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(`${value}T12:00:00`);

  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() + 1 === month &&
    parsed.getDate() === day
  );
};

const isPastDate = (value: string): boolean => {
  return value < formatLocalDate(new Date());
};

const isSunday = (value: string): boolean => {
  return new Date(`${value}T12:00:00`).getDay() === 0;
};

const validateCreateAppointment = (data: Partial<CreateAppointmentDTO>): string[] => {
  const errors: string[] = [];

  const serviceName = asTrimmedString(data.service_name);
  const servicePrice = asTrimmedString(data.service_price);
  const dentistName = asTrimmedString(data.dentist_name);
  const dentistSpecialty = asTrimmedString(data.dentist_specialty);
  const appointmentDate = asTrimmedString(data.appointment_date);
  const appointmentTime = asTrimmedString(data.appointment_time);
  const patientName = asTrimmedString(data.patient_name);
  const patientPhone = asTrimmedString(data.patient_phone);
  const patientEmail = asTrimmedString(data.patient_email);

  const serviceDuration = Number(data.service_duration);

  if (!serviceName) errors.push('El servicio es obligatorio');
  if (!Number.isInteger(serviceDuration) || serviceDuration < 15 || serviceDuration > 240) {
    errors.push('La duración del servicio debe estar entre 15 y 240 minutos');
  }
  if (!servicePrice) errors.push('El precio del servicio es obligatorio');
  if (!dentistName) errors.push('El nombre del profesional es obligatorio');
  if (!dentistSpecialty) errors.push('La especialidad del profesional es obligatoria');
  if (!patientName || patientName.length < 3) errors.push('El nombre del paciente es obligatorio');
  if (!patientPhone || patientPhone.length < 8 || patientPhone.length > 30) {
    errors.push('El teléfono del paciente es inválido');
  }

  if (!isValidDateString(appointmentDate)) {
    errors.push('La fecha de la cita es inválida');
  } else {
    if (isPastDate(appointmentDate)) {
      errors.push('No se pueden agendar citas en fechas pasadas');
    }
    if (isSunday(appointmentDate)) {
      errors.push('No hay atención los domingos');
    }
  }

  if (!TIME_REGEX.test(appointmentTime)) {
    errors.push('La hora de la cita es inválida');
  }

  if (patientEmail && !EMAIL_REGEX.test(patientEmail)) {
    errors.push('El email del paciente es inválido');
  }

  return errors;
};

const normalizeCreateAppointment = (data: Partial<CreateAppointmentDTO>): CreateAppointmentDTO => {
  return {
    service_name: asTrimmedString(data.service_name),
    service_duration: Number(data.service_duration),
    service_price: asTrimmedString(data.service_price),
    dentist_name: asTrimmedString(data.dentist_name),
    dentist_specialty: asTrimmedString(data.dentist_specialty),
    appointment_date: asTrimmedString(data.appointment_date),
    appointment_time: asTrimmedString(data.appointment_time),
    patient_name: asTrimmedString(data.patient_name),
    patient_phone: asTrimmedString(data.patient_phone),
    patient_email: asTrimmedString(data.patient_email) || undefined,
    patient_notes: asTrimmedString(data.patient_notes) || undefined,
  };
};

const hasActiveConflict = async (
  dentistName: string,
  appointmentDate: string,
  appointmentTime: string,
): Promise<boolean> => {
  const conflict = await pool.query(
    `SELECT id
     FROM public.appointments
     WHERE dentist_name = $1
       AND appointment_date = $2
       AND appointment_time = $3
       AND status <> 'cancelada'
     LIMIT 1`,
    [dentistName, appointmentDate, appointmentTime],
  );

  return (conflict.rowCount ?? 0) > 0;
};

const parsePositiveInt = (value: unknown): number | null => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number(rawValue);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

const getQueryString = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

// POST /api/appointments — Crear nueva cita
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const input = req.body as Partial<CreateAppointmentDTO>;
    const validationErrors = validateCreateAppointment(input);

    if (validationErrors.length > 0) {
      res.status(400).json({ error: 'Datos inválidos', details: validationErrors });
      return;
    }

    const data = normalizeCreateAppointment(input);
    const slotTaken = await hasActiveConflict(data.dentist_name, data.appointment_date, data.appointment_time);

    if (slotTaken) {
      res.status(409).json({ error: 'Ese horario ya fue reservado para el profesional seleccionado' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO public.appointments 
        (service_name, service_duration, service_price, dentist_name, dentist_specialty, 
         appointment_date, appointment_time, patient_name, patient_phone, patient_email, patient_notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        data.service_name,
        data.service_duration,
        data.service_price,
        data.dentist_name,
        data.dentist_specialty,
        data.appointment_date,
        data.appointment_time,
        data.patient_name,
        data.patient_phone,
        data.patient_email || null,
        data.patient_notes || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    const dbError = error as { code?: string; constraint?: string };

    if (dbError.code === '23505' && dbError.constraint === 'appointments_unique_active_slot_idx') {
      res.status(409).json({ error: 'Ese horario ya fue reservado para el profesional seleccionado' });
      return;
    }

    if (dbError.code === '22007') {
      res.status(400).json({ error: 'Fecha u hora inválida' });
      return;
    }

    console.error('Error creando cita:', error);
    res.status(500).json({ error: 'Error al crear la cita' });
  }
});

// GET /api/appointments — Listar todas las citas
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const status = getQueryString(req.query.status);
    const date = getQueryString(req.query.date);
    const dentist = getQueryString(req.query.dentist);
    const search = getQueryString(req.query.search);

    if (status && status !== 'todas' && !isAppointmentStatus(status)) {
      res.status(400).json({ error: 'Filtro de estado inválido' });
      return;
    }

    if (date && !isValidDateString(date)) {
      res.status(400).json({ error: 'Filtro de fecha inválido' });
      return;
    }

    let query = 'SELECT * FROM public.appointments WHERE 1=1';
    const params: string[] = [];
    let paramIndex = 1;

    if (status && status !== 'todas') {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }

    if (date) {
      query += ` AND appointment_date = $${paramIndex++}`;
      params.push(date);
    }

    if (dentist) {
      query += ` AND dentist_name ILIKE $${paramIndex++}`;
      params.push(`%${dentist}%`);
    }

    if (search) {
      query += ` AND (patient_name ILIKE $${paramIndex} OR patient_phone ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error listando citas:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
});

// GET /api/appointments/stats — Estadísticas
router.get('/stats', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const today = formatLocalDate(new Date());

    const totalResult = await pool.query('SELECT COUNT(*) FROM public.appointments');
    const pendientesResult = await pool.query("SELECT COUNT(*) FROM public.appointments WHERE status = 'pendiente'");
    const confirmadasResult = await pool.query("SELECT COUNT(*) FROM public.appointments WHERE status = 'confirmada'");
    const canceladasResult = await pool.query("SELECT COUNT(*) FROM public.appointments WHERE status = 'cancelada'");
    const hoyResult = await pool.query('SELECT COUNT(*) FROM public.appointments WHERE appointment_date = $1', [today]);

    res.json({
      total: parseInt(totalResult.rows[0].count),
      pendientes: parseInt(pendientesResult.rows[0].count),
      confirmadas: parseInt(confirmadasResult.rows[0].count),
      canceladas: parseInt(canceladasResult.rows[0].count),
      hoy: parseInt(hoyResult.rows[0].count),
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// PATCH /api/appointments/:id/status — Cambiar estado
router.patch('/:id/status', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const appointmentId = parsePositiveInt(req.params.id);
    const status = asTrimmedString(req.body?.status);

    if (appointmentId === null) {
      res.status(400).json({ error: 'ID de cita inválido' });
      return;
    }

    if (!isAppointmentStatus(status)) {
      res.status(400).json({ error: 'Estado inválido' });
      return;
    }

    const result = await pool.query(
      'UPDATE public.appointments SET status = $1 WHERE id = $2 RETURNING *',
      [status, appointmentId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    const dbError = error as { code?: string; constraint?: string };

    if (dbError.code === '23505' && dbError.constraint === 'appointments_unique_active_slot_idx') {
      res.status(409).json({ error: 'No se puede activar la cita porque el horario ya está ocupado' });
      return;
    }

    console.error('Error actualizando estado:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// DELETE /api/appointments/:id — Eliminar cita
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const appointmentId = parsePositiveInt(req.params.id);

    if (appointmentId === null) {
      res.status(400).json({ error: 'ID de cita inválido' });
      return;
    }

    const result = await pool.query('DELETE FROM public.appointments WHERE id = $1 RETURNING *', [appointmentId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    res.json({ message: 'Cita eliminada', appointment: result.rows[0] });
  } catch (error) {
    console.error('Error eliminando cita:', error);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// GET /api/appointments/check — Verificar disponibilidad
router.get('/check', async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getQueryString(req.query.date);
    const dentist = getQueryString(req.query.dentist);

    if (!isValidDateString(date)) {
      res.status(400).json({ error: 'Fecha inválida' });
      return;
    }

    if (isPastDate(date)) {
      res.status(400).json({ error: 'La fecha debe ser hoy o futura' });
      return;
    }

    if (isSunday(date)) {
      res.json({ takenSlots: [] });
      return;
    }

    if (!dentist) {
      res.status(400).json({ error: 'Profesional inválido' });
      return;
    }

    const result = await pool.query(
      `SELECT appointment_time FROM public.appointments 
       WHERE appointment_date = $1 AND dentist_name = $2 AND status != 'cancelada'`,
      [date, dentist]
    );

    const takenSlots = result.rows.map(row => row.appointment_time);
    res.json({ takenSlots });
  } catch (error) {
    console.error('Error verificando disponibilidad:', error);
    res.status(500).json({ error: 'Error al verificar' });
  }
});

export default router;
