import { useBooking } from './BookingContext';
import { Stethoscope, UserCheck, CalendarDays, ClipboardList, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StepInfo {
  num: number;
  label: string;
  icon: LucideIcon;
}

const steps: StepInfo[] = [
  { num: 1, label: 'Servicio', icon: Stethoscope },
  { num: 2, label: 'Profesional', icon: UserCheck },
  { num: 3, label: 'Fecha y Hora', icon: CalendarDays },
  { num: 4, label: 'Tus Datos', icon: ClipboardList },
];

const StepIndicator = () => {
  const { step } = useBooking();

  return (
    <div className="flex items-center justify-center gap-0 px-4 py-6">
      {steps.map((s, index) => {
        const isCompleted = step > s.num;
        const isCurrent = step === s.num;
        const isConfirmation = step === 5;
        const Icon = isCompleted ? CheckCircle2 : s.icon;

        return (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 relative">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isConfirmation ? 'bg-green-500 text-white scale-100'
                  : isCompleted ? 'bg-primary text-white scale-100 shadow-md shadow-primary/20'
                  : isCurrent ? 'bg-secondary text-white scale-110 shadow-lg shadow-orange-300/40 ring-4 ring-orange-100'
                  : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] sm:text-xs font-semibold transition-colors duration-300 ${
                  isConfirmation ? 'text-green-600'
                  : isCompleted ? 'text-primary'
                  : isCurrent ? 'text-secondary'
                  : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 w-[40px] sm:w-[60px] h-0.5 mx-1 sm:mx-2 mb-5 rounded-full overflow-hidden bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    step > s.num ? 'w-full bg-primary' : 'w-0 bg-transparent'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
