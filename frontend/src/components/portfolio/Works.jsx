import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Automotive Motion",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1400&q=80&auto=format&fit=crop",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Urban Architecture",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Human Perspective",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80&auto=format&fit=crop",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1400&q=80&auto=format&fit=crop",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
};

function ProjectCard({ project, index }) {
  return (
    <motion.a
      href="#"
      data-testid={`project-card-${index}`}
      onClick={(e) => e.preventDefault()}
      className={`group relative block overflow-hidden bg-surface border border-stroke rounded-3xl ${project.span} ${project.aspect}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply pointer-events-none" />

      {/* Hover veil */}
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover label pill */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 rounded-full p-[1.5px] accent-gradient-animated">
          <div className="rounded-full bg-white text-bg text-sm px-5 py-2 inline-flex items-center gap-2">
            <span>View</span>
            <span className="text-muted">—</span>
            <span className="font-display italic">{project.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      {/* Bottom title strip (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between gap-4 z-[1]">
        <h3 className="text-text-primary text-xl md:text-2xl font-display italic leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {project.title}
        </h3>
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.a>
  );
}

export default function Works() {
  return (
    <section
      id="work"
      data-testid="works-section"
      className="relative bg-bg py-12 md:py-16"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...fadeUp} className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] tracking-tight">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="mt-5 text-sm md:text-base text-muted max-w-md">
              A selection of projects I&rsquo;ve worked on, from concept to launch.
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            data-testid="works-view-all"
            className="group relative hidden md:inline-flex items-center rounded-full text-sm shrink-0"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated"
              style={{ inset: "-2px" }}
            />
            <span className="relative z-10 inline-flex items-center gap-2 bg-bg text-text-primary border border-stroke rounded-full px-5 py-2.5 group-hover:border-transparent">
              View all work
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </span>
          </a>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
