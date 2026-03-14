"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);


const PROJECTS = [
  {
    id: "01",
    name: "Project Name",
    tagline: "Brief one-line tagline for this project",
    description:
      "A short paragraph describing what this project does, the problem it solves, and the impact it delivered. Replace with real details.",
    image: "/assets/bg.png", 
    tags: ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
    accent: "#8b5cf6",
  },
  {
    id: "02",
    name: "Project Name",
    tagline: "Brief one-line tagline for this project",
    description:
      "A short paragraph describing what this project does, the problem it solves, and the impact it delivered. Replace with real details.",
    image: "/assets/bg.png",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
    accent: "#f59e0b",
  },
  {
    id: "03",
    name: "Project Name",
    tagline: "Brief one-line tagline for this project",
    description:
      "A short paragraph describing what this project does, the problem it solves, and the impact it delivered. Replace with real details.",
    image: "/assets/bg.png",
    tags: ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
    accent: "#10b981",
  },
  {
    id: "04",
    name: "Project Name",
    tagline: "Brief one-line tagline for this project",
    description:
      "A short paragraph describing what this project does, the problem it solves, and the impact it delivered. Replace with real details.",
    image: "/assets/bg.png",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
    accent: "#3b82f6",
  },
];


const TESTIMONIALS = [
  {
    text: "Replace with a real client testimonial. This is placeholder text that shows how the quote will look when populated with actual feedback.",
    author: "Client Name",
    title: "Role, Company",
  },
  {
    text: "Replace with a real client testimonial. This is placeholder text that shows how the quote will look when populated with actual feedback.",
    author: "Client Name",
    title: "Role, Company",
  },
  {
    text: "Replace with a real client testimonial. This is placeholder text that shows how the quote will look when populated with actual feedback.",
    author: "Client Name",
    title: "Role, Company",
  },
  {
    text: "Replace with a real client testimonial. This is placeholder text that shows how the quote will look when populated with actual feedback.",
    author: "Client Name",
    title: "Role, Company",
  },
];


const CircuitBackground = memo(() => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    aria-hidden="true"
  >
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 1200 2400"
      style={{ opacity: 0.06 }}
    >
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={i * 200}
          y1="0"
          x2={i * 200}
          y2="2400"
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray={i % 2 === 0 ? "none" : "3 8"}
        />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 200}
          x2="1200"
          y2={i * 200}
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray={i % 2 === 0 ? "none" : "3 8"}
        />
      ))}
      <path
        d="M200,0 L200,400 L600,400 L600,800"
        stroke="white"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 8"
        opacity="0.5"
      />
      <path
        d="M1000,200 L800,200 L800,600 L400,600"
        stroke="white"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 8"
        opacity="0.5"
      />
      {[
        [200, 400],
        [600, 400],
        [600, 800],
        [800, 200],
        [800, 600],
        [400, 600],
      ].map(([x, y], i) => (
        <g key={`nd${i}`}>
          <circle cx={x} cy={y} r="4" fill="white" opacity="0.35" />
          <circle
            cx={x}
            cy={y}
            r="8"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.15"
          />
        </g>
      ))}
    </svg>
  </div>
));
CircuitBackground.displayName = "CircuitBackground";





const SectionLabel = memo(({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(ref.current, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
      tl.to(ref.current, { opacity: 1, duration: 0.4 }, 0);
      tl.to(
        textRef.current,
        {
          duration: 1.4,
          scrambleText: {
            text,
            chars: "█▓▒░_/\\|<>{}[]",
            revealDelay: 0.3,
            speed: 0.5,
          },
          ease: "none",
        },
        0.1
      );
    }, ref);
    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-8 sm:mb-10"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        <span className="w-1 h-1 rounded-full bg-white/15" />
      </div>
      <span
        ref={textRef}
        className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/60 font-(family-name:--font-geist-mono)"
        aria-label={text}
      />
      <span className="flex-1 h-px bg-linear-to-r from-white/20 to-transparent" />
    </div>
  );
});
SectionLabel.displayName = "SectionLabel";

const ProjectCard = memo(
  ({
    project,
    index,
  }: {
    project: (typeof PROJECTS)[number];
    index: number;
  }) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!rowRef.current) return;
      const tween = gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      return () => { tween.kill(); };
    }, [index]);

    // Hover — glow + lift
    const onEnter = useCallback(() => {
      if (!cardRef.current || !glowRef.current) return;
      gsap.to(cardRef.current, {
        y: -6,
        boxShadow: `0 20px 60px ${project.accent}18, 0 8px 24px rgba(0,0,0,0.3)`,
        borderColor: `${project.accent}30`,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }, [project.accent]);

    const onLeave = useCallback(() => {
      if (!cardRef.current || !glowRef.current) return;
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        borderColor: "rgba(255,255,255,0.08)",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        ease: "power2.out",
      });
    }, []);

    const isEven = index % 2 === 0;

    return (
      <div ref={rowRef} className="relative w-full" style={{ opacity: 0 }}>
        {/* Top separator line */}
        <div
          className="w-full h-px mb-6 sm:mb-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}50 20%, ${project.accent}50 80%, transparent)`,
          }}
        />

        {/* Row layout: number gutter + card */}
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } gap-5 sm:gap-6 lg:gap-8 items-start lg:items-center mb-6 sm:mb-8 lg:mb-10`}
        >
          {/* Number + meta gutter */}
          <div
            className={`shrink-0 flex lg:flex-col gap-3 lg:gap-2 items-baseline lg:items-start ${
              isEven ? "lg:w-40 xl:w-50" : "lg:w-40 xl:w-50"
            }`}
          >
            <span
              className="text-[32px] sm:text-[40px] lg:text-[48px] font-black font-(family-name:--font-museo-moderno) leading-none tabular-nums select-none"
              style={{ color: `${project.accent}25` }}
            >
              {project.id}
            </span>
            <div className="flex flex-col gap-1">
              <div
                className="h-0.5 w-8 rounded-full"
                style={{ background: `${project.accent}50` }}
              />
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 font-(family-name:--font-geist-mono)">
                Project {project.id}
              </span>
            </div>
          </div>

          {/* The card — image + details */}
          <div className="relative flex-1 w-full max-w-225">
            {/* Accent glow */}
            <div
              ref={glowRef}
              className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle, ${project.accent}15 0%, transparent 70%)`,
                opacity: 0,
                transform: "scale(0.85)",
              }}
            />

            <div
              ref={cardRef}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="relative z-10 overflow-hidden cursor-default"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-0.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${project.accent}60, ${project.accent}30, transparent)`,
                }}
              />

              <div className="flex flex-col sm:flex-row">
                {/* Image area */}
                <div
                  className="relative w-full sm:w-[45%] lg:w-[40%] shrink-0 overflow-hidden"
                  style={{ minHeight: "160px" }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  {/* Color overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}20 0%, transparent 60%)`,
                      mixBlendMode: "normal",
                    }}
                  />
                  {/* Fade edge toward text */}
                  <div
                    className="absolute inset-0 hidden sm:block"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.95) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 sm:hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.95) 100%)",
                    }}
                  />
                  {/* Project number watermark on image */}
                  <span
                    className="absolute bottom-3 left-4 text-[56px] font-black font-(family-name:--font-museo-moderno) leading-none select-none"
                    style={{ color: `${project.accent}12` }}
                  >
                    {project.id}
                  </span>
                </div>

                {/* Details area */}
                <div
                  className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col justify-center gap-2 sm:gap-3"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white/90 font-(family-name:--font-museo-moderno) leading-tight tracking-tight">
                      {project.name}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mt-1 font-medium"
                      style={{ color: `${project.accent}90` }}
                    >
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/45 leading-[1.7] line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase px-3 py-1 text-white/45 font-(family-name:--font-geist-mono) hover:text-white/70 transition-colors duration-200"
                        style={{
                          border: `1px solid ${project.accent}25`,
                          background: `${project.accent}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View project link */}
                  <div>
                    <span
                      className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase cursor-pointer group/link transition-colors duration-300"
                      style={{ color: `${project.accent}80` }}
                    >
                      <span className="group-hover/link:tracking-[0.18em] transition-all duration-300">
                        View Project
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="group-hover/link:translate-x-1 transition-transform duration-300"
                      >
                        <path
                          d="M1 7h11M8 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

const SectionDivider = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const children = ref.current.querySelectorAll("[data-anim]");
    gsap.fromTo(
      children,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1,
        scaleX: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 sm:gap-4 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24"
    >
      <div
        data-anim
        className="flex-1 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15))",
        }}
      />
      <div data-anim className="flex items-center gap-2.5 origin-center">
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        <span className="text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-white/40 font-(family-name:--font-geist-mono) whitespace-nowrap">
          Client Voices
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>
      <div
        data-anim
        className="flex-1 h-px origin-right"
        style={{
          background:
            "linear-gradient(270deg, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15))",
        }}
      />
    </div>
  );
});
SectionDivider.displayName = "SectionDivider";

export default function CraftReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const currentIdxRef = useRef(0);

  const slideTo = useCallback((raw: number) => {
    const newIdx = Math.min(Math.max(0, raw), TESTIMONIALS.length - 2);
    currentIdxRef.current = newIdx;
    setCurrentIdx(newIdx);
    if (trackRef.current && carouselRef.current) {
      const cardW = carouselRef.current.offsetWidth / 2;
      gsap.to(trackRef.current, { x: -newIdx * cardW, duration: 0.55, ease: "power2.inOut" });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = currentIdxRef.current >= TESTIMONIALS.length - 2 ? 0 : currentIdxRef.current + 1;
      slideTo(next);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideTo]);

  useEffect(() => {
    if (!counterRef.current) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: 50,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (counterRef.current)
          counterRef.current.textContent = String(
            Math.round(obj.val)
          ).padStart(2, "0");
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none z-6 bg-[url('/assets/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.07] mix-blend-soft-light"
        aria-hidden="true"
      />

      <CircuitBackground />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 xl:px-24 pt-16 sm:pt-20 lg:pt-28">
        <SectionLabel text="// selected work" />

        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
          <div>
            <h2 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold text-white font-(family-name:--font-museo-moderno) leading-none tracking-tight">
              Our Craft
            </h2>
            <p className="text-sm sm:text-base text-white/45 mt-3 max-w-120 leading-[1.7]">
              Every project is treated as a product - architected for scale,
              designed for users, shipped with precision.
            </p>
          </div>

          {/* Counter */}
          <div className="flex items-baseline gap-3 select-none shrink-0">
            <span
              ref={counterRef}
              className="text-[64px] sm:text-[80px] lg:text-[112px] font-black font-(family-name:--font-museo-moderno) leading-none tabular-nums"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              00
            </span>
            <div className="flex flex-col gap-0.5 mb-2">
              <span className="text-[10px] sm:text-[11px] text-white/35 tracking-[0.2em] uppercase font-(family-name:--font-geist-mono) leading-none">
                projects
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/20 tracking-[0.2em] uppercase font-(family-name:--font-geist-mono) leading-none">
                shipped
              </span>
            </div>
          </div>
        </div>

        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <SectionDivider />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 xl:px-24 pb-16 sm:pb-20 lg:pb-28">
        {/* Testimonials — 2-up GSAP slide carousel */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Viewport — clips the sliding track */}
          <div ref={carouselRef} className="overflow-hidden w-full">
            <div ref={trackRef} className="flex will-change-transform">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-1/2 shrink-0 px-2 sm:px-3">
                  <div className="relative border border-white/10 bg-white/3 p-5 sm:p-6 h-full flex flex-col">
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.20) 30%, rgba(255,255,255,0.20) 70%, transparent)",
                      }}
                    />
                    {/* Quote icon */}
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="mb-4 opacity-15 shrink-0" aria-hidden="true">
                      <path
                        d="M18 14H10C7.79 14 6 15.79 6 18V26C6 28.21 7.79 30 10 30H15L12 38H17L20 30V18C20 15.79 18.21 14 16 14H18ZM38 14H30C27.79 14 26 15.79 26 18V26C26 28.21 27.79 30 30 30H35L32 38H37L40 30V18C40 15.79 38.21 14 36 14H38Z"
                        fill="white"
                      />
                    </svg>
                    <p className="text-sm text-white/60 leading-[1.8] mb-5 flex-1 line-clamp-4">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                      <div className="w-9 h-9 shrink-0 rounded-full border border-white/15 flex items-center justify-center text-xs font-bold text-white/50 font-(family-name:--font-geist-mono)">
                        {t.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-white/75 leading-none">
                          {t.author}
                        </span>
                        <span className="block text-xs text-white/35 mt-1">
                          {t.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2.5">
              {Array.from({ length: TESTIMONIALS.length - 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => slideTo(i)}
                  className="group relative p-1"
                  aria-label={`Slide ${i + 1}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      currentIdx === i
                        ? "w-7 h-2 bg-white/35"
                        : "w-2 h-2 bg-white/15 group-hover:bg-white/25"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => slideTo(currentIdx - 1)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/25 transition-all duration-200"
                aria-label="Previous testimonials"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 2L4 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => slideTo(currentIdx + 1)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/25 transition-all duration-200"
                aria-label="Next testimonials"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}