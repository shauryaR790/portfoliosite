import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING_WORDS = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter 0 -> 100 across ~2700ms via rAF
  useEffect(() => {
    const duration = 2700;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => onComplete && onComplete(), 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  // Rotating words every 900ms
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  const progress = count / 100;

  return (
    <motion.div
      data-testid="loading-screen"
      className="fixed inset-0 z-[9999] bg-bg overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Top-left label */}
      <motion.div
        data-testid="loading-label"
        className="absolute top-6 left-6 md:top-10 md:left-10 text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Portfolio
      </motion.div>

      {/* Center rotating word */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROTATING_WORDS[wordIndex]}
            data-testid="loading-word"
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 leading-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute bottom-10 right-6 md:bottom-14 md:right-10 text-text-primary font-display tabular-nums leading-none text-6xl md:text-8xl lg:text-9xl">
        <span data-testid="loading-counter">{String(count).padStart(3, "0")}</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          data-testid="loading-progress"
          className="h-full origin-left accent-gradient"
          style={{
            transform: `scaleX(${progress})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            transition: "transform 80ms linear",
          }}
        />
      </div>
    </motion.div>
  );
}
