import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EmergencyRequestForm from '@/components/EmergencyRequestForm';
import LiveDashboard from '@/components/LiveDashboard';
import HowItWorks from '@/components/HowItWorks';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EmergencyRequestForm />
      <LiveDashboard />
      <HowItWorks />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;
