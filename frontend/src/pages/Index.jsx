import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/portfolio/LoadingScreen";
import Navbar from "../components/portfolio/Navbar";
import Hero from "../components/portfolio/Hero";
import Works from "../components/portfolio/Works";
import Journal from "../components/portfolio/Journal";
import Explorations from "../components/portfolio/Explorations";
import Stats from "../components/portfolio/Stats";
import Footer from "../components/portfolio/Footer";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div data-testid="index-page" className="bg-bg text-text-primary min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Works />
        <Journal />
        <Explorations />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
