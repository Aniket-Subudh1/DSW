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

const PRODUCTS = [
    {
    id: "P01",
    name: "PGMaster",
    tagline: "Smart PG & hostel management platform",
    category: "SaaS",
    year: "2024",
    status: "Live",
    accent: "#8b5cf6",
    image: "/projects/PGMaster.png",
    tags: ["React", "Express", "PostgreSQL", "Stripe", "Docker"],
    description:
      "All-in-one management software for PG owners and tenants. Handles rent collection, maintenance requests, occupancy tracking, and digital rent agreements from a single intuitive dashboard.",
    metrics: ["200+ PGs managed", "40% faster rent collection", "4.8★ app rating"],
  },
  {
    id: "P02",
    name: "Saveful",
    tagline: "Personal finance & smart savings tracker",
    category: "Web App",
    year: "2025",
    status: "Live",
    accent: "#10b981",
    image: "/projects/Saveful.png",
    tags: ["Next.js", "TypeScript", "Supabase", "Plaid API", "Recharts"],
    description:
      "A beautifully designed personal finance tracker that analyses spending patterns, sets intelligent savings goals, and gamifies the journey to financial freedom with realtime dashboards.",
    metrics: ["₹1.2Cr+ savings tracked", "12k+ active users", "30% avg savings increase"],
  },
  {
    id: "P03",
    name: "Artistic",
    tagline: "Creative portfolio & art commission platform",
    category: "Platform",
    year: "2025",
    status: "Live",
    accent: "#ec4899",
    image: "/projects/artistic.png",
    tags: ["Next.js", "Framer Motion", "Prisma", "Cloudinary", "Stripe"],
    description:
      "A curated platform for digital artists to showcase portfolios, accept commissions, and sell digital artwork globally — powered by an AI-driven style recommendation engine.",
    metrics: ["2k+ artists onboarded", "$180k+ commissions fulfilled", "98% client satisfaction"],
  },
  {
    id: "P04",
    name: "JogaadIndia",
    tagline: "India's innovation & jugaad marketplace",
    category: "Platform",
    year: "2024",
    status: "Live",
    accent: "#f59e0b",
    image: "/projects/JogaadIndia.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Razorpay", "Tailwind CSS"],
    description:
      "A marketplace connecting innovators and problem-solvers across India. Features vendor listings, demand posting, secure payments, and real-time negotiation threads — all built for Bharat's grassroots ingenuity.",
    metrics: ["10k+ monthly active users", "₹50L+ transactions", "500+ verified vendors"],
  },
  {
    id: "05",
    name: "GT Tech",
    tagline: "Industry 4.0 solutions for digital transformation",
    category: "Web App",
    year: "2024",
    status: "Live",
    description:
      "GT Tech provides Industry 4.0 solutions including AR/VR, robotics, automation, and AI-driven engineering services to help organizations digitize operations and accelerate innovation.",
    image: "/projects/gttech.png",
    link: "https://thegttech.com",
    tags: ["Next.js", "AWS", "MongoDB"],
    accent: "#0ea5e9",
    metrics: ["50+ enterprise clients", "30% avg efficiency boost", "24/7 global support"],
  },
  {
    id: "06",
    name: "QwikTest",
    tagline: "Online examination and assessment platform",
    category: "SaaS",
    year: "2024",
    status: "Live",
    description:
      "QwikTest is an online exam and assessment platform that enables educational institutions and organizations to create quizzes, practice tests, and live online exams with detailed analytics.",
    image: "/projects/qwiktest.png",
    link: "https://www.qwiktest.in",
    tags: ["react", "redis", "Node + Express", "MongoDB", "OpenAI"],
    accent: "#ef4444",
    metrics: ["100+ exams conducted", "500+ students assessed", "99.9% uptime"],
  }
] as const;

type Product = (typeof PRODUCTS)[number];

const CATEGORIES = ["All", "Platform", "SaaS", "Web App", "Tool"] as const;

function DetailModal({
  product,
  onClose,
}: {
  product: Product;
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
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-200 flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.48, ease: [0.32, 0.72, 0, 1] }}
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
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ fontFamily: "var(--font-geist-mono)", color: product.accent }}
              >
                {product.category}
              </span>
              <span className="text-white/20">·</span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-white/30"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {product.year}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] tracking-wider uppercase"
                style={{
                  borderColor: `${product.accent}40`,
                  background: `${product.accent}12`,
                  color: product.accent,
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: product.accent }} />
                {product.status}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              {product.name}
            </h2>
            <p className="text-sm text-white/40" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {product.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        <div
          className="relative z-20 w-full h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${product.accent}50 30%, ${product.accent}50 70%, transparent)`,
          }}
        />

        <div className="relative z-20 w-full h-56 sm:h-72 md:h-80 overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${product.accent}20 0%, transparent 50%), linear-gradient(0deg, #070707 0%, transparent 38%)`,
            }}
          />
          <span
            className="absolute bottom-4 right-6 text-[80px] sm:text-[110px] font-black leading-none select-none"
            style={{ fontFamily: "var(--font-museo-moderno)", color: `${product.accent}10` }}
          >
            {product.id}
          </span>
        </div>

        {/* Body */}
        <div className="relative z-20 px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {product.description}
            </p>
            <div>
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-3 block"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide uppercase text-white/50 hover:text-white/80 transition-colors"
                    style={{
                      borderColor: `${product.accent}25`,
                      background: `${product.accent}08`,
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
            {product.metrics.map((m) => (
              <div
                key={m}
                className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 px-4 py-3"
              >
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: product.accent }} />
                <span className="text-sm font-semibold text-white/80" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  {m}
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
            Build something similar
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

function ProductCard({
  product,
  index,
  onClick,
}: {
  product: Product;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 44,
        duration: 0.72,
        delay: (index % 3) * 0.09,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -9, y: x * 9 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div ref={cardRef}>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="relative cursor-pointer rounded-2xl overflow-hidden border border-white/8 bg-[#0a0a0a] transition-[border-color,box-shadow] duration-300 group"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered
            ? "transform 0.08s linear, border-color 0.3s, box-shadow 0.3s"
            : "transform 0.55s cubic-bezier(0.33,1,0.68,1), border-color 0.3s, box-shadow 0.3s",
          borderColor: hovered ? `${product.accent}55` : undefined,
          boxShadow: hovered
            ? `0 0 0 1px ${product.accent}20, 0 20px 60px -12px ${product.accent}22, 0 8px 24px rgba(0,0,0,0.5)`
            : "0 2px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-repeat opacity-[0.04]"
          style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-0.75 z-30 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${product.accent} 30%, ${product.accent} 70%, transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        <div
          className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full z-10 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${product.accent}18 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${product.accent}28 0%, transparent 55%), linear-gradient(0deg, #0a0a0a 0%, transparent 55%)`,
              opacity: hovered ? 1 : 0.7,
            }}
          />
          <span
            className="absolute bottom-2 right-4 font-black leading-none select-none transition-opacity duration-300"
            style={{
              fontFamily: "var(--font-museo-moderno)",
              fontSize: "clamp(48px, 8vw, 72px)",
              color: `${product.accent}14`,
              opacity: hovered ? 1 : 0.6,
            }}
          >
            {product.id}
          </span>
        </div>

        <div className="relative z-10 p-5 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-semibold tracking-[0.28em] uppercase px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: product.accent,
                background: `${product.accent}14`,
                border: `1px solid ${product.accent}25`,
              }}
            >
              {product.category}
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-white/25"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {product.year}
            </span>
          </div>

          <div>
            <h3
              className="text-xl font-bold text-white leading-tight transition-colors duration-300 group-hover:text-white"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              {product.name}
            </h3>
            <p
              className="text-sm text-white/40 mt-1 leading-snug transition-colors duration-300 group-hover:text-white/55"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {product.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {product.metrics.map((m) => (
              <div key={m} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-300"
                  style={{ background: product.accent, opacity: hovered ? 1 : 0.55 }}
                />
                <span
                  className="text-[11px] text-white/40 transition-colors duration-300 group-hover:text-white/60"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {m}
                </span>
              </div>
            ))}
          </div>

          <div
            className="h-px w-full transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, ${product.accent}40, transparent)`,
              opacity: hovered ? 1 : 0.3,
            }}
          />

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 min-w-0 flex-1">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-wide uppercase border px-2 py-0.5 rounded-full transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    borderColor: hovered ? `${product.accent}35` : "rgba(255,255,255,0.09)",
                    color: hovered ? `${product.accent}cc` : "rgba(255,255,255,0.28)",
                    background: hovered ? `${product.accent}0d` : "transparent",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: hovered ? product.accent : "rgba(255,255,255,0.30)",
                transform: hovered ? "translateX(3px)" : "none",
              }}
            >
              Explore
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-widest uppercase transition-all duration-250"
      style={{
        fontFamily: "var(--font-geist-mono)",
        color: active ? "#000" : "rgba(255,255,255,0.4)",
        background: active ? "#ffffff" : "rgba(255,255,255,0.04)",
        border: active ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
      <span
        className="flex items-center justify-center rounded-full min-w-4.5 h-4.5 px-1 text-[9px] font-bold"
        style={{
          background: active ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)",
          color: active ? "#000" : "rgba(255,255,255,0.4)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  const getCategoryCount = (cat: string) =>
    cat === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
        tl.to(headingRef.current, { opacity: 1, duration: 0.35 }, 0);
        tl.to(
          headingRef.current,
          {
            duration: 1.5,
            scrambleText: {
              text: "ALL PRODUCTS",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.2,
              speed: 0.55,
            },
            ease: "none",
          },
          0.05
        );
      }

      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          delay: 0.65,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (counterRef.current) {
        gsap.from(counterRef.current, {
          opacity: 0,
          scale: 0.75,
          duration: 0.5,
          delay: 0.75,
          ease: "back.out(2)",
          clearProps: "all",
        });
      }

      if (filterBarRef.current) {
        gsap.from(filterBarRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.6,
          delay: 0.85,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

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

        <nav className="hidden md:flex items-center gap-5">
          {[
            { label: "Work", href: "/work" },
            { label: "Services", href: "/services" },
            { label: "About", href: "/about" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] tracking-widest uppercase text-white/35 hover:text-white/80 transition-colors"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Get in touch
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

      {/* ── Hero ── */}
      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-14 sm:pt-20 sm:pb-18 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-20 w-150 h-80 rounded-full opacity-15 z-0"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="w-1 h-1 rounded-full bg-white/15" />
            </div>
            <span
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/50"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {'// our product portfolio'}
            </span>
            <span className="flex-1 h-px bg-linear-to-r from-white/15 to-transparent max-w-24 sm:max-w-xs" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
            <div className="flex-1">
              <h1
                ref={headingRef}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight"
                style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
              >
                ALL PRODUCTS
              </h1>
              <p
                ref={subRef}
                className="mt-4 text-sm sm:text-base text-white/45 max-w-xl leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Every product we&apos;ve built — from scrappy MVPs to enterprise platforms. Click any
                card to explore the full case study.
              </p>
            </div>

            <span
              ref={counterRef}
              className="self-start sm:self-auto flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/3 px-6 py-4 shrink-0"
            >
              <span
                className="text-5xl font-black text-white leading-none"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                {String(PRODUCTS.length).padStart(2, "0")}
              </span>
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-white/35 mt-1"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Products
              </span>
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-5 sm:gap-8">
            {[
              { label: "Categories", value: String(CATEGORIES.length - 1) },
              { label: "Technologies", value: "20+" },
              { label: "Avg delivery", value: "6wk" },
              { label: "Uptime avg", value: "99.9%" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-museo-moderno)" }}
                >
                  {value}
                </span>
                <span
                  className="text-[11px] tracking-widest uppercase text-white/30"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="sticky top-18.25 z-40 bg-black/90 backdrop-blur-md border-b border-white/6">
        <div
          ref={filterBarRef}
          className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-3.5 flex items-center gap-2.5 overflow-x-auto scrollbar-hide"
        >
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              count={getCategoryCount(cat)}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
            />
          ))}

          <div className="ml-auto shrink-0 flex items-center gap-2">
            <span className="w-px h-4 bg-white/10" />
            <span
              className="text-[10px] tracking-widest uppercase text-white/25 whitespace-nowrap"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {filtered.length} shown
            </span>
          </div>
        </div>
      </div>

      <section className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onClick={() => setSelected(product)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-28 gap-3 text-center">
              <span className="text-4xl">∅</span>
              <p className="text-white/30 text-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                No products in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0c0c0c] px-8 py-10 sm:px-12 sm:py-12"
            style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-[0.04]"
              style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
            />
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full z-0 opacity-25"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 rounded-full z-0 opacity-15"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-lg">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase text-white/40"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-museo-moderno)" }}
                >
                  Let&apos;s build your next product together.
                </h2>
                <p className="text-sm text-white/40" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  From idea to production in weeks — with clean architecture that scales.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition-colors"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  Start a project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {selected && <DetailModal product={selected} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
}
