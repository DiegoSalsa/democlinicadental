import { useState, useEffect, useCallback, type ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, CheckCircle2, XCircle, Search, Filter,
  LogOut, RefreshCw, Smile, TrendingUp, BarChart3, ChevronDown
} from 'lucide-react';
import { getAppointments, getStats, updateAppointmentStatus, deleteAppointment, adminLogout, isAdminLoggedIn } from '../../services/api';
import type { Appointment, AppointmentStats } from '../../types';
import AppointmentTable from './AppointmentTable';

const Dashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<AppointmentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auth check
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
    }
  }, [navigate]);

  const loadData = useCallback(async () => {
    try {
      const [appointmentsData, statsData] = await Promise.all([
        getAppointments({ status: statusFilter || undefined, search: searchTerm || undefined }),
        getStats(),
      ]);
      setAppointments(appointmentsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  const handleStatusChange = async (id: number, status: 'pendiente' | 'confirmada' | 'cancelada') => {
    try {
      await updateAppointmentStatus(id, status);
      await loadData();
    } catch (error) {
      console.error('Error actualizando estado:', error);
      alert('Error al actualizar el estado');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta cita? Esta acción no se puede deshacer.')) return;
    try {
      await deleteAppointment(id);
      await loadData();
    } catch (error) {
      console.error('Error eliminando cita:', error);
      alert('Error al eliminar la cita');
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-secondary rounded-lg rotate-3">
                <Smile className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">Admin Panel</span>
                <span className="text-gray-400 text-sm ml-2 hidden sm:inline">Demo Clínica Dental</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard icon={BarChart3} label="Total" value={stats.total} color="bg-gradient-to-br from-primary to-cyan-600" />
            <StatCard icon={Clock} label="Pendientes" value={stats.pendientes} color="bg-gradient-to-br from-yellow-400 to-orange-400" />
            <StatCard icon={CheckCircle2} label="Confirmadas" value={stats.confirmadas} color="bg-gradient-to-br from-green-400 to-emerald-500" />
            <StatCard icon={XCircle} label="Canceladas" value={stats.canceladas} color="bg-gradient-to-br from-red-400 to-rose-500" />
            <StatCard icon={TrendingUp} label="Hoy" value={stats.hoy} color="bg-gradient-to-br from-violet-400 to-purple-500" />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
          <div className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paciente o servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="confirmada">Confirmadas</option>
                <option value="cancelada">Canceladas</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <AppointmentTable
          appointments={appointments}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

/* ─── Stat Card Sub-component ─── */
interface StatCardProps {
  icon: ElementType;
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

export default Dashboard;
