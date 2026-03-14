"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const PROJECTS = [
  {
    id: "01",
    slug: "cloud-platform",
    title: "Cloud Infrastructure Platform",
    tagline: "Enterprise-grade cloud management for modern teams",
    category: "Web App",
    year: "2025",
    status: "Live",
    accent: "#3b82f6",
    image: "/banner/cloud.png",
    tags: ["Next.js", "TypeScript", "AWS", "Terraform", "Node.js"],
    description:
      "A full-stack cloud management platform that lets engineering teams provision, monitor, and scale infrastructure without leaving the browser. Built with a microservices backend and a real-time dashboard that processes over 2M events per hour.",
    highlights: ["2M+ events/hour", "40% cost reduction", "99.98% uptime SLA"],
  },
  {
    id: "02",
    slug: "api-gateway",
    title: "API Gateway Suite",
    tagline: "Unified REST & GraphQL developer tooling",
    category: "Developer Tools",
    year: "2025",
    status: "Live",
    accent: "#8b5cf6",
    image: "/banner/api.png",
    tags: ["GraphQL", "REST", "TypeScript", "Redis", "PostgreSQL"],
    description:
      "A developer-first API gateway with automatic schema generation, rate‑limiting, analytics, and a visual playground. Reduced integration time for three enterprise clients from weeks to hours.",
    highlights: ["< 2ms p99 latency", "12k req/sec peak", "Auto-generated docs"],
  },
  {
    id: "03",
    slug: "analytics-dashboard",
    title: "Analytics & BI Dashboard",
    tagline: "Real-time business intelligence with zero setup",
    category: "Data Platform",
    year: "2024",
    status: "Live",
    accent: "#f59e0b",
    image: "/banner/pptye.png",
    tags: ["React", "D3.js", "Python", "BigQuery", "Tailwind CSS"],
    description:
      "A drag-and-drop analytics dashboard built for non-technical stakeholders. Connects to any data source in minutes and transforms raw events into interactive charts, funnels, and cohort analyses.",
    highlights: ["50+ chart types", "10s query avg", "CSV / API export"],
  },
  {
    id: "04",
    slug: "marketing-platform",
    title: "Growth Marketing Platform",
    tagline: "Conversion funnels, A/B tests & campaign automation",
    category: "SaaS",
    year: "2024",
    status: "Live",
    accent: "#10b981",
    image: "/banner/fbanner.png",
    tags: ["Next.js", "Framer Motion", "Stripe", "Resend", "Supabase"],
    description:
      "An end-to-end growth platform that combines landing-page builder, email sequencing, and A/B testing into a single workflow. Launched with a 38% average conversion lift across pilot customers.",
    highlights: ["38% avg lift", "Visual A/B editor", "0-code deploy"],
  },
  {
    id: "05",
    slug: "design-system",
    title: "Enterprise Design System",
    tagline: "Accessible, themeable UI kit used across 6 products",
    category: "Design Engineering",
    year: "2024",
    status: "Live",
    accent: "#ec4899",
    image: "/banner/ui.png",
    tags: ["React", "Storybook", "Radix UI", "Tailwind CSS", "Figma"],
    description:
      "A 120-component design system built for scale. Ships with automated a11y tests, dark-mode tokens, and a Figma library that stays in sync with code via CI. Cut UI development time by 60% across the portfolio.",
    highlights: ["120+ components", "WCAG AA", "Figma ↔ code sync"],
  },
];

type Project = (typeof PROJECTS)[number];

function DetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-200 flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 w-full max-w-5xl mx-auto max-h-[92vh] overflow-y-auto rounded-t-2xl border-t border-x border-white/10 bg-[#070707]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-t-2xl bg-repeat opacity-[0.04]"
          style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
        />

        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/10" />
        </div>

        <div className="relative z-20 flex items-start justify-between gap-6 px-6 sm:px-10 pt-4 pb-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ fontFamily: "var(--font-geist-mono)", color: project.accent }}
              >
                {project.category}
              </span>
              <span className="text-white/20">·</span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-white/30"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {project.year}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] tracking-wider uppercase"
                style={{
                  borderColor: `${project.accent}40`,
                  background: `${project.accent}12`,
                  color: `${project.accent}`,
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: project.accent }}
                />
                {project.status}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              {project.title}
            </h2>
            <p
              className="text-sm text-white/40"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        <div
          className="relative z-20 w-full h-px mx-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}50 30%, ${project.accent}50 70%, transparent)`,
          }}
        />

        <div className="relative z-20 w-full h-56 sm:h-72 md:h-80 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.accent}20 0%, transparent 50%), linear-gradient(0deg, #070707 0%, transparent 38%)`,
            }}
          />

          <span
            className="absolute bottom-4 right-6 text-[80px] sm:text-[110px] font-black leading-none select-none"
            style={{
              fontFamily: "var(--font-museo-moderno)",
              color: `${project.accent}10`,
            }}
          >
            {project.id}
          </span>
        </div>

        <div className="relative z-20 px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <p
              className="text-white/60 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {project.description}
            </p>

            <div>
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-3 block"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide uppercase text-white/50 hover:text-white/80 transition-colors"
                    style={{
                      borderColor: `${project.accent}25`,
                      background: `${project.accent}08`,
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-white/30"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Key Metrics
            </span>
            {project.highlights.map((h) => (
              <div
                key={h}
                className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 px-4 py-3"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                <span
                  className="text-sm font-semibold text-white/80"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 px-6 sm:px-10 pb-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition-colors"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Start a similar project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectRow({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(rowRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        delay: index * 0.07,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, rowRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={rowRef}>
      <div
        className="h-px w-full transition-opacity duration-300"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${project.accent}50 25%, ${project.accent}50 75%, transparent)`
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
        }}
      />

      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group w-full text-left py-6 sm:py-7 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

          <span
            className="hidden sm:block text-[11px] tabular-nums font-black shrink-0 w-8 text-right transition-colors duration-300"
            style={{
              fontFamily: "var(--font-museo-moderno)",
              color: hovered ? project.accent : "rgba(255,255,255,0.12)",
            }}
          >
            {project.id}
          </span>

          {/* Thumbnail */}
          <div
            className="relative shrink-0 rounded-lg overflow-hidden transition-all duration-500"
            style={{
              width: "72px",
              height: "48px",
              border: `1px solid ${hovered ? project.accent + "40" : "rgba(255,255,255,0.07)"}`,
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
              sizes="72px"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${project.accent}30 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0,
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3
                className="text-base sm:text-lg font-bold text-white/80 group-hover:text-white transition-colors duration-300 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                {project.title}
              </h3>
              <span
                className="text-[10px] tracking-[0.15em] uppercase hidden sm:inline"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: hovered ? project.accent : "rgba(255,255,255,0.25)",
                  transition: "color 0.3s",
                }}
              >
                {project.category}
              </span>
            </div>
            <p
              className="text-xs text-white/30 mt-0.5 group-hover:text-white/50 transition-colors duration-300 truncate"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {project.tagline}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  borderColor: hovered ? `${project.accent}35` : "rgba(255,255,255,0.08)",
                  background: hovered ? `${project.accent}10` : "transparent",
                  color: hovered ? project.accent : "rgba(255,255,255,0.30)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <span
              className="text-[11px] text-white/25 tabular-nums"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {project.year}
            </span>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300"
              style={{
                borderColor: hovered ? `${project.accent}50` : "rgba(255,255,255,0.08)",
                background: hovered ? `${project.accent}15` : "transparent",
                transform: hovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                style={{ color: hovered ? project.accent : "rgba(255,255,255,0.3)", transition: "color 0.3s" }}
              >
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
        tl.to(headingRef.current, {
          opacity: 1,
          duration: 0.4,
        }, 0);
        tl.to(headingRef.current, {
          duration: 1.4,
          scrambleText: {
            text: "SELECTED WORK",
            chars: "█▓▒░_/\\|<>{}[]",
            revealDelay: 0.25,
            speed: 0.6,
          },
          ease: "none",
        }, 0.05);
      }

      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.7,
          delay: 0.6,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (counterRef.current) {
        gsap.from(counterRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          delay: 0.7,
          ease: "back.out(2)",
          clearProps: "all",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col">
      {/* Noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b transition-all duration-300 ${
          scrolled ? "border-white/6 backdrop-blur-md bg-black/80" : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo/logo-v2.png" alt="Devsomeware" width={28} height={28} className="opacity-90" />
          <span
            className="text-sm font-bold tracking-wider uppercase text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            Devsomeware
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Book a Call
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Home
          </Link>
        </div>
      </header>

      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="w-1 h-1 rounded-full bg-white/15" />
            </div>
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/40"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Portfolio
            </span>
            <span className="flex-1 h-px bg-white/8" />
          </div>

          <div className="flex flex-wrap items-end gap-4 sm:gap-6">
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
              style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
              aria-label="Selected Work"
            >
              ░░░░░░░░░░░░░░
            </h1>
            <span
              ref={counterRef}
              className="mb-1 sm:mb-2 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tabular-nums text-white/50"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {PROJECTS.length} projects
            </span>
          </div>

          <p
            ref={subRef}
            className="mt-5 text-white/40 text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Hand-picked case studies from our recent work — web apps, platforms, and
            developer tools shipped for founders and enterprises.
          </p>
        </div>
      </section>

      <div
        className="w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)" }}
      />

      <section className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 py-4">
        <div className="max-w-5xl mx-auto">
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)" }}
          />
        </div>
      </section>

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="text-white/20 text-[10px] tracking-[0.25em] uppercase mb-2"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Next step
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Ready to build something?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-black hover:bg-white/90 transition-colors shrink-0"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
      <AnimatePresence>
        {selected && (
          <DetailModal project={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

