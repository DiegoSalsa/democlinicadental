import { useBooking } from './BookingContext';
import { Clock, Tag, Search, Sparkles, Stethoscope, Gem, Hospital, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  evaluacion: Search,
  limpieza: Sparkles,
  ortodoncia: Stethoscope,
  blanqueamiento: Gem,
  endodoncia: Hospital,
  urgencia: AlertCircle,
};

const ServiceSelector = () => {
  const { SERVICES, selectedService, setSelectedService } = useBooking();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¿Qué necesitas?</h3>
        <p className="text-gray-500">Selecciona el tipo de atención que buscas</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICES.map((service) => {
          const isSelected = selectedService?.id === service.id;
          const IconComponent = SERVICE_ICONS[service.id] || Stethoscope;
          return (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-gray-100 bg-white hover:border-cyan-200 hover:bg-cyan-50/30'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-secondary group-hover:bg-secondary/10'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-base mb-1 transition-colors ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                    {service.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {service.duration} min
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      service.price === 'Gratis' ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      <Tag className="w-3.5 h-3.5" />
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelector;
