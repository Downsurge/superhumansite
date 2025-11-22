import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { PricingSection } from "./components/PricingSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { SignUpSection } from "./components/SignUpSection";
import { PaymentSection } from "./components/PaymentSection";
import { Footer } from "./components/Footer";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { useState, useEffect } from "react";
import { EnrollPage } from "./components/EnrollPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "enroll">("home");
  
  const navigateToHome = () => {
    setCurrentPage("home");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  const navigateToEnroll = () => {
    setCurrentPage("enroll");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  return (
    <div className="relative bg-[#0A0A0A] text-white overflow-hidden">
      <AnimatedBackground />
      
      {currentPage === "home" ? (
        <main className="relative z-10">
          <HeroSection onNavigateToEnroll={navigateToEnroll} />
          <AboutSection />
          <PricingSection onNavigateToEnroll={navigateToEnroll} />
          <ScheduleSection />
          <TestimonialsSection />
          <SignUpSection />
        </main>
      ) : (
        <EnrollPage onNavigateHome={navigateToHome} />
      )}
      
      <Footer onNavigateHome={navigateToHome} onNavigateToEnroll={navigateToEnroll} currentPage={currentPage} />
    </div>
  );
}