"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const CUSTOM_SERVICES = [
  {
    id: "01",
    audience: "Enterprise & Companies",
    title: "Business Software",
    description:
      "End-to-end custom platforms built to fit your exact operations — CRMs, ERPs, client portals, dashboards, and workflow automation. We integrate with your existing stack and replace the tools that slow you down.",
    accent: "#3b82f6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    bullets: [
      "Custom CRM & client-management portals",
      "ERP modules & process automation",
      "Multi-role dashboards & reporting",
      "Third-party integration (Stripe, Salesforce, etc.)",
      "API development & service orchestration",
    ],
  },
  {
    id: "02",
    audience: "Individual Clients",
    title: "Personal Projects",
    description:
      "Have an idea but no tech team? We work directly with individuals — developers, creators, consultants — to turn concepts into polished, deployable products. Fixed-scope, transparent pricing, no bloat.",
    accent: "#ec4899",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
      </svg>
    ),
    bullets: [
      "Portfolio & personal brand websites",
      "SaaS side-projects & indie tools",
      "Prototype-to-product builds",
      "Landing pages & waitlists",
      "Consultation & architecture review",
    ],
  },
  {
    id: "03",
    audience: "Startups & Founders",
    title: "Startup MVPs",
    description:
      "Speed is your only edge at the early stage. We build production-ready MVPs in weeks, not months — with clean architecture that scales as your user base grows post-launch.",
    accent: "#10b981",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    bullets: [
      "0→1 MVP in 4–8 week sprints",
      "Investor-demo-ready UI",
      "Auth, payments, notifications included",
      "Scalable infra from day one",
      "Post-launch iteration support",
    ],
  },
  {
    id: "04",
    audience: "Teams & Organizations",
    title: "Internal Tools",
    description:
      "The software your team uses every day should be as good as what you ship to customers. We build internal dashboards, admin panels, data-entry tools, and automations that cut hours off repetitive work.",
    accent: "#f59e0b",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 0 0 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    bullets: [
      "Admin panels & back-office tools",
      "HR, inventory & ops dashboards",
      "Workflow & approval automations",
      "Data-import / bulk-action interfaces",
      "Slack / Notion / Airtable integrations",
    ],
  },
];

const PACKAGES = [
  {
    id: "S1",
    name: "Shop & Retail",
    tagline: "For small businesses going digital",
    accent: "#f59e0b",
    popular: false,
    price: "Starting ₹18,000",
    deliveryDays: "10–14 days",
    description:
      "A fast, mobile-first online presence for brick-and-mortar shops, service providers, and local businesses looking to attract and convert customers online.",
    features: [
      "Up to 10 pages (Home, About, Services, Gallery, Contact)",
      "WhatsApp / call CTA integration",
      "Google Maps & business hours widget",
      "Mobile-responsive, SEO-ready markup",
      "Basic inquiry form with email notifications",
      "Social media links & favicon setup",
      "1 month post-launch support",
    ],
    notIncluded: ["Payment gateway", "Product catalogue", "Custom backend"],
  },
  {
    id: "S2",
    name: "School & Education",
    tagline: "For institutions & coaching centres",
    accent: "#8b5cf6",
    popular: true,
    price: "Starting ₹28,000",
    deliveryDays: "14–21 days",
    description:
      "A complete institutional web presence with course listings, admission forms, faculty profiles, and a notice board — everything parents and students need in one place.",
    features: [
      "Full multi-page school / institution website",
      "Admission & enquiry forms with dashboard",
      "Course / class listings with detail pages",
      "Faculty & staff profiles section",
      "Gallery with photo & video support",
      "Notice board / announcements",
      "Google Maps + address integration",
      "Mobile-responsive & SEO optimised",
      "3 months post-launch support",
    ],
    notIncluded: ["Online fee payment", "LMS / course delivery", "Student login portal"],
  },
  {
    id: "S3",
    name: "E-Commerce Store",
    tagline: "For brands ready to sell online",
    accent: "#10b981",
    popular: false,
    price: "Starting ₹45,000",
    deliveryDays: "21–30 days",
    description:
      "A fully functional e-commerce storefront with product catalogue, cart, checkout, and order management — everything you need to start selling from day one.",
    features: [
      "Unlimited product catalogue with variants",
      "Cart, checkout & order confirmation flow",
      "Razorpay / Stripe payment gateway",
      "Order management & status tracking",
      "Customer accounts & order history",
      "Coupon codes & discount engine",
      "Mobile-first, performance-optimised",
      "Admin dashboard to manage products & orders",
      "SEO-ready product & category pages",
      "3 months post-launch support",
    ],
    notIncluded: ["Warehouse / logistics integration", "Custom mobile app"],
  },
];

const MANAGEMENT_FEATURES = [
  {
    title: "Uptime Monitoring",
    desc: "24/7 monitoring with instant alerts. We catch downtime before your customers do.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    accent: "#3b82f6",
  },
  {
    title: "Security Updates",
    desc: "Dependency patches, SSL renewal, and security hardening on a monthly cycle.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    accent: "#10b981",
  },
  {
    title: "Performance Tuning",
    desc: "Monthly Core Web Vitals audits, image optimisation, and cache-layer improvements.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    accent: "#f59e0b",
  },
  {
    title: "Content & Copy Updates",
    desc: "Team, pricing, or copy changed? We push approved edits within 24 hours.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    accent: "#ec4899",
  },
  {
    title: "Backup & Recovery",
    desc: "Automated daily backups with one-click restore. Your data is always safe.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.43" />
      </svg>
    ),
    accent: "#8b5cf6",
  },
  {
    title: "Feature Requests",
    desc: "Retainer clients get prioritised dev hours for new features every month.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    accent: "#3b82f6",
  },
];

const SEO_PILLARS = [
  {
    label: "Technical SEO",
    items: ["Core Web Vitals optimisation", "Structured data & schema markup", "Sitemap & robots.txt setup", "Canonical & redirect audits", "Crawl error resolution"],
    accent: "#3b82f6",
  },
  {
    label: "On-Page SEO",
    items: ["Keyword research & mapping", "Title & meta-description writing", "Header hierarchy & internal linking", "Image alt-text & file naming", "Content gap analysis"],
    accent: "#10b981",
  },
  {
    label: "Lead Generation",
    items: ["Landing page design & A/B testing", "Lead-capture form strategy", "Email sequence setup", "CTA copy & conversion audits", "HubSpot / Mailchimp integration"],
    accent: "#f59e0b",
  },
  {
    label: "Growth Reporting",
    items: ["Monthly traffic & ranking reports", "Google Analytics 4 setup", "Goal & funnel tracking", "Competitor position monitoring", "Action-item roadmap each sprint"],
    accent: "#ec4899",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call", desc: "We learn about your business, goals, and constraints. No forms — just a conversation." },
  { num: "02", title: "Proposal & Scope", desc: "You receive a clear written proposal: deliverables, timeline, and a fixed price — no surprises." },
  { num: "03", title: "Design Sprint", desc: "Wireframes and high-fidelity mockups reviewed and refined with your feedback before a line of code is written." },
  { num: "04", title: "Build & Ship", desc: "Iterative development with weekly demos. You always know exactly where the project stands." },
  { num: "05", title: "Launch & Hand-off", desc: "Deployment, testing, and a full hand-off with documentation so your team can own it from day one." },
  { num: "06", title: "Retain & Grow", desc: "Ongoing retainer options for management, SEO, and continued feature development." },
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
      <span className="flex-1 h-px bg-white/8 max-w-20" />
    </div>
  );
}

function Divider({ accent }: { accent?: string }) {
  return (
    <div
      className="w-full h-px my-0"
      style={{
        background: accent
          ? `linear-gradient(90deg, transparent, ${accent}35 30%, ${accent}35 70%, transparent)`
          : "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)",
      }}
    />
  );
}

function ServiceCard({ svc, index }: { svc: (typeof CUSTOM_SERVICES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 32,
        duration: 0.65,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border p-6 sm:p-7 flex flex-col gap-5 transition-all duration-500 cursor-default"
      style={{
        borderColor: hovered ? `${svc.accent}40` : "rgba(255,255,255,0.07)",
        background: hovered ? `${svc.accent}08` : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span
            className="text-[9px] tracking-[0.3em] uppercase font-semibold transition-colors duration-300"
            style={{
              fontFamily: "var(--font-geist-mono)",
              color: hovered ? svc.accent : "rgba(255,255,255,0.3)",
            }}
          >
            {svc.audience}
          </span>
          <h3
            className="text-xl font-bold text-white/80 group-hover:text-white transition-colors duration-300 leading-snug"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            {svc.title}
          </h3>
        </div>

        <div
          className="shrink-0 flex items-center justify-center rounded-xl w-11 h-11 border transition-all duration-300"
          style={{
            borderColor: hovered ? `${svc.accent}40` : "rgba(255,255,255,0.08)",
            background: hovered ? `${svc.accent}15` : "rgba(255,255,255,0.04)",
            color: hovered ? svc.accent : "rgba(255,255,255,0.4)",
          }}
        >
          {svc.icon}
        </div>
      </div>

      <p
        className="text-sm text-white/40 group-hover:text-white/55 transition-colors duration-300 leading-relaxed"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {svc.description}
      </p>

      <ul className="flex flex-col gap-2.5 mt-auto">
        {svc.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 shrink-0 w-1 h-1 rounded-full transition-colors duration-300"
              style={{ background: hovered ? svc.accent : "rgba(255,255,255,0.25)" }}
            />
            <span
              className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${svc.accent}12 0%, transparent 60%)`,
        }}
      />
      <span
        className="pointer-events-none absolute bottom-4 right-5 text-7xl font-black leading-none select-none transition-opacity duration-300"
        style={{
          fontFamily: "var(--font-museo-moderno)",
          color: hovered ? `${svc.accent}12` : "rgba(255,255,255,0.025)",
        }}
      >
        {svc.id}
      </span>
    </div>
  );
}

function PackageCard({ pkg, index }: { pkg: (typeof PACKAGES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        delay: index * 0.12,
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
      className="relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        borderColor: pkg.popular ? `${pkg.accent}50` : "rgba(255,255,255,0.08)",
        background: pkg.popular ? `${pkg.accent}06` : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div
          className="absolute top-4 right-4 rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase"
          style={{
            background: `${pkg.accent}20`,
            border: `1px solid ${pkg.accent}40`,
            color: pkg.accent,
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="px-6 pt-6 pb-5">
        <span
          className="text-[9px] tracking-[0.3em] uppercase font-semibold mb-2 block"
          style={{ fontFamily: "var(--font-geist-mono)", color: pkg.accent }}
        >
          {pkg.id}
        </span>
        <h3
          className="text-xl font-bold text-white mb-1 leading-tight"
          style={{ fontFamily: "var(--font-museo-moderno)" }}
        >
          {pkg.name}
        </h3>
        <p
          className="text-xs text-white/40 mb-4"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {pkg.tagline}
        </p>

        {/* Price row */}
        <div className="flex items-end gap-3 mb-1">
          <span
            className="text-2xl font-black text-white leading-none"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            {pkg.price}
          </span>
          <span
            className="text-[10px] text-white/30 mb-0.5 leading-none"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            one-time
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 text-[10px] text-white/30 mt-1"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          Delivered in {pkg.deliveryDays}
        </div>
      </div>

      <Divider accent={pkg.accent} />

      <p
        className="px-6 py-4 text-xs text-white/40 leading-relaxed"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {pkg.description}
      </p>

      <div className="px-6 pb-5 flex flex-col gap-2.5 flex-1">
        {pkg.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 mt-0.5"
              style={{ color: pkg.accent }}
            >
              <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="text-xs text-white/55 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* Not included */}
      <div className="px-6 pb-5 flex flex-col gap-2">
        {pkg.notIncluded.map((n) => (
          <div key={n} className="flex items-start gap-2.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
              className="text-xs text-white/25 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {n}
            </span>
          </div>
        ))}
      </div>

      <Divider accent={pkg.accent} />

      {/* CTA */}
      <div className="px-6 py-5">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-bold transition-all duration-300 hover:gap-3"
          style={{
            background: pkg.popular ? pkg.accent : "rgba(255,255,255,0.06)",
            color: pkg.popular ? "#000" : "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          Get a Quote
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: (typeof SEO_PILLARS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="group">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-[9px] tracking-[0.25em] uppercase font-bold tabular-nums"
            style={{ fontFamily: "var(--font-geist-mono)", color: pillar.accent }}
          >
            0{index + 1}
          </span>
          <span
            className="text-base sm:text-lg font-bold text-white/70 group-hover:text-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            {pillar.label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/10"
          style={{ background: open ? `${pillar.accent}15` : "rgba(255,255,255,0.04)" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={open ? pillar.accent : "rgba(255,255,255,0.4)"} strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-10">
              {pillar.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: pillar.accent }}
                  />
                  <span
                    className="text-xs text-white/50"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <Divider />
    </div>
  );
}

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero entry animations */
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
              text: "WHAT WE DO",
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
      {/* Noise overlay */}
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
            href="/work"
            className="hidden sm:inline-flex text-[11px] tracking-widest uppercase text-white/35 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Our Work
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
          className="pointer-events-none absolute -top-24 left-1/4 w-150 h-75 rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/35"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Services
            </span>
            <span className="flex-1 h-px bg-white/8 max-w-24" />
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
            style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
            aria-label="What We Do"
          >
            ░░░░░░░░░░
          </h1>

          <p
            ref={subRef}
            className="mt-6 text-white/40 text-sm sm:text-base max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Custom software. Ready-made packages. Ongoing management. SEO and lead generation.
            Everything your digital business needs — built and maintained by one focused team.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            {[
              ["Custom Software", "#custom"],
              ["Packages", "#packages"],
              ["Management", "#management"],
              ["SEO & Leads", "#seo"],
              ["Process", "#process"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/40 hover:border-white/20 hover:text-white/70 hover:bg-white/8 transition-all duration-200"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section id="custom" className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>01 · Custom Software</SectionLabel>

          <div className="mb-10 max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Built exactly for<br />how you work
            </h2>
            <p
              className="text-sm text-white/40 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Off-the-shelf software forces you to adapt your business to its limitations. We flip
              that. Every product we build is designed around your exact workflow, team, and
              growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CUSTOM_SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section id="packages" className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>02 · Ready-Made Packages</SectionLabel>

          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="max-w-lg">
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Professional websites.
                <br />
                <span className="text-white/40">Predictable pricing.</span>
              </h2>
              <p
                className="text-sm text-white/40 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Not every project needs a full discovery process. For
                shops, schools, and e-commerce stores we offer pre-scoped packages with
                fixed deliverables, fixed timelines, and prices small businesses actually afford.
              </p>
            </div>
            <span
              className="shrink-0 text-[10px] text-white/25 leading-relaxed text-right max-w-50"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              All prices are starting points.<br />Final quote after free call.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>

          <div
            className="mt-6 rounded-xl border border-white/6 bg-white/2 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p
              className="text-xs text-white/35 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Need something in between? Every package can be extended with payment gateways, student portals,
              advanced search, multilingual support, and more. Tell us what you need on the call.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section id="management" className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>03 · Website & App Management</SectionLabel>

          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                We keep your<br />product healthy
              </h2>
              <p
                className="text-sm text-white/40 leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                A launch is not the end — it is the very beginning. Most businesses lose customers
                to slow load times, expired SSLs, and out-of-date content. Our monthly retainer
                keeps your site and app performing, secure, and up-to-date without you lifting
                a finger.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { stat: "< 24h", label: "Content update turnaround" },
                { stat: "99.9%", label: "Uptime target across managed sites" },
                { stat: "Monthly", label: "Performance & security audit cycle" },
              ].map(({ stat, label }) => (
                <div key={label} className="flex items-center gap-5 rounded-xl border border-white/6 bg-white/2 px-5 py-3.5">
                  <span
                    className="text-xl font-black text-white shrink-0"
                    style={{ fontFamily: "var(--font-museo-moderno)" }}
                  >
                    {stat}
                  </span>
                  <span
                    className="text-xs text-white/35 leading-snug"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MANAGEMENT_FEATURES.map((feat, i) => (
              <ManagementCard key={feat.title} feat={feat} index={i} />
            ))}
          </div>

          <div
            className="mt-8 rounded-2xl border border-white/8 bg-white/2 px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            <div>
              <p
                className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-1"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Retainer pricing
              </p>
              <p
                className="text-base font-bold text-white/80"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Starting ₹8,000 / month — no long-term contracts.
              </p>
              <p
                className="text-xs text-white/35 mt-1"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Cancel or pause any time. Billed monthly.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Enquire
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      <section id="seo" className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>04 · SEO & Lead Generation</SectionLabel>

          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Turn your website<br />into your best<br />
                <span className="text-white/40">salesperson</span>
              </h2>
            </div>
            <p
              className="text-sm text-white/40 leading-relaxed self-end"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Traffic without conversion is just noise. We combine technical SEO, on-page
              content strategy, and conversion-focused landing pages to get your site ranking
              and your pipeline filling — tracked, reported, and improved every month.
            </p>
          </div>

          <div className="rounded-2xl border border-white/7 bg-white/2 px-6 sm:px-8 pt-2 pb-2">
            <Divider />
            {SEO_PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.label} pillar={pillar} index={i} />
            ))}
          </div>

          {/* Outcome strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { val: "3–6mo", label: "to first-page ranking" },
              { val: "2–4×", label: "typical lead volume lift" },
              { val: "Monthly", label: "reporting & roadmap" },
              { val: "No lock-in", label: "cancel anytime" },
            ].map(({ val, label }) => (
              <div
                key={val}
                className="rounded-xl border border-white/6 bg-white/2 px-4 py-4 flex flex-col gap-1"
              >
                <span
                  className="text-lg font-black text-white leading-none"
                  style={{ fontFamily: "var(--font-museo-moderno)" }}
                >
                  {val}
                </span>
                <span
                  className="text-[10px] text-white/35 leading-snug"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section id="process" className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>05 · How We Work</SectionLabel>

          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-10 leading-tight"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            Six steps from idea<br />to live product
          </h2>

          <div className="relative">
            <div className="absolute left-4.75 top-8 bottom-8 w-px bg-white/6 hidden sm:block" />

            <div className="flex flex-col gap-0">
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.num} step={step} index={i} last={i === PROCESS_STEPS.length - 1} />
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
              style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 65%)" }}
            />

            <div className="relative z-10">
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Let&apos;s get started
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Not sure which service<br />fits your needs?
              </h2>
              <p
                className="text-sm text-white/40 max-w-sm"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Book a free 30-minute strategy call. We will listen, advise, and give you a
                clear path forward — no obligation.
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

function ManagementCard({
  feat,
  index,
}: {
  feat: (typeof MANAGEMENT_FEATURES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
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
      className="group rounded-xl border p-5 flex flex-col gap-3 transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? `${feat.accent}35` : "rgba(255,255,255,0.07)",
        background: hovered ? `${feat.accent}07` : "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
        style={{
          borderColor: hovered ? `${feat.accent}40` : "rgba(255,255,255,0.08)",
          background: hovered ? `${feat.accent}15` : "rgba(255,255,255,0.04)",
          color: hovered ? feat.accent : "rgba(255,255,255,0.4)",
        }}
      >
        {feat.icon}
      </div>
      <p
        className="text-sm font-bold text-white/75 group-hover:text-white transition-colors"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {feat.title}
      </p>
      <p
        className="text-xs text-white/35 leading-relaxed"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {feat.desc}
      </p>
    </div>
  );
}

function ProcessStep({
  step,
  index,
  last,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  last: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className={`flex gap-6 sm:gap-8 ${last ? "" : "pb-8"}`}>
      <div className="relative flex flex-col items-center shrink-0">
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black">
          <span
            className="text-[10px] font-black text-white/40 tabular-nums"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {step.num}
          </span>
        </div>
      </div>

      <div className="pt-2 pb-0 flex flex-col gap-1.5">
        <h3
          className="text-base font-bold text-white/80"
          style={{ fontFamily: "var(--font-museo-moderno)" }}
        >
          {step.title}
        </h3>
        <p
          className="text-sm text-white/40 leading-relaxed max-w-lg"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {step.desc}
        </p>
      </div>
    </div>
  );
}

