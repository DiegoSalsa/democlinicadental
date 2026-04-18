import Button from '../ui/Button';
import { ArrowRight, CheckCircle2, Smile } from 'lucide-react';

const Hero = () => {
    return (
        <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full bg-background-light/30 -z-10">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary text-sm font-semibold shadow-sm border border-cyan-100 animate-slide-up">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            Agenda Abierta 2026
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                            Este Verano, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                                Sonríe sin Límites
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                            En Demo Clínica Dental, cuidamos tu salud bucal con un enfoque moderno, cercano y accesible. Disfruta de la mejor tecnología dental cerca de ti.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="secondary" className="text-lg px-8 py-4 shadow-xl shadow-orange-200/50" onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}>
                                Agendar Evaluación
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" className="text-lg px-8 py-4 bg-white/50 backdrop-blur-sm" onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}>
                                Conocer Servicios
                            </Button>
                        </div>

                        <div className="pt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-100">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span>Primera evaluación gratis</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-100">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span>Convenio FONASA</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-cyan-400 rounded-[2rem] transform rotate-3 opacity-10 blur-xl"></div>
                        <div className="relative bg-white p-3 rounded-[2rem] shadow-2xl transform -rotate-2 border border-cyan-50">
                            <div className="aspect-[4/3] bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center relative group">
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30">
                                        <Smile className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="font-bold text-primary text-xl">Tu sonrisa brillará aquí</p>
                                </div>
                            </div>
                        </div>

                        {/* Float cards */}
                        <div className="absolute -bottom-10 -left-4 bg-white p-4 rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 leading-tight">100% Garantizado</p>
                                <p className="text-xs text-gray-500">Satisfacción total</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
