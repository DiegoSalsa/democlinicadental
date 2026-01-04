import React from 'react';
import { MapPin, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-20 pb-10 rounded-t-3xl mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-3xl font-bold text-white">Demo Clínica Dental</span>
                        </div>
                        <p className="text-cyan-100 leading-relaxed">
                            Recupera tu confianza y alegría. Profesionales dedicados a cuidar tu sonrisa con la mejor tecnología y calidez humana.
                        </p>
                        <div className="mt-6 inline-flex bg-cyan-800/50 px-4 py-2 rounded-lg text-cyan-200 text-sm border border-cyan-700">
                            Convenio FONASA
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-xl mb-6 text-secondary">Contacto</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-cyan-50">
                                <MapPin className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Av. Los Robles 1234, Oficina 501</p>
                                    <p className="text-sm text-cyan-200">Providencia, Santiago</p>
                                </div>
                            </div>
                            <a href="tel:+56912345678" className="flex items-center gap-4 text-cyan-50 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-secondary transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span>+56 9 1234 5678</span>
                            </a>
                            <a href="mailto:contacto@demodental.cl" className="flex items-center gap-4 text-cyan-50 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-secondary transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>contacto@demodental.cl</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-xl mb-6 text-secondary">Horario de Atención</h4>
                        <ul className="space-y-3 text-cyan-50">
                            <li className="flex justify-between border-b border-cyan-800 pb-2">
                                <span>Lunes - Viernes</span>
                                <span className="font-medium">09:00 - 19:00</span>
                            </li>
                            <li className="flex justify-between border-b border-cyan-800 pb-2">
                                <span>Sábados</span>
                                <span className="font-medium">10:00 - 14:00</span>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <h5 className="text-sm font-semibold mb-3 text-cyan-200 uppercase tracking-wider">Síguenos</h5>
                            <a href="#" className="inline-block p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-all transform hover:scale-110 shadow-lg">
                                <Instagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-cyan-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-cyan-300 text-sm">
                    <p>© {new Date().getFullYear()} Demo Clínica Dental. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
