import { CalendarCheck, ArrowRight, Clock, Shield, Star } from 'lucide-react';
import { useBooking } from './BookingContext';

const BookingSection = () => {
  const { openModal } = useBooking();

  return (
    <section id="agendar" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-cyan-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      {/* Glow effects */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-cyan-200 text-sm font-semibold border border-white/10">
              <CalendarCheck className="w-4 h-4" />
              Reserva Online 24/7
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Agenda tu Hora
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400">
                en Minutos
              </span>
            </h2>

            <p className="text-lg text-cyan-100/80 max-w-lg leading-relaxed">
              Selecciona el servicio, elige tu profesional preferido y reserva la hora que más te acomode. Sin llamadas, sin esperas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <Clock className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <span className="text-sm text-white/90">Proceso rápido</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <Shield className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <span className="text-sm text-white/90">Datos seguros</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <Star className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <span className="text-sm text-white/90">Confirmación inmediata</span>
              </div>
            </div>
          </div>

          {/* Right - CTA card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl transform rotate-3 opacity-20 blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 text-center space-y-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30 transform -rotate-6">
                <CalendarCheck className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¿Listo para tu cita?
                </h3>
                <p className="text-cyan-100/70">
                  Solo toma 2 minutos reservar tu hora online
                </p>
              </div>

              <button
                id="open-booking-modal"
                onClick={openModal}
                className="group w-full py-4 px-8 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 flex items-center justify-center gap-3"
              >
                Agendar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-cyan-200/50">
                Primera evaluación sin costo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
