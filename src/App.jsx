import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Features from './components/sections/Features';
import Team from './components/sections/Team';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import LeadCapture from './components/sections/LeadCapture';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Team />
        <Testimonials />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
}

export default App;
