import React from 'react';
import Button from '../ui/Button';
import { Calendar, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const LeadCapture = () => {
    return (
        <section id="agendar" className="py-24 bg-background-light relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-cyan-900/10 overflow-hidden border border-cyan-50">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-12 lg:p-16 bg-primary text-white relative flex flex-col justify-center overflow-hidden">
                            {/* Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                                </svg>
                            </div>

                            <h3 className="text-3xl lg:text-4xl font-bold mb-6 relative">
                                ¿List@ para tu nueva sonrisa?
                            </h3>
                            <p className="text-cyan-100 text-lg mb-10 relative leading-relaxed">
                                Agenda tu evaluación inicial gratuita hoy mismo. Déjanos tus datos, selecciona el motivo y te contactaremos a la brevedad para coordinar.
                            </p>

                            <div className="space-y-4 relative">
                                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                                    <div className="p-3 bg-white rounded-xl text-primary shadow-lg">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Horarios Flexibles</p>
                                        <p className="text-sm text-cyan-200">Lunes a Sábado</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                                    <div className="p-3 bg-secondary rounded-xl text-white shadow-lg">
                                        <span className="font-bold text-xl block w-6 h-6 text-center leading-6">F</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Convenio FONASA</p>
                                        <p className="text-sm text-cyan-200">Bonos y facilidades de pago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 lg:p-16 bg-white">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Ej: Juan Pérez"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono / WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            required
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                                            placeholder="+56 9 1234 5678"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Motivo de consulta</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                            <option>Evaluación General Gratuita</option>
                                            <option>Limpieza Dental</option>
                                            <option>Ortodoncia (Frenillos)</option>
                                            <option>Dolor / Urgencia</option>
                                            <option>Estética / Blanqueamiento</option>
                                            <option>Implantes</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button variant="secondary" className="w-full py-4 text-lg shadow-xl shadow-orange-200/50 hover:shadow-orange-200/80" type="submit">
                                        <WhatsAppIcon className="w-6 h-6" />
                                        Solicitar Hora
                                    </Button>
                                    <p className="text-center text-xs text-gray-400 mt-4 px-4">
                                        Al enviar este formulario, aceptas ser contactado por nuestro equipo de atención al paciente.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadCapture;
