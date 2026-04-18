import { useBooking } from './BookingContext';
import { Award, UserRound } from 'lucide-react';

const DentistSelector = () => {
  const { DENTISTS, selectedDentist, setSelectedDentist } = useBooking();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Elige tu profesional</h3>
        <p className="text-gray-500">Todos nuestros doctores están certificados y tienen años de experiencia</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {DENTISTS.map((dentist) => {
          const isSelected = selectedDentist?.id === dentist.id;
          return (
            <button
              key={dentist.id}
              onClick={() => setSelectedDentist(dentist)}
              className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-gray-100 bg-white hover:border-cyan-200'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-primary to-cyan-500 shadow-lg shadow-primary/20 scale-105'
                    : 'bg-gray-50 group-hover:bg-cyan-50'
                }`}>
                  <UserRound className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-base mb-1 transition-colors ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                    {dentist.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Award className="w-3.5 h-3.5 text-secondary" />
                    <span>{dentist.specialty}</span>
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

export default DentistSelector;
