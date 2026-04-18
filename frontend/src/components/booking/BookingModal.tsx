import { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Loader2, CheckCircle2, CalendarDays, Phone, Mail, User, FileText } from 'lucide-react';
import { useBooking } from './BookingContext';
import StepIndicator from './StepIndicator';
import ServiceSelector from './ServiceSelector';
import DentistSelector from './DentistSelector';

/* ─── Date & Time Picker (Step 3) ─── */
const DateTimePicker = () => {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, getAvailableSlots } = useBooking();

  const formatLocalDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate next 30 days (skip Sundays)
  const dates: { value: string; label: string; dayName: string; dayNum: number; month: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 45 && dates.length < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue; // skip Sunday
    const value = formatLocalDate(d);
    const dayName = d.toLocaleDateString('es-CL', { weekday: 'short' }).replace('.', '');
    const dayNum = d.getDate();
    const month = d.toLocaleDateString('es-CL', { month: 'short' }).replace('.', '');
    dates.push({ value, label: `${dayName} ${dayNum}`, dayName, dayNum, month });
  }

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Elige fecha y hora</h3>
        <p className="text-gray-500">Selecciona cuándo quieres tu cita</p>
      </div>

      {/* Date selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <CalendarDays className="w-4 h-4 inline mr-1.5 text-primary" />
          Fecha
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar -mx-1 px-1">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => { setSelectedDate(d.value); setSelectedTime(null); }}
              className={`flex-shrink-0 w-[72px] py-3 rounded-xl text-center transition-all duration-300 border-2 ${
                selectedDate === d.value
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                  : 'bg-white text-gray-600 border-gray-100 hover:border-cyan-200 hover:bg-cyan-50/50'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{d.dayName}</div>
              <div className="text-xl font-bold">{d.dayNum}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">{d.month}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time selector */}
      {selectedDate && (
        <div className="animate-fadeSlideIn">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Horarios disponibles
          </label>
          {availableSlots.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="font-medium">Sin horarios disponibles este día</p>
              <p className="text-sm">Intenta con otra fecha</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {availableSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${
                    selectedTime === time
                      ? 'bg-secondary text-white border-secondary shadow-md shadow-orange-200/50 scale-105'
                      : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200 hover:text-secondary'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Patient Form (Step 4) ─── */
const PatientForm = () => {
  const { patientInfo, setPatientInfo, selectedService, selectedDentist, selectedDate, selectedTime } = useBooking();

  const formatDate = (d: string) => {
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tus datos</h3>
        <p className="text-gray-500">Completa tu información para confirmar</p>
      </div>

      {/* Summary card */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-2xl border border-cyan-100 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Servicio</span>
          <span className="text-sm font-semibold text-gray-900">{selectedService?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Profesional</span>
          <span className="text-sm font-semibold text-gray-900">{selectedDentist?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Fecha</span>
          <span className="text-sm font-semibold text-gray-900 capitalize">{selectedDate ? formatDate(selectedDate) : ''}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Hora</span>
          <span className="text-sm font-semibold text-primary">{selectedTime} hrs</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-cyan-200/50">
          <span className="text-sm text-gray-500">Precio</span>
          <span className={`text-sm font-bold ${selectedService?.price === 'Gratis' ? 'text-green-600' : 'text-gray-900'}`}>
            {selectedService?.price}
          </span>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Nombre completo *"
            value={patientInfo.name}
            onChange={(e) => setPatientInfo((prev: typeof patientInfo) => ({ ...prev, name: e.target.value }))}
            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="tel"
            placeholder="Teléfono *"
            value={patientInfo.phone}
            onChange={(e) => setPatientInfo((prev: typeof patientInfo) => ({ ...prev, phone: e.target.value }))}
            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email (opcional)"
            value={patientInfo.email}
            onChange={(e) => setPatientInfo((prev: typeof patientInfo) => ({ ...prev, email: e.target.value }))}
            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
          <textarea
            placeholder="Notas adicionales (opcional)"
            rows={3}
            value={patientInfo.notes}
            onChange={(e) => setPatientInfo((prev: typeof patientInfo) => ({ ...prev, notes: e.target.value }))}
            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Confirmation (Step 5) ─── */
const Confirmation = () => {
  const { confirmationData, closeModal, resetBooking } = useBooking();
  if (!confirmationData) return null;

  const formatDate = (d: string) => {
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="text-center py-4 space-y-6">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center" style={{ animation: 'scale-in 0.5s ease-out' }}>
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Cita Agendada</h3>
        <p className="text-gray-500">Tu reserva ha sido registrada exitosamente</p>
      </div>

      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border border-cyan-100 text-left space-y-3">
        <div className="text-center mb-4">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
            Reserva #{confirmationData.id}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Servicio</span>
          <span className="font-semibold text-gray-900 text-sm">{confirmationData.service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Profesional</span>
          <span className="font-semibold text-gray-900 text-sm">{confirmationData.dentist.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Fecha</span>
          <span className="font-semibold text-gray-900 text-sm capitalize">{formatDate(confirmationData.date)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Hora</span>
          <span className="font-semibold text-primary text-sm">{confirmationData.time} hrs</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-cyan-200/50">
          <span className="text-gray-500 text-sm">Paciente</span>
          <span className="font-semibold text-gray-900 text-sm">{confirmationData.patient.name}</span>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
        <p className="text-yellow-800 text-sm font-medium">
          Recuerda llegar 10 minutos antes de tu cita. Si necesitas cancelar, hazlo con al menos 24 horas de anticipación.
        </p>
      </div>

      <button
        onClick={() => { resetBooking(); closeModal(); }}
        className="w-full py-4 bg-gradient-to-r from-primary to-cyan-600 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01]"
      >
        Cerrar
      </button>
    </div>
  );
};

/* ─── Main Modal ─── */
const BookingModal = () => {
  const { isModalOpen, closeModal, step, prevStep, nextStep, canProceed, confirmBooking, isSubmitting } = useBooking();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const renderStep = () => {
    switch (step) {
      case 1: return <ServiceSelector />;
      case 2: return <DentistSelector />;
      case 3: return <DateTimePicker />;
      case 4: return <PatientForm />;
      case 5: return <Confirmation />;
      default: return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">
            {step === 5 ? 'Confirmación' : 'Agendar Hora'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        {step < 5 && <StepIndicator />}

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
          {renderStep()}
        </div>

        {/* Footer navigation */}
        {step < 5 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors rounded-xl hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={confirmBooking}
                disabled={!canProceed() || isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  canProceed() && !isSubmitting
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-200/50 hover:shadow-xl hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  <>
                    Confirmar Cita
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
