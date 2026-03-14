"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { NoiseBackground } from "@/app/components/ui/noise-background";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

/* ─── Animated orbit rings (used inside CTA card) ─────────────────────── */
function OrbitRings() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 900 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ctaOrb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(180,120,255)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctaOrb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(100,180,255)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ctaRingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(180,120,255,0)" />
          <stop offset="40%"  stopColor="rgba(180,120,255,0.5)" />
          <stop offset="60%"  stopColor="rgba(100,180,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,150,60,0)" />
        </linearGradient>
        <linearGradient id="ctaRingGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,150,60,0)" />
          <stop offset="45%"  stopColor="rgba(255,150,60,0.4)" />
          <stop offset="55%"  stopColor="rgba(180,120,255,0.4)" />
          <stop offset="100%" stopColor="rgba(100,180,255,0)" />
        </linearGradient>
      </defs>

      <ellipse cx="750" cy="240" rx="260" ry="200" fill="url(#ctaOrb1)">
        <animateTransform attributeName="transform" type="rotate"
          from="0 750 240" to="360 750 240" dur="28s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="780" cy="260" rx="180" ry="130" fill="url(#ctaOrb2)">
        <animateTransform attributeName="transform" type="rotate"
          from="360 780 260" to="0 780 260" dur="18s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="760" cy="240" rx="190" ry="140" fill="none"
        stroke="url(#ctaRingGrad1)" strokeWidth="0.8" opacity="0.45">
        <animateTransform attributeName="transform" type="rotate"
          from="0 760 240" to="360 760 240" dur="22s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="760" cy="240" rx="140" ry="100" fill="none"
        stroke="url(#ctaRingGrad2)" strokeWidth="0.6" opacity="0.35">
        <animateTransform attributeName="transform" type="rotate"
          from="360 760 240" to="0 760 240" dur="15s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="760" cy="240" rx="82" ry="58" fill="none"
        stroke="rgba(180,120,255,0.3)" strokeWidth="0.5">
        <animateTransform attributeName="transform" type="rotate"
          from="0 760 240" to="360 760 240" dur="10s" repeatCount="indefinite" />
      </ellipse>
      <circle r="2.5" fill="rgba(200,150,255,0.9)">
        <animateMotion dur="22s" repeatCount="indefinite">
          <mpath href="#ctaOrbitPath1" />
        </animateMotion>
      </circle>
      <path id="ctaOrbitPath1" d="M 570,240 a 190,140 0 1,1 0.001,0" fill="none" />
      <circle r="1.8" fill="rgba(100,200,255,0.85)">
        <animateMotion dur="15s" repeatCount="indefinite" keyPoints="0.6;1;0;0.6" keyTimes="0;0.4;0.8;1" calcMode="linear">
          <mpath href="#ctaOrbitPath2" />
        </animateMotion>
      </circle>
      <path id="ctaOrbitPath2" d="M 620,240 a 140,100 0 1,1 0.001,0" fill="none" />
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => (
          <circle key={`${row}-${col}`} cx={480 + col * 32} cy={24 + row * 62} r="0.9" fill="rgba(255,255,255,0.08)" />
        ))
      )}
      <path d="M860 20 L900 20 L900 60"    fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path d="M860 460 L900 460 L900 420" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

/* ─── Magnetic CTA button ─────────────────────────────────────────────── */
function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(btn, { x: (x - rect.width / 2) * 0.28, y: (y - rect.height / 2) * 0.28, duration: 0.35, ease: "power2.out" });
    if (glowRef.current) gsap.to(glowRef.current, { x: x - 60, y: y - 60, duration: 0.25, ease: "power2.out" });
  };
  const handleLeave = () => gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white cursor-pointer select-none"
      style={{
        background: "linear-gradient(135deg,#1a0a2e 0%,#0d0d12 50%,#0a0a10 100%)",
        boxShadow:  "0 0 0 1px rgba(180,120,255,0.35), 0 4px 24px rgba(120,60,220,0.25), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out"
        style={{ background: "linear-gradient(105deg,transparent 30%,rgba(180,120,255,0.18) 50%,transparent 70%)" }}
        aria-hidden="true"
      />
      <span ref={glowRef}
        className="absolute w-30 h-30 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle, rgba(180,120,255,0.22) 0%, transparent 70%)", willChange: "transform" }}
        aria-hidden="true"
      />
      {children}
      <svg width="11" height="11" viewBox="0 0 14 14" fill="none"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ─── Animated counter ────────────────────────────────────────────────── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        gsap.to({ n: 0 }, {
          n: to, duration: 1.6, ease: "power2.out",
          onUpdate() { setVal(Math.round((this as unknown as { targets: () => Array<{ n: number }> }).targets()[0].n)); },
        });
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Corner bracket positions ────────────────────────────────────────── */
const CORNER_POSITIONS = [
  { top: 12, left: 12 }, { top: 12, right: 12 },
  { bottom: 12, left: 12 }, { bottom: 12, right: 12 },
] as React.CSSProperties[];

function cornerBorders(i: number): React.CSSProperties {
  return {
    borderTop:    i < 2       ? "1px solid rgba(255,255,255,0.12)" : undefined,
    borderBottom: i >= 2      ? "1px solid rgba(255,255,255,0.12)" : undefined,
    borderLeft:   i % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : undefined,
    borderRight:  i % 2 === 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
  };
}

/* ─── Stats data ──────────────────────────────────────────────────────── */
const STATS = [
  { n: 50,  suffix: "+", label: "Projects Delivered",   desc: "End-to-end products shipped to production" },
  { n: 3,   suffix: "+", label: "Years of Engineering", desc: "Deep technical craft and battle-tested process" },
  { n: 100, suffix: "%", label: "On-Time Delivery",     desc: "Consistent, reliable milestone execution" },
];

/* ─── Main component ──────────────────────────────────────────────────── */
export default function CTASection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const showreelRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef     = useRef<HTMLDivElement>(null);
  const videoWrapRef   = useRef<HTMLDivElement>(null);
  const statsRowRef    = useRef<HTMLDivElement>(null);
  const cardTriggerRef = useRef<HTMLDivElement>(null);
  const cardRef        = useRef<HTMLDivElement>(null);
  const labelRef       = useRef<HTMLDivElement>(null);
  const labelTextRef   = useRef<HTMLSpanElement>(null);
  const line1Ref       = useRef<HTMLDivElement>(null);
  const line2Ref       = useRef<HTMLDivElement>(null);
  const descRef        = useRef<HTMLParagraphElement>(null);
  const ctasRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const resume = () => { if (!video.paused) return; video.play().catch(() => {}); };
    const onVis  = () => { if (document.visibilityState === "visible") resume(); };
    video.addEventListener("pause", resume);
    document.addEventListener("visibilitychange", onVis);
    return () => { video.removeEventListener("pause", resume); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(eyebrowRef.current,   { opacity: 0, y: 10 });
      gsap.set(videoWrapRef.current, { opacity: 0, y: 28, scale: 1.02 });
      gsap.set(statsRowRef.current,  { opacity: 0, y: 20 });

      gsap.timeline({
        scrollTrigger: { trigger: showreelRef.current, start: "top 82%", once: true },
        defaults: { ease: "power2.out" },
      })
        .to(eyebrowRef.current,   { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(videoWrapRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.15)
        .to(statsRowRef.current,  { opacity: 1, y: 0, duration: 0.7 }, 0.5);

      gsap.set(cardRef.current,  { opacity: 0, y: 40 });
      gsap.set(labelRef.current, { opacity: 0 });
      gsap.set(line1Ref.current, { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(line2Ref.current, { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(descRef.current,  { opacity: 0, y: 14 });
      gsap.set(ctasRef.current,  { opacity: 0, y: 18 });

      gsap.timeline({
        scrollTrigger: { trigger: cardTriggerRef.current, start: "top 85%", once: true },
        defaults: { ease: "power2.out" },
      })
        .to(cardRef.current,  { opacity: 1, y: 0, duration: 0.9 }, 0)
        .to(labelRef.current, { opacity: 1, duration: 0.4 }, 0.2)
        .to(labelTextRef.current, {
          duration: 1.4,
          scrambleText: { text: "// let's build together", chars: "█▓▒░_/\\|<>{}[]", revealDelay: 0.3, speed: 0.5 },
          ease: "none",
        }, 0.45)
        .to(line1Ref.current, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" }, 0.6)
        .to(line2Ref.current, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" }, 0.75)
        .to(descRef.current,  { opacity: 1, y: 0, duration: 0.65 }, 0.95)
        .to(ctasRef.current,  { opacity: 1, y: 0, duration: 0.65 }, 1.08);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative w-full bg-black overflow-hidden">
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-20 flex flex-col items-center px-5 sm:px-8 lg:px-14 py-20 sm:py-28 gap-16 sm:gap-24">

        {/* ═══ SHOWREEL ═══════════════════════════════════════════════════ */}
        <div ref={showreelRef} className="w-full max-w-6xl flex flex-col gap-7">

          <div ref={eyebrowRef} className="flex items-center gap-4" style={{ opacity: 0 }}>
            <span className="h-px flex-1 bg-white/8" />
            <span className="text-[9px] tracking-[0.38em] uppercase text-white/35 font-(family-name:--font-geist-mono) shrink-0">Our Showreel</span>
            <span className="h-px flex-1 bg-white/8" />
          </div>

          <NoiseBackground
            containerClassName="w-full p-[1.5px] rounded-2xl bg-black"
            gradientColors={["rgb(180, 120, 255)", "rgb(100, 180, 255)", "rgb(255, 150, 60)"]}
            speed={0.035}
          >
            <div
              ref={videoWrapRef}
              className="relative w-full overflow-hidden rounded-[14px] bg-black"
              style={{ aspectRatio: "16/7", opacity: 0 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(84,126,255,0.22),transparent_42%),radial-gradient(circle_at_top_right,rgba(232,122,255,0.16),transparent_36%),linear-gradient(135deg,#020202_0%,#0d0d12_52%,#050505_100%)]" />
              <video
                ref={videoRef}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-95"
                style={{ objectPosition: "center center" }}
                src="/banner.mp4"
              />
              <div className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.07] mix-blend-soft-light" aria-hidden="true" />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />
              <div className="absolute top-4 left-5 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                <span className="text-[8px] tracking-[0.24em] uppercase text-white/50 font-(family-name:--font-geist-mono)">Live</span>
              </div>
              {CORNER_POSITIONS.map((pos, i) => (
                <div key={i} className="absolute w-3 h-3 pointer-events-none"
                  style={{ ...pos, ...cornerBorders(i) }} aria-hidden="true" />
              ))}
            </div>
          </NoiseBackground>

          <div
            ref={statsRowRef}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/8 border border-white/8 rounded-2xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 px-7 py-6 hover:bg-white/2 transition-colors duration-300">
                <span className="text-4xl sm:text-5xl font-bold text-white font-(family-name:--font-museo-moderno) tracking-tight tabular-nums leading-none">
                  <CountUp to={s.n} suffix={s.suffix} />
                </span>
                <span className="text-[12px] font-semibold text-white/65 tracking-wide mt-1">{s.label}</span>
                <span className="text-[11px] text-white/30 leading-snug">{s.desc}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ═══ CTA CARD ═══════════════════════════════════════════════════ */}
        <div ref={cardTriggerRef} className="w-full max-w-6xl">
          <NoiseBackground
            containerClassName="w-full p-[1.5px] rounded-2xl bg-black"
            gradientColors={["rgb(180, 120, 255)", "rgb(100, 180, 255)", "rgb(255, 150, 60)"]}
            speed={0.04}
          >
            <div
              ref={cardRef}
              className="relative w-full overflow-hidden rounded-[14px] min-h-72 sm:min-h-80 bg-[#050507]"
              style={{ opacity: 0 }}
            >
              {/* pure-CSS gradient background — deep mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(120,60,220,0.22),transparent),radial-gradient(ellipse_50%_70%_at_90%_20%,rgba(60,120,255,0.15),transparent),radial-gradient(ellipse_60%_50%_at_85%_80%,rgba(220,100,40,0.10),transparent),linear-gradient(135deg,#04040a_0%,#070710_55%,#05050c_100%)]" aria-hidden="true" />
              <OrbitRings />
              <div className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.06] mix-blend-soft-light" aria-hidden="true" />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />
              {CORNER_POSITIONS.map((pos, i) => (
                <div key={i} className="absolute w-2.5 h-2.5 pointer-events-none"
                  style={{ ...pos, ...cornerBorders(i) }} aria-hidden="true" />
              ))}

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16 px-8 sm:px-12 lg:px-16 py-14 sm:py-16">

                <div className="flex flex-col items-start">
                  <div ref={labelRef} className="mb-6" style={{ opacity: 0 }}>
                    <div className="inline-flex items-center gap-2.5">
                      <span className="h-px w-8 bg-white/20" />
                      <span
                        ref={labelTextRef}
                        className="text-[9px] tracking-[0.32em] uppercase text-white/30 font-(family-name:--font-geist-mono)"
                        aria-label="Let's build together"
                      />
                    </div>
                  </div>

                  <div className="overflow-hidden mb-1">
                    <div
                      ref={line1Ref}
                      className="font-bold font-(family-name:--font-museo-moderno) text-white/95 leading-[1.06] tracking-tight"
                      style={{ fontSize: "clamp(1.9rem, 4vw, 3.1rem)", opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
                    >
                      Ready to build
                    </div>
                  </div>
                  <div className="overflow-hidden mb-6">
                    <div
                      ref={line2Ref}
                      className="font-bold font-(family-name:--font-museo-moderno) leading-[1.06] tracking-tight bg-linear-to-r from-purple-300 via-blue-300 to-orange-200 bg-clip-text text-transparent"
                      style={{ fontSize: "clamp(1.9rem, 4vw, 3.1rem)", opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
                    >
                      something great?
                    </div>
                  </div>

                  <p ref={descRef} className="text-white/40 text-sm leading-[1.85] max-w-[42ch]" style={{ opacity: 0 }}>
                    Your project should serve you, not the other way around.
                    Let&apos;s turn your vision into a polished digital reality —
                    on time, on budget, no surprises.
                  </p>
                </div>

                <div ref={ctasRef} className="flex flex-col items-start lg:items-end gap-5 shrink-0" style={{ opacity: 0 }}>
                  <MagneticButton href="/contact">Start a Project</MagneticButton>

                  <Link
                    href="/work"
                    className="group inline-flex items-center gap-2 text-white/30 text-[10px] font-medium tracking-[0.18em] uppercase hover:text-white/60 transition-colors duration-300"
                  >
                    <span>View Our Work</span>
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none"
                      className="group-hover:-translate-y-0.5 transition-transform duration-300">
                      <path d="M7 13V1M1 7l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-[9px] tracking-[0.22em] uppercase text-white/25 font-(family-name:--font-geist-mono)">
                      Available for new projects
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </NoiseBackground>
        </div>

      </div>

      <div className="w-full h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
