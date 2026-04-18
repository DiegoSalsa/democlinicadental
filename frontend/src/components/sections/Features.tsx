import { Heart, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Heart,
        title: "Atención Sin Dolor",
        description: "Priorizamos tu comodidad con técnicas mínimamente invasivas y anestesia computarizada."
    },
    {
        icon: ShieldCheck,
        title: "Garantía Clínica",
        description: "Respaldamos la calidad de nuestros tratamientos. Si algo no está bien, lo solucionamos."
    },
    {
        icon: Clock,
        title: "Puntualidad Respetada",
        description: "Tu tiempo vale. Nos comprometemos a atenderte a la hora agendada, sin esperas eternas."
    },
    {
        icon: CreditCard,
        title: "Facilidades de Pago",
        description: "Múltiples opciones, convenios y cuotas para que el presupuesto no sea una barrera."
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Por qué elegirnos</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Experiencia Dental Diferente</h3>
                    <p className="text-gray-600 text-lg">
                        Nos alejamos del dentista tradicional. Aquí encontrarás un ambiente relajado, tecnología de punta y un trato humano.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-secondary">
                                <feature.icon size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
