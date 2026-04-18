import type { Appointment, AppointmentStats } from '../types';

const API_BASE = '/api';

const buildApiError = async (res: Response, fallbackMessage: string): Promise<Error> => {
  try {
    const data = await res.json();
    if (typeof data?.error === 'string' && Array.isArray(data?.details) && data.details.length > 0) {
      return new Error(`${data.error}: ${data.details.join(', ')}`);
    }
    if (typeof data?.error === 'string') {
      return new Error(data.error);
    }
  } catch {
    // Ignore JSON parse failures and keep fallback message.
  }

  return new Error(fallbackMessage);
};

export const createAppointment = async (data: {
  service_name: string;
  service_duration: number;
  service_price: string;
  dentist_name: string;
  dentist_specialty: string;
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  patient_notes?: string;
}): Promise<Appointment> => {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await buildApiError(res, 'Error al crear cita');
  return res.json();
};

export const getAppointments = async (filters?: {
  status?: string;
  date?: string;
  dentist?: string;
  search?: string;
}): Promise<Appointment[]> => {
  const token = localStorage.getItem('admin_token');
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.date) params.set('date', filters.date);
  if (filters?.dentist) params.set('dentist', filters.dentist);
  if (filters?.search) params.set('search', filters.search);

  const res = await fetch(`${API_BASE}/appointments?${params.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw await buildApiError(res, 'Error al obtener citas');
  return res.json();
};

export const getStats = async (): Promise<AppointmentStats> => {
  const token = localStorage.getItem('admin_token');
  const res = await fetch(`${API_BASE}/appointments/stats`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw await buildApiError(res, 'Error al obtener estadísticas');
  return res.json();
};

export const updateAppointmentStatus = async (
  id: number,
  status: 'pendiente' | 'confirmada' | 'cancelada'
): Promise<Appointment> => {
  const token = localStorage.getItem('admin_token');
  const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw await buildApiError(res, 'Error al actualizar estado');
  return res.json();
};

export const deleteAppointment = async (id: number): Promise<void> => {
  const token = localStorage.getItem('admin_token');
  const res = await fetch(`${API_BASE}/appointments/${id}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw await buildApiError(res, 'Error al eliminar cita');
};

export const checkAvailability = async (
  date: string,
  dentist: string
): Promise<string[]> => {
  const params = new URLSearchParams({ date, dentist });
  const res = await fetch(`${API_BASE}/appointments/check?${params.toString()}`);
  if (!res.ok) throw await buildApiError(res, 'Error al verificar disponibilidad');
  const data = await res.json();
  return data.takenSlots;
};

export const adminLogin = async (password: string): Promise<string> => {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw await buildApiError(res, 'Contraseña incorrecta');
  const data = await res.json();
  localStorage.setItem('admin_token', data.token);
  return data.token;
};

export const adminLogout = (): void => {
  localStorage.removeItem('admin_token');
};

export const isAdminLoggedIn = (): boolean => {
  return !!localStorage.getItem('admin_token');
};
