import { CalendarCheck, Clock, Shield, Star, Phone, MapPin, ExternalLink } from 'lucide-react';

const PURAGENDA_WIDGET_URL = 'https://puragenda.vercel.app/widget/test1';

const BookingSection = () => {
  return (
    <section id="agendar" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-cyan-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      {/* Glow effects */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column — Informational text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-cyan-200 text-sm font-semibold border border-white/10">
                <CalendarCheck className="w-4 h-4" />
                Reserva Online 24/7
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Agenda tu Hora{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400">
                  en Minutos
                </span>
              </h2>

              <p className="text-lg text-cyan-100/80 leading-relaxed max-w-lg">
                Selecciona el servicio, elige tu profesional preferido y reserva la hora que más te acomode. Sin llamadas, sin esperas.
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-300" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">Proceso rápido</span>
                  <p className="text-xs text-white/50 mt-0.5">Reserva en menos de 2 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-300" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">Datos seguros</span>
                  <p className="text-xs text-white/50 mt-0.5">Tu información está protegida</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-orange-300" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">Confirmación inmediata</span>
                  <p className="text-xs text-white/50 mt-0.5">Recibe tu confirmación al instante</p>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-white/50">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Santiago, Chile</span>
              </div>
            </div>
          </div>

          {/* Right column — Widget embed */}
          <div className="relative">
            {/* Glow behind the widget */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-cyan-400/20 rounded-[2rem] blur-2xl opacity-60" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10 bg-white/5 backdrop-blur-sm">
              <iframe
                id="puragenda-widget"
                src={PURAGENDA_WIDGET_URL}
                width="100%"
                height="650"
                frameBorder="0"
                title="Agendar hora - Demo Clínica Dental"
                style={{
                  border: 'none',
                  borderRadius: '16px',
                  display: 'block',
                }}
                allow="clipboard-write"
              />
            </div>

            {/* Powered by badge */}
            <div className="mt-4 text-center">
              <a
                href="https://puragenda.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors"
              >
                Powered by Puragenda
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;
