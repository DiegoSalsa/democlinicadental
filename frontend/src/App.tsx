import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Services from './components/sections/Services';
import Team from './components/sections/Team';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';
import BookingSection from './components/booking/BookingSection';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/Dashboard';

function PublicSite() {
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
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
