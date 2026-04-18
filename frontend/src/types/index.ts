export interface Appointment {
  id: number;
  service_name: string;
  service_duration: number;
  service_price: string;
  dentist_name: string;
  dentist_specialty: string;
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  patient_notes: string | null;
  status: 'pendiente' | 'confirmada' | 'cancelada';
  created_at: string;
}

export interface AppointmentStats {
  total: number;
  pendientes: number;
  confirmadas: number;
  canceladas: number;
  hoy: number;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: string;
}

export interface Dentist {
  id: number;
  name: string;
  specialty: string;
}

export interface PatientInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}
