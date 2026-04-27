import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "work", label: "Work", href: "#work" },
  { id: "resume", label: "Resume", href: "#resume" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const ids = ["home", "work", "resume"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
    >
      <nav
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/40" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
          data-testid="nav-logo"
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
          aria-label="JA Home"
        >
          <span className="absolute inset-0 rounded-full accent-gradient transition-transform duration-500 group-hover:rotate-180" />
          <span className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-bg text-text-primary font-display italic text-[13px] leading-none">
            JA
          </span>
        </a>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        <ul className="flex items-center">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  data-testid={`nav-link-${link.id}`}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-text-primary bg-stroke/50"
                      : "text-muted hover:text-text-primary hover:bg-stroke/50"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, "#contact")}
          data-testid="nav-say-hi"
          className="group relative inline-flex items-center text-xs sm:text-sm rounded-full"
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated"
            style={{ inset: "-2px" }}
          />
          <span className="relative z-10 inline-flex items-center gap-1 bg-surface text-text-primary rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2">
            Say hi
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
          </span>
        </a>
      </nav>
    </header>
  );
}
