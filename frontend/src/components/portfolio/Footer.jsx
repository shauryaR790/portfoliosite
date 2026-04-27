import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const videoRef = useRef(null);
  const marqueeRef = useRef(null);

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

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const marqueeWord = "BUILDING THE FUTURE";

  return (
    <footer
      id="contact"
      data-testid="footer"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Background HLS video — flipped vertically */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ transform: "translate(-50%, -50%) scaleY(-1)" }}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* CTA */}
        <div className="text-center max-w-3xl mx-auto py-12 md:py-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Get in touch
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-text-primary leading-[0.95] tracking-tight">
            Let&rsquo;s build <span className="font-display italic">something</span>
            <br />
            together.
          </h2>

          <a
            href="mailto:hello@michaelsmith.com"
            data-testid="footer-email"
            className="group relative mt-10 inline-flex items-center rounded-full text-sm md:text-base"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated"
              style={{ inset: "-2px" }}
            />
            <span className="relative z-10 inline-flex items-center gap-3 bg-text-primary text-bg rounded-full px-7 py-4 group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300">
              hello@michaelsmith.com
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </span>
          </a>
        </div>

        {/* Marquee */}
        <div className="relative my-12 md:my-16 overflow-hidden border-y border-stroke py-6 md:py-8">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="text-text-primary text-3xl md:text-5xl lg:text-6xl font-display italic px-6 md:px-10 inline-flex items-center gap-6"
              >
                {marqueeWord}
                <span className="text-muted">&bull;</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 md:pt-8 border-t border-stroke">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-testid={`social-${s.label.toLowerCase()}`}
                className="text-sm text-muted hover:text-text-primary transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-400" />
            </span>
            <span className="text-sm text-text-primary">Available for projects</span>
          </div>

          <div className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Michael Smith
          </div>
        </div>
      </div>
    </footer>
  );
}
