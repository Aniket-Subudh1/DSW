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


const ScanLine = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { top: "-2%" },
      { top: "102%", duration: 10, ease: "none", repeat: -1 }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={ref}
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent 100%)",
        }}
      />
    </div>
  );
});
ScanLine.displayName = "ScanLine";


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
        className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/60 font-[family-name:var(--font-geist-mono)]"
        aria-label={text}
      />
      <span className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
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
    const imageRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tagRefs = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (!rowRef.current) return;
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set(rowRef.current, { opacity: 0 });
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });
        gsap.set(cardRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.96,
          rotateX: 4,
        });
        gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });
        gsap.set(detailRef.current, { opacity: 0, x: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            once: true,
          },
        });

        // Row fades in
        tl.to(rowRef.current, {
          opacity: 1,
          duration: 0.3,
        });

        // Top line draws
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
        }, 0.1);

        // Number scramble
        if (numberRef.current) {
          const finalId = project.id;
          tl.to(
            numberRef.current,
            {
              duration: 0.8,
              scrambleText: {
                text: finalId,
                chars: "0123456789",
                revealDelay: 0.1,
                speed: 0.6,
              },
              ease: "none",
            },
            0.2
          );
        }

        // Card flies in — the main reveal
        tl.to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.25
        );

        // Image reveals inside card
        tl.to(
          imageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          0.45
        );

        // Details slide in
        tl.to(
          detailRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.5
        );

        // Tags stagger
        if (tagRefs.current) {
          const tags = tagRefs.current.querySelectorAll("span");
          tl.fromTo(
            tags,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.3,
              ease: "power2.out",
            },
            0.65
          );
        }
      }, rowRef);
      return () => ctx.revert();
    }, [index, project.id]);

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
          ref={lineRef}
          className="w-full h-px mb-6 sm:mb-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}50 20%, ${project.accent}50 80%, transparent)`,
            transform: "scaleX(0)",
          }}
        />

        {/* Row layout: number gutter + card */}
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } gap-5 sm:gap-6 lg:gap-10 items-start lg:items-center mb-10 sm:mb-14 lg:mb-18`}
        >
          {/* Number + meta gutter */}
          <div
            className={`shrink-0 flex lg:flex-col gap-3 lg:gap-2 items-baseline lg:items-start ${
              isEven ? "lg:w-[160px] xl:w-[200px]" : "lg:w-[160px] xl:w-[200px]"
            }`}
          >
            <span
              ref={numberRef}
              className="text-[48px] sm:text-[64px] lg:text-[80px] font-black font-[family-name:var(--font-museo-moderno)] leading-none tabular-nums select-none"
              style={{ color: `${project.accent}25` }}
            >
              ██
            </span>
            <div className="flex flex-col gap-1">
              <div
                className="h-[2px] w-8 rounded-full"
                style={{ background: `${project.accent}50` }}
              />
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 font-[family-name:var(--font-geist-mono)]">
                Project {project.id}
              </span>
            </div>
          </div>

          {/* The card — image + details */}
          <div className="relative flex-1 w-full max-w-[900px]">
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
                transformStyle: "preserve-3d",
                perspective: "1200px",
                opacity: 0,
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-[2px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${project.accent}60, ${project.accent}30, transparent)`,
                }}
              />

              <div className="flex flex-col sm:flex-row">
                {/* Image area */}
                <div
                  ref={imageRef}
                  className="relative w-full sm:w-[45%] lg:w-[40%] shrink-0 overflow-hidden"
                  style={{
                    minHeight: "200px",
                    opacity: 0,
                  }}
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
                    className="absolute bottom-3 left-4 text-[56px] font-black font-[family-name:var(--font-museo-moderno)] leading-none select-none"
                    style={{ color: `${project.accent}12` }}
                  >
                    {project.id}
                  </span>
                </div>

                {/* Details area */}
                <div
                  ref={detailRef}
                  className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col justify-center gap-3 sm:gap-4"
                  style={{ opacity: 0 }}
                >
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white/90 font-[family-name:var(--font-museo-moderno)] leading-tight tracking-tight">
                      {project.name}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mt-1 font-medium"
                      style={{ color: `${project.accent}90` }}
                    >
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/45 leading-[1.7]">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div ref={tagRefs} className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1 text-white/45 font-[family-name:var(--font-geist-mono)] hover:text-white/70 transition-colors duration-200"
                        style={{
                          border: `1px solid ${project.accent}25`,
                          background: `${project.accent}08`,
                          opacity: 0,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View project link */}
                  <div className="mt-2">
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

const TestimonialCard = memo(
  ({
    t,
    index,
    isActive,
    onClick,
  }: {
    t: (typeof TESTIMONIALS)[number];
    index: number;
    isActive: boolean;
    onClick: () => void;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!ref.current) return;
      const tween = gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          delay: 0.1 + index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
      return () => {
        tween.kill();
      };
    }, [index]);

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`relative cursor-pointer transition-all duration-500 group ${
          isActive ? "lg:col-span-2" : "lg:col-span-1"
        }`}
        style={{ opacity: 0 }}
      >
        <div
          className={`relative h-full overflow-hidden transition-all duration-500 ${
            isActive
              ? "border border-white/20 bg-white/[0.04]"
              : "border border-white/[0.06] bg-transparent hover:border-white/15 hover:bg-white/[0.02]"
          }`}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent)",
              opacity: isActive ? 1 : 0,
            }}
          />

          <div
            className={`p-5 sm:p-6 lg:p-7 transition-all duration-500 ${
              isActive ? "p-6 sm:p-7 lg:p-8" : ""
            }`}
          >
            {/* Quote SVG */}
            <svg
              width={isActive ? "44" : "28"}
              height={isActive ? "44" : "28"}
              viewBox="0 0 48 48"
              fill="none"
              className={`mb-4 transition-all duration-500 ${
                isActive
                  ? "opacity-20"
                  : "opacity-[0.07] group-hover:opacity-[0.12]"
              }`}
            >
              <path
                d="M18 14H10C7.79 14 6 15.79 6 18V26C6 28.21 7.79 30 10 30H15L12 38H17L20 30V18C20 15.79 18.21 14 16 14H18ZM38 14H30C27.79 14 26 15.79 26 18V26C26 28.21 27.79 30 30 30H35L32 38H37L40 30V18C40 15.79 38.21 14 36 14H38Z"
                fill="white"
              />
            </svg>

            {/* Quote text */}
            <p
              className={`leading-[1.75] mb-6 transition-all duration-500 ${
                isActive
                  ? "text-sm sm:text-base lg:text-lg text-white/60"
                  : "text-xs sm:text-sm text-white/45 group-hover:text-white/55"
              }`}
            >
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto">
              <div
                className={`relative shrink-0 rounded-full flex items-center justify-center font-bold font-[family-name:var(--font-geist-mono)] tracking-wider transition-all duration-500 ${
                  isActive
                    ? "w-11 h-11 text-[11px] border-2 border-white/25 text-white/70 bg-white/[0.04]"
                    : "w-9 h-9 text-[9px] border border-white/10 text-white/40"
                }`}
              >
                {t.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                {/* Spinning ring on active */}
                {isActive && (
                  <svg
                    className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90"
                    viewBox="0 0 48 48"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="rgba(255,255,255,0.30)"
                      strokeWidth="1.5"
                      strokeDasharray={2 * Math.PI * 22}
                      strokeDashoffset={2 * Math.PI * 22 * 0.7}
                      strokeLinecap="round"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 24 24"
                        to="360 24 24"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                )}
              </div>
              <div>
                <span
                  className={`block font-semibold leading-none transition-all duration-500 ${
                    isActive
                      ? "text-sm text-white/80"
                      : "text-xs text-white/55"
                  }`}
                >
                  {t.author}
                </span>
                <span
                  className={`block mt-1 leading-none transition-all duration-500 ${
                    isActive
                      ? "text-xs text-white/40"
                      : "text-[10px] text-white/25"
                  }`}
                >
                  {t.title}
                </span>
              </div>
            </div>
          </div>

          {/* Expand indicator */}
          <div
            className={`absolute bottom-4 right-4 transition-all duration-500 ${
              isActive
                ? "opacity-30 rotate-45"
                : "opacity-[0.12] group-hover:opacity-25"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M7 1v12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

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
        <span className="text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-white/40 font-[family-name:var(--font-geist-mono)] whitespace-nowrap">
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        className="absolute inset-0 pointer-events-none z-[6] bg-[url('/assets/noise.png')] bg-repeat bg-[length:200px_200px] opacity-[0.07] mix-blend-soft-light"
        aria-hidden="true"
      />

      <CircuitBackground />
      <ScanLine />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 xl:px-24 pt-16 sm:pt-20 lg:pt-28">
        <SectionLabel text="// selected work" />

        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
          <div>
            <h2 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold text-white font-[family-name:var(--font-museo-moderno)] leading-[1.0] tracking-tight">
              Our Craft
            </h2>
            <p className="text-sm sm:text-base text-white/45 mt-3 max-w-[480px] leading-[1.7]">
              Every project is treated as a product - architected for scale,
              designed for users, shipped with precision.
            </p>
          </div>

          {/* Counter */}
          <div className="flex items-baseline gap-3 select-none shrink-0">
            <span
              ref={counterRef}
              className="text-[64px] sm:text-[80px] lg:text-[112px] font-black font-[family-name:var(--font-museo-moderno)] leading-none tabular-nums"
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
              <span className="text-[10px] sm:text-[11px] text-white/35 tracking-[0.2em] uppercase font-[family-name:var(--font-geist-mono)] leading-none">
                projects
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/20 tracking-[0.2em] uppercase font-[family-name:var(--font-geist-mono)] leading-none">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={i}
              t={t}
              index={i}
              isActive={activeTestimonial === i}
              onClick={() => setActiveTestimonial(i)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className="group relative p-1"
              aria-label={`Testimonial ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  activeTestimonial === i
                    ? "w-7 h-2 bg-white/35"
                    : "w-2 h-2 bg-white/15 group-hover:bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}