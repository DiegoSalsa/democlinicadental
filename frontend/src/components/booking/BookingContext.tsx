import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createAppointment, checkAvailability } from '../../services/api';
import type { Service, Dentist, PatientInfo } from '../../types';

interface BookingContextType {
  step: number;
  setStep: (s: number) => void;
  selectedService: Service | null;
  setSelectedService: (s: Service | null) => void;
  selectedDentist: Dentist | null;
  setSelectedDentist: (d: Dentist | null) => void;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
  patientInfo: PatientInfo;
  setPatientInfo: (info: PatientInfo | ((prev: PatientInfo) => PatientInfo)) => void;
  confirmationData: ConfirmationData | null;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;
  confirmBooking: () => Promise<void>;
  resetBooking: () => void;
  getAvailableSlots: (date: string) => string[];
  takenSlots: string[];
  isSubmitting: boolean;
  DENTISTS: Dentist[];
  SERVICES: Service[];
}

interface ConfirmationData {
  id: number;
  service: Service;
  dentist: Dentist;
  date: string;
  time: string;
  patient: PatientInfo;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};

const DENTISTS: Dentist[] = [
  { id: 1, name: 'Dra. Carolina Muñoz', specialty: 'Odontología General' },
  { id: 2, name: 'Dr. Felipe Araya', specialty: 'Ortodoncia' },
  { id: 3, name: 'Dra. Valentina Soto', specialty: 'Endodoncia' },
  { id: 4, name: 'Dr. Andrés Reyes', specialty: 'Estética Dental' },
];

const SERVICES: Service[] = [
  { id: 'evaluacion', name: 'Evaluación General', duration: 30, price: 'Gratis' },
  { id: 'limpieza', name: 'Limpieza Dental', duration: 45, price: '$25.000' },
  { id: 'ortodoncia', name: 'Ortodoncia (Consulta)', duration: 45, price: '$30.000' },
  { id: 'blanqueamiento', name: 'Blanqueamiento', duration: 60, price: '$80.000' },
  { id: 'endodoncia', name: 'Endodoncia', duration: 60, price: '$120.000' },
  { id: 'urgencia', name: 'Dolor / Urgencia', duration: 30, price: '$20.000' },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

const SATURDAY_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
];

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: '', phone: '', email: '', notes: '' });
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch taken slots when date or dentist changes
  useEffect(() => {
    if (selectedDate && selectedDentist) {
      checkAvailability(selectedDate, selectedDentist.name)
        .then(setTakenSlots)
        .catch(() => setTakenSlots([]));
    }
  }, [selectedDate, selectedDentist]);

  const getAvailableSlots = useCallback((date: string): string[] => {
    const d = new Date(date + 'T12:00:00');
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0) return [];
    const allSlots = dayOfWeek === 6 ? SATURDAY_SLOTS : TIME_SLOTS;
    return allSlots.filter(slot => !takenSlots.includes(slot));
  }, [takenSlots]);

  const confirmBooking = async () => {
    if (!selectedService || !selectedDentist || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    try {
      const result = await createAppointment({
        service_name: selectedService.name,
        service_duration: selectedService.duration,
        service_price: selectedService.price,
        dentist_name: selectedDentist.name,
        dentist_specialty: selectedDentist.specialty,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        patient_name: patientInfo.name,
        patient_phone: patientInfo.phone,
        patient_email: patientInfo.email || undefined,
        patient_notes: patientInfo.notes || undefined,
      });

      setConfirmationData({
        id: result.id,
        service: selectedService,
        dentist: selectedDentist,
        date: selectedDate,
        time: selectedTime,
        patient: { ...patientInfo },
      });
      setStep(5);
    } catch (error) {
      console.error('Error al confirmar cita:', error);
      const message = error instanceof Error
        ? error.message
        : 'Hubo un error al confirmar tu cita. Por favor intenta de nuevo.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDentist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setPatientInfo({ name: '', phone: '', email: '', notes: '' });
    setConfirmationData(null);
    setTakenSlots([]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (step === 5) resetBooking();
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return selectedService !== null;
      case 2: return selectedDentist !== null;
      case 3: return selectedDate !== null && selectedTime !== null;
      case 4: return patientInfo.name.trim() !== '' && patientInfo.phone.trim() !== '';
      default: return false;
    }
  };

  const value: BookingContextType = {
    step, setStep,
    selectedService, setSelectedService,
    selectedDentist, setSelectedDentist,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    patientInfo, setPatientInfo,
    confirmationData,
    isModalOpen, openModal, closeModal,
    nextStep, prevStep, canProceed,
    confirmBooking, resetBooking,
    getAvailableSlots, takenSlots,
    isSubmitting,
    DENTISTS, SERVICES,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
