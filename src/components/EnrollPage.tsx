import { HeroSection } from "./HeroSection";
import { PaymentSection } from "./PaymentSection";

interface EnrollPageProps {
  onNavigateHome: () => void;
}

export function EnrollPage({ onNavigateHome }: EnrollPageProps) {
  return (
    <main className="relative z-10">
      <HeroSection showVideo={false} showButtons={false} />
      <PaymentSection />
    </main>
  );
}
