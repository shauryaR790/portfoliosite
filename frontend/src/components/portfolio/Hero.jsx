import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];
const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    video.addEventListener("loadedmetadata", tryPlay);
    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      if (hls) hls.destroy();
    };
  }, []);

  // Cycle role every 2s
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
        .from(
          ".blur-in",
          { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 },
          0.3
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      data-testid="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background HLS video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          Collection &lsquo;26
        </span>

        <h1
          data-testid="hero-name"
          className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6"
        >
          Michael Smith
        </h1>

        <p className="blur-in text-lg md:text-xl text-text-primary/90 mb-6 font-body">
          A{" "}
          <span
            key={roleIndex}
            data-testid="hero-role"
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring
          systems to life.
        </p>

        <div className="blur-in inline-flex flex-col sm:flex-row gap-4">
          {/* See Works (solid) */}
          <a
            href="#work"
            data-testid="cta-see-works"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105 inline-flex items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 inline-flex items-center justify-center rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300 px-7 py-3.5 -mx-7 -my-3.5">
              See Works
            </span>
          </a>

          {/* Reach out (outlined) */}
          <a
            href="#contact"
            data-testid="cta-reach-out"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative rounded-full text-sm transition-transform duration-300 hover:scale-105 inline-flex items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 inline-flex items-center justify-center rounded-full border-2 border-stroke group-hover:border-transparent bg-bg text-text-primary px-7 py-3.5">
              Reach out&hellip;
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-testid="scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-1/3 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
