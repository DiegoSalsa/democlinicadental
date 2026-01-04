import React, { useState, useEffect } from 'react';
import { Menu, X, Smile } from 'lucide-react';
import Button from '../ui/Button';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-secondary rounded-lg shadow-lg rotate-3">
                            <Smile className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-primary'}`}>Demo Clínica Dental</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#inicio" className="text-gray-600 hover:text-primary font-medium transition-colors">Inicio</a>
                        <a href="#servicios" className="text-gray-600 hover:text-primary font-medium transition-colors">Servicios</a>
                        <a href="#contacto" className="text-gray-600 hover:text-primary font-medium transition-colors">Ubicación</a>
                        <Button variant="secondary" onClick={() => document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' })}>
                            Agendar Hora
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
                    <div className="px-4 py-6 space-y-4">
                        <a href="#inicio" className="block text-gray-600 font-medium text-lg" onClick={() => setIsOpen(false)}>Inicio</a>
                        <a href="#servicios" className="block text-gray-600 font-medium text-lg" onClick={() => setIsOpen(false)}>Servicios</a>
                        <a href="#contacto" className="block text-gray-600 font-medium text-lg" onClick={() => setIsOpen(false)}>Ubicación</a>
                        <div className="pt-2">
                            <Button variant="secondary" className="w-full" onClick={() => { setIsOpen(false); document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' }) }}>
                                Agendar Hora
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
