import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { SocialProof } from "@/components/sections/SocialProof";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <SocialProof />
        {/* The problem comes before the mechanism: without it, "one brief
            becomes a campaign" is a solution to nothing. */}
        <Problem />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}
