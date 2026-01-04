import React from 'react';

const team = [
    {
        name: "Dra. Camila Vallejo",
        role: "Ortodoncista",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
        bio: "Especialista en ortodoncia invisible y brackets estéticos. 10 años creando sonrisas perfectas."
    },
    {
        name: "Dr. Sebastián Silva",
        role: "Cirujano Implantólogo",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
        bio: "Experto en implantes dentales y rehabilitación oral compleja. Docente universitario."
    },
    {
        name: "Dra. Valentina Paz",
        role: "Odontopediatra",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
        bio: "La favorita de los niños. Hace que la visita al dentista sea una aventura divertida y sin miedo."
    }
];

const Team = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-secondary font-bold tracking-wide uppercase text-sm mb-3">Nuestro Equipo</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Conoce a tus especialistas</h3>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="group relative">
                            <div className="relative overflow-hidden rounded-[2rem] bg-gray-100 aspect-[3/4]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <p className="text-white/90 text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h4>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
