import { CalendarDays, CheckCircle2, Clock, Trash2, Users, XCircle } from 'lucide-react';
import type { Appointment } from '../../types';

interface AppointmentTableProps {
  appointments: Appointment[];
  onStatusChange: (id: number, status: Appointment['status']) => void;
  onDelete: (id: number) => void;
}

const STATUS_CONFIG = {
  pendiente: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, label: 'Pendiente' },
  confirmada: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2, label: 'Confirmada' },
  cancelada: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Cancelada' },
} as const;

const formatDate = (d: string) => {
  const date = new Date(d + 'T12:00:00');
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
};

const AppointmentTable = ({ appointments, onStatusChange, onDelete }: AppointmentTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-gray-900">Citas ({appointments.length})</h2>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No hay citas</p>
          <p className="text-sm">Las nuevas reservas aparecerán aquí</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Paciente</th>
                <th className="px-6 py-3 font-semibold">Servicio</th>
                <th className="px-6 py-3 font-semibold">Profesional</th>
                <th className="px-6 py-3 font-semibold">Fecha</th>
                <th className="px-6 py-3 font-semibold">Hora</th>
                <th className="px-6 py-3 font-semibold">Estado</th>
                <th className="px-6 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt) => {
                const statusConf = STATUS_CONFIG[apt.status];
                const StatusIcon = statusConf.icon;

                return (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{apt.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{apt.patient_name}</p>
                        <p className="text-xs text-gray-400">{apt.patient_phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">{apt.service_name}</p>
                      <p className="text-xs text-gray-400">{apt.service_price}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{apt.dentist_name}</td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{formatDate(apt.appointment_date)}</td>
                    <td className="px-6 py-4 font-medium text-primary whitespace-nowrap">{apt.appointment_time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConf.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConf.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {apt.status !== 'confirmada' && (
                          <button
                            onClick={() => onStatusChange(apt.id, 'confirmada')}
                            title="Confirmar"
                            className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status !== 'cancelada' && (
                          <button
                            onClick={() => onStatusChange(apt.id, 'cancelada')}
                            title="Cancelar"
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(apt.id)}
                          title="Eliminar"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
