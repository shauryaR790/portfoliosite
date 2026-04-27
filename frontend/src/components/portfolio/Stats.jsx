import { motion } from "framer-motion";

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "95+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];

export default function Stats() {
  return (
    <section
      id="resume"
      data-testid="stats-section"
      className="relative bg-bg py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stroke border border-stroke rounded-3xl overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              data-testid={`stat-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-bg px-8 py-12 md:py-16 flex flex-col items-start gap-3"
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary leading-none tabular-nums">
                {s.value}
              </span>
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
