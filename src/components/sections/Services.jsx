import React from 'react';
import { Stethoscope, Sparkles, UserCheck, Microscope } from 'lucide-react';

const services = [
    {
        icon: Stethoscope,
        title: "Odontología General",
        description: "Evaluación completa, diagnósticos precisos y limpieza profunda para mantener tu salud oral en óptimas condiciones."
    },
    {
        icon: Sparkles,
        title: "Estética Dental",
        description: "Blanqueamientos clínicos de última generación y diseños de sonrisa para que brilles este verano."
    },
    {
        icon: Microscope,
        title: "Endodoncia",
        description: "Tratamientos de conducto especializados y sin dolor para salvar tus dientes y eliminar infecciones."
    },
    {
        icon: UserCheck,
        title: "Ortodoncia",
        description: "Corrige la alineación de tus dientes. Ofrecemos brackets metálicos, estéticos y alineadores invisibles."
    }
];

const Services = () => {
    return (
        <section id="servicios" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Nuestros Servicios</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Todo lo que tu sonrisa necesita</h3>
                    <p className="text-gray-600 text-lg">
                        Contamos con especialistas en todas las áreas para brindarte una atención integral, moderna y segura en un solo lugar.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100 group-hover:border-orange-100 group-hover:bg-orange-50">
                                <service.icon className="w-8 h-8 text-secondary" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
