import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "¿Atienden urgencias dentales?",
        answer: "Sí, entendemos que el dolor no espera. Tenemos cupos reservados diariamente para urgencias. Llámanos inmediatamente para coordinar tu atención prioritaria."
    },
    {
        question: "¿Cuáles son las formas de pago?",
        answer: "Aceptamos efectivo, tarjetas de débito y crédito (con cuotas sin interés según tu banco), y transferencias. Además, contamos con convenios con cajas de compensación y empresas."
    },
    {
        question: "¿Tienen convenio con FONASA o ISAPRES?",
        answer: "¡Sí! Tenemos aranceles preferenciales para beneficiarios de FONASA y convenios con las principales ISAPRES para que puedas reembolsar tus tratamientos sin problemas."
    },
    {
        question: "¿La primera evaluación tiene costo?",
        answer: "Para la mayoría de los tratamientos (ortodoncia, implantes, estética), la evaluación inicial es 100% gratuita. Solo cobramos si se requieren radiografías específicas en el momento."
    },
    {
        question: "¿Cuánto dura un tratamiento de ortodoncia?",
        answer: "Depende de cada caso, pero con nuestras tecnologías modernas hemos reducido los tiempos significativamente. En promedio, los tratamientos duran entre 12 a 18 meses."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <div>
                        <h2 className="text-secondary font-bold tracking-wide uppercase text-sm mb-3">Preguntas Frecuentes</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Resolvemos tus dudas antes de empezar</h3>
                        <p className="text-gray-600 text-lg mb-8">
                            Queremos que te sientas seguro y tranquilo. Aquí respondemos las consultas más habituales de nuestros pacientes.
                        </p>
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hidden md:block">
                            <p className="font-semibold text-gray-900 mb-2">¿Tienes otra pregunta?</p>
                            <p className="text-gray-500 text-sm mb-4">Nuestro equipo está listo para ayudarte por WhatsApp.</p>
                            <button onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })} className="text-primary font-bold hover:underline">
                                Contáctanos ahora &rarr;
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-lg ring-1 ring-primary/20' : 'shadow-sm hover:shadow-md'}`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                                    onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                >
                                    <span className={`font-bold text-lg ${openIndex === index ? 'text-primary' : 'text-gray-800'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`p-1 rounded-full ${openIndex === index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
