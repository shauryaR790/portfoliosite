import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    image:
      "https://images.unsplash.com/photo-1556005693-00fff02f134c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGFydHxlbnwwfHwwfHx8MA%3D%3D",
    rotate: -3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1652172264794-a83fe7c190f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGFydHxlbnwwfHwwfHx8MA%3D%3D",
    rotate: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599894019794-50339c9ad89c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFydHxlbnwwfHwwfHx8MA%3D%3D",
    rotate: -1.5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHxlbnwwfHwwfHx8MA%3D%3D",
    rotate: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXJ0fGVufDB8fDB8fHww",
    rotate: -2,
  },
  {
    image:
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0fGVufDB8fDB8fHww",
    rotate: 2.5,
  },
];

export default function Explorations() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the centered content for the duration of the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax left column moves up faster, right column moves slower
      gsap.to(leftColRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(rightColRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Refresh on layout settle
      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const left = ITEMS.filter((_, i) => i % 2 === 0);
  const right = ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      data-testid="explorations-section"
      className="relative bg-bg min-h-[300vh] overflow-hidden"
    >
      {/* Pinned center content */}
      <div
        ref={contentRef}
        className="h-screen w-full flex items-center justify-center px-6 z-10 relative pointer-events-none"
      >
        <div className="text-center max-w-2xl pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] tracking-tight">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="mt-5 text-sm md:text-base text-muted max-w-md mx-auto">
            A scroll-driven gallery of moments, sketches, and side experiments &mdash; the rough
            drafts behind polished work.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            data-testid="explorations-dribbble"
            className="group relative mt-8 inline-flex items-center rounded-full text-sm"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated"
              style={{ inset: "-2px" }}
            />
            <span className="relative z-10 inline-flex items-center gap-2 bg-bg text-text-primary border border-stroke rounded-full px-6 py-3 group-hover:border-transparent">
              View on Dribbble
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </span>
          </a>
        </div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full">
          <div className="grid grid-cols-2 gap-12 md:gap-40 pt-[20vh] pb-[20vh]">
            <div ref={leftColRef} className="flex flex-col gap-16 md:gap-24 items-end">
              {left.map((item, i) => (
                <button
                  key={`l-${i}`}
                  type="button"
                  data-testid={`exploration-l-${i}`}
                  onClick={() => setLightbox(item.image)}
                  className="pointer-events-auto block w-full max-w-[320px] aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.03]"
                  style={{ transform: `rotate(${item.rotate}deg)` }}
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div ref={rightColRef} className="flex flex-col gap-16 md:gap-24 mt-20 md:mt-40">
              {right.map((item, i) => (
                <button
                  key={`r-${i}`}
                  type="button"
                  data-testid={`exploration-r-${i}`}
                  onClick={() => setLightbox(item.image)}
                  className="pointer-events-auto block w-full max-w-[320px] aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.03]"
                  style={{ transform: `rotate(${item.rotate}deg)` }}
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            data-testid="exploration-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-bg/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button
              type="button"
              data-testid="lightbox-close"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary hover:bg-stroke transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
            >
              <X className="w-4 h-4" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-full rounded-3xl object-contain shadow-2xl shadow-black/60"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
