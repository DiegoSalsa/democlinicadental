import { Star, Quote } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: "María José L.",
        role: "Paciente de Ortodoncia",
        content: "Increíble la atención. Me daba terror el dentista, pero aquí me sentí muy cómoda. Mis frenillos quedaron perfectos en menos tiempo del esperado.",
        rating: 5
    },
    {
        name: "Carlos M.",
        role: "Paciente de Implantes",
        content: "Recuperé mi sonrisa completa después de años. El Dr. Silva es un genio, no sentí absolutamente nada de dolor durante el procedimiento.",
        rating: 5
    },
    {
        name: "Ana P.",
        role: "Mamá de Paciente",
        content: "Llevo a mis dos hijos y les encanta ir. La Dra. Valentina tiene una paciencia infinita. ¡100% recomendados!",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-cyan-300 font-bold tracking-wide uppercase text-sm mb-3">Testimonios</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Historias Reales, Sonrisas Reales</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative group hover:bg-white/15 transition-colors">
                            <Quote className="absolute top-8 right-8 text-secondary/40 w-10 h-10 rotate-180" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            <p className="text-cyan-50 text-lg italic mb-8 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-cyan-200">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
