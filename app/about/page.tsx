"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const DIRECTORS = [
  {
    name: "Aniket Subudhi",
    image: "/directors/aniket.png",
    role: "Director & CEO",
    focus: "Product Strategy & Client Relations",
    bio: "Aniket leads product vision and client engagement at Devsomeware. With deep roots in startup ecosystems and enterprise software delivery, he ensures every engagement is anchored in real business value — not just technical output.",
    linkedin: "https://www.linkedin.com/in/aniket-subudh1/",
    accent: "#3b82f6",
    initials: "AP",
    tags: ["Product Strategy", "Business Dev", "Startup Advisory"],
  },
  {
    name: "Basir Khan",
    image: "/directors/basir-khan.jpg",
    role: "Director & CTO",
    focus: "Architecture & Engineering",
    bio: "Basir architects the systems that power our products. From distributed microservices to zero-downtime deployments, his engineering standards set the bar every project is held to. He mentors the dev team and owns all technical decisions.",
    linkedin: "https://www.linkedin.com/in/basirkhan418/",
    accent: "#8b5cf6",
    initials: "BK",
    tags: ["System Design", "DevOps", "Backend Engineering"],
  },
  {
    name: "Swagat Dash",
    image: "/directors/swagat-dash.jpg",
    role: "Director & COO",
    focus: "Operations & Delivery",
    bio: "Swagat runs the engine room. He owns planning, resource allocation, quality assurance, and on-time delivery across all active projects. His process discipline is what transforms great code into great client outcomes.",
    linkedin: "https://www.linkedin.com/in/swagatdash15/",
    accent: "#10b981",
    initials: "SD",
    tags: ["Project Delivery", "Quality Assurance", "Ops"],
  },
];

const ETHICS = [
  {
    title: "Registered & Accountable",
    body: "Devsomeware is a legally incorporated Private Limited company under the Companies Act. Every contract, invoice, and deliverable is backed by real legal accountability — not a freelancer's handshake.",
    accent: "#3b82f6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Fixed Price, Zero Surprises",
    body: "We scope work upfront, price it honestly, and stick to it. No hourly billing surprises. No scope-creep invoices. What you approve in the proposal is exactly what you pay.",
    accent: "#10b981",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "No Outsourcing",
    body: "Every line of code is written in-house by our own salaried engineers. We never sub-contract to unknown freelancers. You always know who is building your product.",
    accent: "#f59e0b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "IP Stays With You",
    body: "On project completion, all intellectual property — code, designs, databases, and documentation — transfers fully to the client. We retain nothing.",
    accent: "#ec4899",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Honest Timelines",
    body: "We only commit to deadlines we can actually meet. If something slips, we tell you immediately — not the day before the launch. Radical transparency over comfortable lies.",
    accent: "#8b5cf6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Long-Term Partnership",
    body: "We measure success in years, not sprints. Most of our clients stay with us for ongoing management, new features, and SEO — because we make it easy to keep working together.",
    accent: "#3b82f6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const DIFFERENTIATORS = [
  {
    label: "vs. Freelancers",
    them: "Single point of failure, no legal recourse, inconsistent quality",
    us: "Registered company, full team, legal contracts, structured delivery",
    accent: "#f59e0b",
  },
  {
    label: "vs. Large Agencies",
    them: "High overheads, junior devs on your project, slow communication",
    us: "Senior-led builds, direct access to directors, agency speed without the bloat",
    accent: "#ec4899",
  },
  {
    label: "vs. Offshore Dev Shops",
    them: "Hidden outsourcing, timezone friction, code quality lottery",
    us: "100% in-house team, clear SLAs, documented codebase you can own",
    accent: "#8b5cf6",
  },
];

const STATS = [
  { value: "3+", label: "Years in operation" },
  { value: "40+", label: "Projects delivered" },
  { value: "Pvt. Ltd.", label: "Registered company" },
  { value: "100%", label: "In-house engineering" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="text-[10px] tracking-[0.3em] uppercase text-white/30"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {children}
      </span>
      <span className="h-px w-16 bg-white/8" />
    </div>
  );
}

function Divider({ accent }: { accent?: string }) {
  return (
    <div
      className="w-full h-px"
      style={{
        background: accent
          ? `linear-gradient(90deg, transparent, ${accent}35 30%, ${accent}35 70%, transparent)`
          : "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)",
      }}
    />
  );
}

function DirectorCard({
  director,
  index,
}: {
  director: (typeof DIRECTORS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 40,
        duration: 0.75,
        delay: index * 0.15,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-500"
      style={{
        borderColor: hovered ? `${director.accent}45` : "rgba(255,255,255,0.08)",
        background: hovered
          ? `linear-gradient(145deg, ${director.accent}08 0%, rgba(0,0,0,0.4) 100%)`
          : "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="w-full h-0.5 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${director.accent} 50%, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Large portrait image */}
      <div className="relative w-full overflow-hidden" style={{ height: "300px" }}>
        {!imgError ? (
          <Image
            src={director.image}
            alt={director.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `${director.accent}12` }}
          >
            <span
              className="text-7xl font-black select-none"
              style={{ fontFamily: "var(--font-museo-moderno)", color: director.accent }}
            >
              {director.initials}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.93) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h3
            className="text-lg font-black text-white leading-snug"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              {director.name}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 translate-y-px"
                aria-label="Verified"
              >
                <circle cx="12" cy="12" r="12" fill="#1d9bf0" />
                <path
                  d="M6.5 12.5l3.5 3.5 7.5-7.5"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h3>
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: "var(--font-geist-mono)", color: director.accent }}
          >
            {director.role}
          </span>
          <span
            className="block text-[10px] text-white/50 mt-0.5"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {director.focus}
          </span>
        </div>
      </div>

      <Divider accent={director.accent} />

      <p
        className="px-6 py-5 text-sm text-white/40 group-hover:text-white/58 leading-relaxed transition-colors duration-300 flex-1"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {director.bio}
      </p>

      <div className="px-6 pb-5 flex flex-wrap gap-2">
        {director.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-2.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase transition-all duration-300"
            style={{
              fontFamily: "var(--font-geist-mono)",
              borderColor: hovered ? `${director.accent}35` : "rgba(255,255,255,0.08)",
              background: hovered ? `${director.accent}10` : "transparent",
              color: hovered ? director.accent : "rgba(255,255,255,0.28)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <Divider accent={director.accent} />

      <div className="px-6 py-4">
        <a
          href={director.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 group/link"
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md border transition-all duration-300"
            style={{
              borderColor: hovered ? `${director.accent}45` : "rgba(255,255,255,0.10)",
              background: hovered ? `${director.accent}15` : "rgba(255,255,255,0.04)",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: hovered ? director.accent : "rgba(255,255,255,0.35)" }}
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="9"
                width="4"
                height="12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="4"
                cy="4"
                r="2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-[10px] tracking-widest uppercase font-semibold transition-colors duration-300"
            style={{
              fontFamily: "var(--font-geist-mono)",
              color: hovered ? director.accent : "rgba(255,255,255,0.28)",
            }}
          >
            View Profile
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            style={{ color: hovered ? director.accent : "rgba(255,255,255,0.2)" }}
          >
            <path
              d="M2 12L12 2M12 2H6M12 2v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${director.accent}10 0%, transparent 55%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
}

function EthicsCard({
  item,
  index,
}: {
  item: (typeof ETHICS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border p-5 flex flex-col gap-3 transition-all duration-400 cursor-default"
      style={{
        borderColor: hovered ? `${item.accent}38` : "rgba(255,255,255,0.07)",
        background: hovered ? `${item.accent}07` : "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
        style={{
          borderColor: hovered ? `${item.accent}40` : "rgba(255,255,255,0.08)",
          background: hovered ? `${item.accent}14` : "rgba(255,255,255,0.04)",
          color: hovered ? item.accent : "rgba(255,255,255,0.35)",
        }}
      >
        {item.icon}
      </div>
      <p
        className="text-sm font-bold text-white/75 group-hover:text-white transition-colors"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {item.title}
      </p>
      <p
        className="text-xs text-white/35 leading-relaxed group-hover:text-white/50 transition-colors"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {item.body}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
        tl.to(headingRef.current, { opacity: 1, duration: 0.3 }, 0);
        tl.to(
          headingRef.current,
          {
            duration: 1.6,
            scrambleText: {
              text: "WHO WE ARE",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.2,
              speed: 0.55,
            },
            ease: "none",
          },
          0.05,
        );
      }
      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          delay: 0.7,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/6 backdrop-blur-md bg-black/80"
            : "border-transparent bg-transparent"
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
            href="/services"
            className="hidden sm:inline-flex text-[11px] tracking-widest uppercase text-white/35 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
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
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </header>

      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-1/4 w-150 h-75 rounded-full opacity-12"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.09) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/35"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              About us
            </span>
            <span className="h-px w-24 bg-white/8" />
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
            style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
            aria-label="Who We Are"
          >
            ░░░░░░░░░░
          </h1>

          <p
            ref={subRef}
            className="mt-6 text-white/40 text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            A registered Private Limited company building software that actually works —
            transparently priced, in-house engineered, and delivered by people who put
            their names on it.
          </p>
        </div>
      </section>

      <Divider />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-12 sm:py-14">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl border border-white/8 overflow-hidden px-7 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)" }}
            />

            <div className="relative z-10 shrink-0 flex flex-col items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/8 w-20 h-20 gap-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span
                className="text-[8px] font-bold tracking-widest uppercase text-blue-400 text-center leading-tight"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Pvt Ltd
              </span>
            </div>

            <div className="relative z-10 flex-1">
              <h2
                className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Devsomeware Private Limited
              </h2>
              <p
                className="text-sm text-white/40 leading-relaxed max-w-xl"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Incorporated and registered under the Companies Act of India. Our Pvt. Ltd. status
                means enforceable contracts, GST invoicing, formal NDA capability, and full legal
                accountability on every engagement — something no freelancer or informal agency
                can offer.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2 shrink-0">
              {[
                { val: "MCA", label: "Registered" },
                { val: "GST", label: "Compliant" },
                { val: "NDA", label: "Ready" },
              ].map(({ val, label }) => (
                <div
                  key={val}
                  className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/3 px-3 py-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"
                  />
                  <span
                    className="text-[10px] font-bold text-white/70"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {val}
                  </span>
                  <span
                    className="text-[10px] text-white/30"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ value, label }, i) => (
            <StatCard key={label} value={value} label={label} index={i} />
          ))}
        </div>
      </section>

      <Divider />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>01 · Our Story</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Built by engineers,<br />
                <span className="text-white/40">for businesses that<br />take software seriously</span>
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              <p
                className="text-sm text-white/45 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Devsomeware was founded by three engineers who kept watching the same story
                play out — businesses paying good money to freelancers or offshore shops,
                receiving half-finished code, missing deadlines, and owning nothing at the end.
              </p>
              <p
                className="text-sm text-white/45 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                We built the kind of company we wished existed as clients. A proper registered
                entity. A team that puts its name on deliverables. Fixed prices on paper before
                work starts. Codebases documented well enough for the client&apos;s own engineers
                to take over on day one if they choose to.
              </p>
              <p
                className="text-sm text-white/45 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Three years on, we have delivered over 40 projects across e-commerce,
                SaaS, internal tooling, and institutional websites — and every client who
                stayed with us for six months is still with us today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>02 · Leadership</SectionLabel>

          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-3xl sm:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              The people behind<br />every decision
            </h2>
            <p
              className="text-xs text-white/30 max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Our directors are hands-on across all active projects. They are reachable,
              accountable, and on every major call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DIRECTORS.map((d, i) => (
              <DirectorCard key={d.name} director={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>03 · How We Operate</SectionLabel>

          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Ethics aren&apos;t a policy.<br />
              <span className="text-white/40">They&apos;re how we default.</span>
            </h2>
            <p
              className="text-sm text-white/40 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Every principle below is something we practise daily — not aspirational copy
              written for a website.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ETHICS.map((item, i) => (
              <EthicsCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>04 · Why Choose Us</SectionLabel>

          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-10 leading-tight"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            Honest comparison
          </h2>

          <div className="flex flex-col gap-0">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-0">
              <div className="px-5 py-3">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-white/20"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Category
                </span>
              </div>
              <div className="px-5 py-3 border-l border-white/6">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-white/20"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Typical Market
                </span>
              </div>
              <div className="px-5 py-3 border-l border-white/6">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-white/20"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Devsomeware
                </span>
              </div>
            </div>
            <Divider />

            {DIFFERENTIATORS.map((row, i) => (
              <DifferentiatorRow key={row.label} row={row} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>05 · Our Team</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Experienced engineers.<br />
                <span className="text-white/40">No juniors on your project.</span>
              </h2>
              <p
                className="text-sm text-white/40 leading-relaxed mb-5"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Every developer at Devsomeware has production experience before they
                touch a client project. We do not sell you senior talent and bill you junior time.
                The person in the kick-off call is the same person writing your code.
              </p>
              <p
                className="text-sm text-white/40 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Our engineers specialise across full-stack web, mobile, cloud infrastructure,
                and data — meaning we can staff your entire product without stitching together
                multiple vendors.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Internal code review", desc: "Every PR reviewed by a senior before merge", accent: "#3b82f6" },
                { label: "Documentation first", desc: "Codebase documented as part of the build, not after", accent: "#10b981" },
                { label: "Continuous learning", desc: "Engineers are encouraged to upskill on company time", accent: "#8b5cf6" },
                { label: "Knowledge hand-off", desc: "Structured hand-off session on every project closure", accent: "#f59e0b" },
              ].map(({ label, desc, accent }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/7 bg-white/2 px-4 py-4 flex flex-col gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: accent }}
                  />
                  <p
                    className="text-sm font-bold text-white/75"
                    style={{ fontFamily: "var(--font-museo-moderno)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-xs text-white/35 leading-snug"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl border border-white/8 overflow-hidden px-8 sm:px-12 py-12 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 65%)" }}
            />
            <div className="relative z-10">
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Work with us
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Ready to work with a team<br />you can actually trust?
              </h2>
              <p
                className="text-sm text-white/40 max-w-sm"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Book a free 30-minute call. No pitch, no pressure — just an honest
                conversation about what you need.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-black hover:bg-white/90 transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Book a Free Call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                See our work first →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        delay: index * 0.08,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-white/7 bg-white/2 px-5 py-5 flex flex-col gap-1"
    >
      <span
        className="text-2xl font-black text-white leading-none"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {value}
      </span>
      <span
        className="text-[11px] text-white/35 leading-snug"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {label}
      </span>
    </div>
  );
}

function DifferentiatorRow({
  row,
  index,
}: {
  row: (typeof DIFFERENTIATORS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        x: -16,
        duration: 0.55,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref}>
      <div
        className="grid grid-cols-[1fr_1fr_1fr] gap-0 py-5 group hover:bg-white/1.5 transition-colors duration-200 rounded-lg -mx-2 px-2"
      >
        {/* Label */}
        <div className="pr-4">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold text-white/60"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: row.accent }}
            />
            {row.label}
          </span>
        </div>

        {/* Them */}
        <div className="px-4 border-l border-white/6">
          <p
            className="text-xs text-white/30 leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {row.them}
          </p>
        </div>

        {/* Us */}
        <div className="pl-4 border-l border-white/6">
          <p
            className="text-xs text-white/65 leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {row.us}
          </p>
        </div>
      </div>
      <Divider />
    </div>
  );
}
