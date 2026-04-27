import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ENTRIES = [
  {
    title: "On building systems that scale with intuition",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80&auto=format&fit=crop",
    read: "6 min read",
    date: "Nov 24, 2025",
  },
  {
    title: "The geometry of motion in product UI",
    image:
      "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=400&q=80&auto=format&fit=crop",
    read: "4 min read",
    date: "Oct 12, 2025",
  },
  {
    title: "Designing for the calm in chaotic dashboards",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop",
    read: "7 min read",
    date: "Sep 02, 2025",
  },
  {
    title: "Type, rhythm, and the silence between letters",
    image:
      "https://images.unsplash.com/photo-1499914485622-a88fac536970?w=400&q=80&auto=format&fit=crop",
    read: "5 min read",
    date: "Jul 18, 2025",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
};

export default function Journal() {
  return (
    <section
      id="journal"
      data-testid="journal-section"
      className="relative bg-bg py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...fadeUp} className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Journal
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] tracking-tight">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="mt-5 text-sm md:text-base text-muted max-w-md">
              Notes, essays and observations from the studio.
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            data-testid="journal-view-all"
            className="group relative hidden md:inline-flex items-center rounded-full text-sm shrink-0"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated"
              style={{ inset: "-2px" }}
            />
            <span className="relative z-10 inline-flex items-center gap-2 bg-bg text-text-primary border border-stroke rounded-full px-5 py-2.5 group-hover:border-transparent">
              View all
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </span>
          </a>
        </motion.div>

        {/* Pill list */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid={`journal-entry-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300"
            >
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-stroke">
                <img
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg text-text-primary truncate">
                  {entry.title}
                </h3>
                <p className="text-xs text-muted mt-1">{entry.read}</p>
              </div>

              <div className="hidden sm:flex items-center gap-4 shrink-0">
                <span className="text-xs text-muted uppercase tracking-[0.2em]">
                  {entry.date}
                </span>
                <span className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-text-primary group-hover:bg-text-primary group-hover:text-bg transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
