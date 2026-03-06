"use client";

import React, { useEffect, useId, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Lottie from "lottie-react";
import developerAnim from "@/public/assets/Coding Development.json";
import futureTechAnim from "@/public/assets/Future tech Ui.json";
import cloudAnim from "@/public/assets/cloud.json";
import uiUxAnim from "@/public/assets/ui ux.json";
import deliveryImage from "@/public/assets/delivery.png";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

type HProps = { pos: "top" | "bottom"; offset: number; overhang: number; opacity: number; delay: number };
type VProps = { pos: "left" | "right"; offset: number; overhang: number; opacity: number; delay: number };

const H = ({ pos, offset, overhang, opacity, delay }: HProps) => (
  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: "absolute", display: "block",
      [pos]: offset, left: -overhang, right: -overhang,
      height: "2px", backgroundColor: `rgba(0,0,0,${opacity})`, transformOrigin: "left",
    }}
  />
);

const V = ({ pos, offset, overhang, opacity, delay }: VProps) => (
  <motion.span
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: "absolute", display: "block",
      [pos]: offset, top: -overhang, bottom: -overhang,
      width: "2px", backgroundColor: `rgba(0,0,0,${opacity})`, transformOrigin: "top",
    }}
  />
);


const ServicesHeading = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!textRef.current || !wrapRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top 82%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.fromTo(wrapRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: "opacity,y" }, 0);
      tl.fromTo(dotRefs.current.filter(Boolean),
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.07, duration: 0.35, ease: "back.out(2.5)" }, 0.1);
      tl.to(textRef.current, {
        duration: 1.0,
        scrambleText: {
          text: "Our Services",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          revealDelay: 0.2, speed: 0.6,
        },
        ease: "none",
      }, 0.15);
      tl.fromTo(underlineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.65, ease: "power4.out" }, 0.75);
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      duration: 0.65,
      scrambleText: { text: "Our Services", chars: "▲▼◆●○□◇►◄▸❯❮✦✧⟡", revealDelay: 0.05, speed: 0.95 },
      ease: "none",
    });
  }, []);

  const handleTouchStart = useCallback(() => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      duration: 0.7,
      scrambleText: { text: "Our Services", chars: "◆▲○□◇❯✦⟡", revealDelay: 0.05, speed: 0.9 },
      ease: "none",
    });
  }, []);

  const cornerPositions: React.CSSProperties[] = [
    { top: -5, left: -7 }, { top: -5, right: -7 },
    { bottom: -5, left: -7 }, { bottom: -5, right: -7 },
  ];

  return (
    <div ref={wrapRef} className="w-full flex justify-center mb-3 sm:mb-4" style={{ opacity: 0 }}>
      <div
        className="relative inline-flex flex-col items-center cursor-default"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
      >
        {cornerPositions.map((style, i) => (
          <span key={i} ref={(el) => { dotRefs.current[i] = el; }} aria-hidden="true"
            style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.25)", opacity: 0, ...style }} />
        ))}
        <h2
          className="font-bold mb-4 font-[family-name:var(--font-museo-moderno)] whitespace-nowrap"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", letterSpacing: "-0.02em", color: "rgba(0,0,0,0.88)", lineHeight: 1.1, margin: 0 }}
        >
          <span ref={textRef} aria-label="Our Services" />
        </h2>
        <span ref={underlineRef} aria-hidden="true"
          style={{ display: "block", height: "2px", width: "100%", marginTop: "0.3em", background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)", borderRadius: "2px", transform: "scaleX(0)", transformOrigin: "left" }} />
      </div>
    </div>
  );
};

const BentoCard = ({
  children, className = "", innerRef,
}: {
  children: React.ReactNode;
  className?: string;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const ownRef = useRef<HTMLDivElement>(null);
  const ref = innerRef ?? ownRef;

  const handleEnter = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { y: -3, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", duration: 0.28, ease: "power2.out" });
  }, [ref]);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { y: 0, boxShadow: "0 1px 8px rgba(0,0,0,0.05)", duration: 0.35, ease: "power2.out" });
  }, [ref]);

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`rounded-2xl border border-dashed border-black/[0.13] bg-white/85 backdrop-blur-sm overflow-hidden ${className}`}
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
    >
      {children}
    </div>
  );
};


const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-black/60 font-bold block">{children}</span>
);


const ServiceAnim = ({ index }: { index: number }) => {
  const anims = [
    <div key="developer" className="w-full h-full" style={{ opacity: 0.8 }}>
      <Lottie animationData={developerAnim} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>,

    <div key="futuretech" className="w-full h-full" style={{ opacity: 0.8 }}>
      <Lottie animationData={futureTechAnim} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>,

    <div key="cloud" className="w-full h-full" style={{ opacity: 0.8 }}>
      <Lottie animationData={cloudAnim} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>,

    <div key="uiux" className="w-full h-full" style={{ opacity: 0.8 }}>
      <Lottie animationData={uiUxAnim} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>,

    <svg key="solar" viewBox="0 0 512 512" className="w-full h-full" style={{ padding: '8%' }}>
      <g fill="#000" opacity="0.28">
        <path d="M346.152,235.112c-1.074-4.652-5.719-7.556-10.367-6.478c-4.652,1.074-7.552,5.716-6.478,10.367c1.278,5.537,1.927,11.256,1.927,16.998c0,41.485-33.75,75.235-75.235,75.235c-41.485,0-75.235-33.75-75.235-75.235c0-41.485,33.75-75.235,75.235-75.235c25.033,0,48.356,12.403,62.391,33.177c2.672,3.956,8.045,4.995,12.002,2.324c3.957-2.673,4.996-8.046,2.325-12.003c-17.254-25.539-45.934-40.786-76.717-40.786c-51.018,0-92.524,41.506-92.524,92.524s41.506,92.524,92.524,92.524c51.018,0,92.524-41.506,92.524-92.524C348.523,248.95,347.726,241.923,346.152,235.112z"/>
        <path d="M430.911,34.115c-25.902,0-46.975,21.073-46.975,46.974c0,25.902,21.073,46.974,46.975,46.974c25.902,0,46.974-21.072,46.974-46.974C477.885,55.188,456.813,34.115,430.911,34.115z M430.911,110.774c-16.369,0-29.686-13.317-29.686-29.685s13.317-29.685,29.686-29.685c16.368,0,29.685,13.317,29.685,29.685C460.596,97.458,447.279,110.774,430.911,110.774z"/>
        <path d="M255.999,380.397c-20.048,0-36.357,16.309-36.357,36.357c0,20.047,16.309,36.356,36.357,36.356c20.048,0,36.357-16.309,36.357-36.356C292.357,396.706,276.048,380.397,255.999,380.397z M255.999,435.821c-10.514,0-19.068-8.553-19.068-19.067c0-10.515,8.555-19.068,19.068-19.068c10.514,0,19.068,8.553,19.068,19.068C275.068,427.268,266.513,435.821,255.999,435.821z"/>
        <path d="M187.014,391.606c-11.039-5.628-21.393-12.619-30.774-20.775c-3.601-3.132-9.062-2.751-12.194,0.851c-3.134,3.603-2.752,9.063,0.851,12.195c10.444,9.081,21.972,16.863,34.265,23.131c1.258,0.642,2.598,0.945,3.919,0.945c3.145,0,6.18-1.724,7.708-4.72C192.958,398.98,191.267,393.774,187.014,391.606z"/>
        <path d="M326.455,101.908c-12.572-5.758-25.843-9.954-39.444-12.47c-4.697-0.868-9.205,2.23-10.074,6.925c-0.869,4.695,2.234,9.205,6.927,10.074c12.204,2.258,24.111,6.023,35.391,11.189c1.168,0.535,2.389,0.787,3.594,0.787c3.278,0,6.412-1.873,7.865-5.047C332.703,109.025,330.794,103.895,326.455,101.908z"/>
        <path d="M136.161,39.376c-2.461-4.092-7.771-5.414-11.864-2.954c-10.869,6.535-21.371,13.972-31.215,22.101c-3.681,3.041-4.202,8.489-1.162,12.17c1.709,2.069,4.18,3.14,6.67,3.14c1.939,0,3.889-0.649,5.499-1.979c9.185-7.585,18.982-14.52,29.118-20.615C137.298,48.777,138.619,43.466,136.161,39.376z"/>
        <path d="M380.279,32.108c-11.121-6.172-22.818-11.557-34.764-16.004c-4.477-1.669-9.451,0.612-11.118,5.086c-1.664,4.474,0.613,9.451,5.087,11.117c11.136,4.146,22.04,9.164,32.405,14.917c1.329,0.738,2.767,1.088,4.187,1.088c3.039,0,5.987-1.606,7.566-4.451C385.959,39.686,384.454,34.424,380.279,32.108z"/>
        <path d="M362.768,376.488c-2.971-3.738-8.412-4.356-12.146-1.384c-9.735,7.744-20.389,14.275-31.668,19.41c-4.346,1.978-6.264,7.105-4.286,11.45c1.45,3.183,4.588,5.064,7.873,5.064c1.198,0,2.416-0.25,3.576-0.779c12.562-5.719,24.428-12.991,35.268-21.613C365.12,385.663,365.74,380.225,362.768,376.488z"/>
        <path d="M419.985,441.395c-3.039-3.684-8.489-4.205-12.17-1.168c-9.187,7.578-18.988,14.509-29.127,20.6c-4.093,2.457-5.418,7.768-2.96,11.861c1.622,2.699,4.484,4.194,7.419,4.194c1.515,0,3.05-0.399,4.442-1.234c10.875-6.532,21.382-13.961,31.228-22.085C422.5,450.526,423.023,445.077,419.985,441.395z"/>
        <animateTransform attributeName="transform" type="rotate" from="0 256 256" to="360 256 256" dur="60s" repeatCount="indefinite"/>
      </g>
    </svg>,
  ];
  return anims[index % anims.length];
};


const HeadlineCard = ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const targets = [50, 100, 4];
    const suffixes = ["+", "%", "wk"];
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targets[i], duration: 1.2, delay: 0.35 + i * 0.12, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => { if (el) el.textContent = Math.round(obj.val) + suffixes[i]; },
      });
    });
  }, []);

  const stats = [
    { label: "Projects shipped", note: "MVPs to enterprise" },
    { label: "Client retention",  note: "All clients renewed" },
    { label: "Avg. delivery",     note: "Kickoff to live" },
  ];

  return (
    <BentoCard innerRef={innerRef} className="p-3 sm:p-4 !bg-black !border-black relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 600 200">
        {[58, 126].map((y, i) => (
          <g key={`h-${i}`}>
            <line x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            <circle r="2" fill="rgba(255,255,255,0.34)">
              <animateMotion dur={`${10 + i * 1.5}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" path={`M0,${y} L600,${y}`} />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur={`${10 + i * 1.5}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="5" fill="rgba(255,255,255,0.04)">
              <animateMotion dur={`${10 + i * 1.5}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" path={`M0,${y} L600,${y}`} />
              <animate attributeName="opacity" values="0;0.28;0.28;0" dur={`${10 + i * 1.5}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {[200, 400].map((x, i) => (
          <g key={`v-${i}`}>
            <line x1={x} y1="0" x2={x} y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <circle r="1.8" fill="rgba(255,255,255,0.30)">
              <animateMotion dur={`${12 + i * 1.8}s`} begin={`${1 + i * 1.8}s`} repeatCount="indefinite" path={`M${x},0 L${x},200`} />
              <animate attributeName="opacity" values="0;0.55;0.55;0" dur={`${12 + i * 1.8}s`} begin={`${1 + i * 1.8}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      <div className="absolute inset-[4px] rounded-xl border border-dashed border-white/[0.06] pointer-events-none" />
      <div className="relative z-10">
        <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-[1.3] font-[family-name:var(--font-museo-moderno)]">
  We design, build and deliver{" "}
  <span className="text-white/50">reliable, production-ready software</span>{" "}
  - turning ideas into scalable digital products.
</p>
        <div className="mt-3 sm:mt-4 grid grid-cols-3 divide-x divide-dashed divide-white/[0.10] w-fit">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-1.5 ${i > 0 ? "pl-3 sm:pl-4" : ""} ${i < 2 ? "pr-3 sm:pr-4" : ""}`}>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-museo-moderno)] leading-none tabular-nums"
                ref={(el) => { numRefs.current[i] = el; }}>0</span>
              <span className="text-[10px] sm:text-xs text-white/60 font-semibold tracking-[0.1em] uppercase leading-none mt-1">{s.label}</span>
              <span className="text-[9px] sm:text-[11px] text-white/40 leading-tight">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};


const HowWeWorkCard = ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
  const lineRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!lineRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: lineRef.current, start: "top 88%", once: true },
    });
    tl.fromTo(
      lineRef.current,
      { attr: { x2: 30 } },
      { attr: { x2: 270 }, duration: 1.1, ease: "power2.inOut" }
    );
    nodeRefs.current.forEach((node, i) => {
      tl.fromTo(
        node,
        { attr: { r: 0 } },
        { attr: { r: 10 }, duration: 0.3, ease: "back.out(3)" },
        0.1 + i * 0.35
      );
    });
  }, []);

  const steps = [
    { x: 30, num: "01", label: "DISCOVER", sub: "Scope & plan" },
    { x: 150, num: "02", label: "BUILD", sub: "Sprint delivery" },
    { x: 270, num: "03", label: "LAUNCH", sub: "Ship & iterate" },
  ];

  return (
    <BentoCard innerRef={innerRef} className="sm:col-span-2 lg:col-span-2 p-2.5 sm:p-3 flex flex-col">
      <div className="flex items-center gap-2 font-[family-name:var(--font-museo-moderno)] font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
        <span className="text-black/22 text-[0.88em]">{"{"}</span>
        <span className="text-black/78">How We Work</span>
        <span className="text-black/22 text-[0.88em]">{"}"}</span>
      </div>
      <p className="text-[10px] sm:text-xs text-black/50 mt-0.5 mb-2">Our three-phase delivery framework</p>
      <div className="flex-1 flex items-center w-full">
        <svg viewBox="0 0 300 80" fill="none" className="w-full overflow-visible">
          <line x1="30" y1="22" x2="270" y2="22" stroke="rgba(0,0,0,0.20)" strokeWidth="1.5" strokeDasharray="5 4" />
          <line ref={lineRef} x1="30" y1="22" x2="30" y2="22" stroke="rgba(0,0,0,0.70)" strokeWidth="2.5" strokeLinecap="round" />
          <circle r="4" fill="rgba(0,0,0,0.55)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M30,22 L270,22" />
            <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle r="14" fill="rgba(0,0,0,0.10)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M30,22 L270,22" />
            <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.5s" repeatCount="indefinite" />
          </circle>
          {steps.map((s, i) => (
            <g key={s.label}>
              <circle cx={s.x} cy="22" r="14" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5">
                <animate attributeName="r" values="12;20;12" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle ref={(el) => { nodeRefs.current[i] = el; }} cx={s.x} cy="22" r="0" fill="rgba(0,0,0,0.85)" />
              <text x={s.x} y="26" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="inherit">
                {s.num}
              </text>
              <text x={s.x} y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="rgba(0,0,0,0.80)" letterSpacing="0.08em" fontFamily="inherit">
                {s.label}
              </text>
              <text x={s.x} y="62" textAnchor="middle" fontSize="9" fill="rgba(0,0,0,0.45)" fontFamily="inherit">
                {s.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </BentoCard>
  );
};

const DeliveryCard = ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <BentoCard innerRef={innerRef} className="sm:col-span-2 lg:col-span-2 p-2.5 sm:p-3 flex flex-col">
      <div className="flex items-center gap-2 font-[family-name:var(--font-museo-moderno)] font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
        <span className="text-black/22 text-[0.88em]">{"{"}</span>
        <span className="text-black/78">Delivery Timeline</span>
        <span className="text-black/22 text-[0.88em]">{"}"}</span>
      </div>
      <p className="text-[10px] sm:text-xs text-black/50 font-medium mt-0.5 mb-2">Typical MVP: 4 - 6 weeks</p>
      <div className="w-full">
        <Image
          src={deliveryImage}
          alt="Delivery timeline chart"
          className="block w-full h-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
        />
      </div>
    </BentoCard>
  );
};

const EngagementCard = ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const models = [
    {
      tag: "01",
      headline: "Project-Based",
      detail: "Defined scope, timeline & price.",
      badge: "Popular",
      icon: (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="6" stroke="rgba(0,0,0,0.32)" strokeWidth="1.5" />
          <path d="M10 16.5L14 20.5L22 11" stroke="rgba(0,0,0,0.65)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      tag: "02",
      headline: "Ongoing Retainer",
      detail: "Monthly hours for iteration & growth.",
      badge: "Long-term",
      icon: (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="rgba(0,0,0,0.32)" strokeWidth="1.5" />
          <path d="M16 9V16L20.5 18.5" stroke="rgba(0,0,0,0.65)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      tag: "03",
      headline: "Team Extension",
      detail: "Engineers embedded in your team.",
      badge: "Flexible",
      icon: (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <circle cx="12" cy="12" r="3.5" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" />
          <circle cx="21" cy="12" r="3.5" stroke="rgba(0,0,0,0.30)" strokeWidth="1.5" />
          <path d="M5 26c0-4 3-7 7-7s7 3 7 7" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 26c0-4 3-7 7-7" stroke="rgba(0,0,0,0.30)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const targets = rowRefs.current.filter(Boolean);
    if (!targets.length) return;
    gsap.fromTo(targets,
      { opacity: 0, x: -12 },
      {
        opacity: 1, x: 0,
        stagger: 0.1, duration: 0.45, ease: "power2.out",
        scrollTrigger: { trigger: targets[0], start: "top 88%", once: true },
      }
    );
  }, []);

  return (
    <BentoCard innerRef={innerRef} className="sm:col-span-2 md:col-span-2 p-2.5 sm:p-3 flex flex-col">
      <div className="flex items-center gap-2 font-[family-name:var(--font-museo-moderno)] font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
        <span className="text-black/22 text-[0.88em]">{"{"}</span>
        <span className="text-black/78">Engagement Models</span>
        <span className="text-black/22 text-[0.88em]">{"}"}</span>
      </div>
      <p className="text-[10px] sm:text-xs text-black/50 mt-0.5 mb-2">Three ways to work with us</p>
      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {models.map((m, i) => (
          <div
            key={m.tag}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="flex items-center gap-2 p-1.5 sm:p-2 rounded-md border border-dashed border-black/[0.12] bg-gradient-to-r from-black/[0.02] to-transparent hover:border-black/25 hover:from-black/[0.04] transition-all duration-300"
            style={{ opacity: 0 }}
          >
            <div className="shrink-0">{m.icon}</div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-black/85 leading-none">{m.headline}</span>
                <span className="text-[7px] font-bold tracking-[0.1em] uppercase text-black/45 border border-dashed border-black/20 rounded-full px-1.5 py-0.5 leading-none">{m.badge}</span>
              </div>
              <span className="text-[10px] text-black/50 mt-0.5 leading-snug">{m.detail}</span>
            </div>
            <span className="shrink-0 text-lg font-black text-black/40 font-[family-name:var(--font-museo-moderno)] leading-none">{m.tag}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};


const DeliverablesCard = ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const items = [
    "Full source code ownership & handoff",
    "CI/CD pipeline + cloud deployment",
    "Figma designs & component library",
    "Documentation & onboarding guide",
  ];

  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll<HTMLLIElement>("li");
    gsap.fromTo(rows,
      { opacity: 0, x: -10 },
      {
        opacity: 1, x: 0,
        stagger: 0.09, duration: 0.4, ease: "power2.out",
        scrollTrigger: { trigger: listRef.current, start: "top 88%", once: true },
      }
    );
  }, []);

  return (
    <BentoCard innerRef={innerRef} className="sm:col-span-2 lg:col-span-1 p-2.5 sm:p-3 flex flex-col relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 128 128" style={{ padding: '10%', opacity: 0.12 }}>
        <g fill="#000">
          <path d="M51.54,61.5A12.46,12.46,0,1,0,64,49.05,12.47,12.47,0,0,0,51.54,61.5Zm22.92,0A10.46,10.46,0,1,1,64,51.05,10.47,10.47,0,0,1,74.46,61.5Z"/>
          <path d="M14.2,31.49l-.06.12A1,1,0,0,0,14.48,33a1,1,0,0,0,.51.14,1,1,0,0,0,.86-.48h0a7.64,7.64,0,0,0,9.33-11.69h0a1,1,0,0,0-1.38-1.45l-.09.09A7.63,7.63,0,0,0,14.2,31.49Zm5.1-11.33a5.65,5.65,0,1,1-5.65,5.65A5.65,5.65,0,0,1,19.3,20.16Z"/>
          <path d="M110.16,78.76a7.64,7.64,0,0,0-4.31-6.86c0-.05,0-.1,0-.15a1,1,0,0,0-1.94-.49,7.56,7.56,0,0,0-1.44-.14,7.63,7.63,0,0,0-4.65,13.7A1,1,0,0,0,99.52,86l.08-.12a7.64,7.64,0,0,0,10.56-7.07Zm-7.65,5.65a5.65,5.65,0,1,1,5.65-5.65A5.66,5.66,0,0,1,102.51,84.41Z"/>
          <path d="M106.12,30.46A7.56,7.56,0,0,0,110,29.37h0a1,1,0,0,0,.82.43,1,1,0,0,0,.57-.18,1,1,0,0,0,.24-1.39l-.07-.11A7.64,7.64,0,0,0,101.28,16.9l-.1-.08a1,1,0,0,0-1.28,1.54h0a7.56,7.56,0,0,0-1.43,4.44A7.65,7.65,0,0,0,106.12,30.46Zm5.65-7.65a5.65,5.65,0,1,1-5.65-5.65A5.66,5.66,0,0,1,111.77,22.81Z"/>
          <path d="M58.14,117.33a1,1,0,0,0-.21,2h.12a6,6,0,0,0,11.9,0h.12a1,1,0,1,0-.21-2h0a6,6,0,0,0-11.69,0ZM64,114.65a4,4,0,0,1,4,3.83v0s0,.07,0,.11a4,4,0,0,1-8,0,.52.52,0,0,1,0-.11v0A4,4,0,0,1,64,114.65Z"/>
          <path d="M40.44,80.81a5.94,5.94,0,0,0,2.46-.54l.14.17a1,1,0,0,0,.74.33,1,1,0,0,0,.67-.26,1,1,0,0,0,.11-1.35A6,6,0,0,0,38.84,69a1,1,0,0,0-1.88.65c0,.07,0,.13.07.2a6,6,0,0,0,3.41,10.92Zm0-10a4,4,0,1,1-4,4A4,4,0,0,1,40.44,70.82Z"/>
          <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="-360 64 64" dur="55s" repeatCount="indefinite"/>
        </g>
      </svg>
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-2 font-[family-name:var(--font-museo-moderno)] font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
          <span className="text-black/22 text-[0.88em]">{"{"}</span>
          <span className="text-black/78">What You Get</span>
          <span className="text-black/22 text-[0.88em]">{"}"}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-black/50 mt-0.5 mb-2">Every engagement includes</p>
        <ul ref={listRef} className="flex flex-col gap-1.5 flex-1 justify-center">
          {items.map((text) => (
            <li key={text} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-black/[0.02] transition-colors duration-200" style={{ opacity: 0 }}>
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none" className="shrink-0">
                <rect x="1" y="1" width="20" height="20" rx="6" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                <path d="M6.5 11.5L9.5 14.5L15.5 7.5" stroke="rgba(0,0,0,0.60)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] sm:text-xs text-black/75 leading-snug font-medium">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
};


interface ServiceTileProps {
  service: (typeof services)[number];
  layoutId: string; imageLayoutId: string; titleLayoutId: string;
  descLayoutId: string; btnLayoutId: string;
  onClick: () => void; index: number;
}

const ServiceTile = ({
  service, layoutId, imageLayoutId, titleLayoutId, descLayoutId, btnLayoutId, onClick, index,
}: ServiceTileProps) => {
  const cardRef = useRef<HTMLLIElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    if (!cardRef.current || !shimmerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    gsap.to(cardRef.current, { rotateX: ((y - cy) / cy) * -5, rotateY: ((x - cx) / cx) * 5, duration: 0.3, ease: "power2.out", transformPerspective: 900 });
    gsap.to(shimmerRef.current, { background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.22) 0%, transparent 60%)`, duration: 0.25, ease: "none" });
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1.03, boxShadow: "0 8px 28px rgba(0,0,0,0.12)", duration: 0.35, ease: "power3.out" });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!cardRef.current || !shimmerRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, scale: 1, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", duration: 0.5, ease: "elastic.out(1, 0.75)" });
    gsap.to(shimmerRef.current, { background: "transparent", duration: 0.25 });
  }, []);

  return (
    <motion.li
      ref={cardRef} layoutId={layoutId} onClick={onClick}
      onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 24, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.07 + 0.1,
        layout: { duration: 0.4, delay: 0 },
      }}
      style={{
        transformStyle: "preserve-3d", willChange: "transform",
        border: "1px dashed rgba(0,0,0,0.15)",
        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
      }}
      className="relative flex flex-col justify-between p-3 sm:p-3 rounded-xl cursor-pointer group overflow-hidden min-h-[220px] sm:min-h-[120px]"
    >
      <div className="absolute inset-0 pointer-events-none scale-[1.28] sm:scale-105 lg:scale-100 origin-center">
        <ServiceAnim index={index} />
      </div>

      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0.82) 90%, rgba(255,255,255,0.97) 98%)" }} />

      <span ref={shimmerRef} aria-hidden="true" className="absolute inset-0 rounded-inherit pointer-events-none z-[3]" style={{ background: "transparent" }} />

      <div className="absolute inset-[4px] rounded-lg border border-dashed border-black/[0.05] pointer-events-none z-[2]" />

      <div className="relative z-10 flex items-start justify-between">
        <motion.div layoutId={imageLayoutId} className="shrink-0">
          <div style={{ borderRadius: "8px", overflow: "hidden", width: 28, height: 28, position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,80,180,0.18) 0%, rgba(0,40,120,0.32) 100%)", mixBlendMode: "multiply", zIndex: 1, borderRadius: "inherit", pointerEvents: "none" }} />
            <img width={28} height={28} src={service.src} alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", filter: "saturate(0.8) brightness(0.92)" }} />
          </div>
        </motion.div>
        <motion.span layoutId={btnLayoutId}
          className="shrink-0 relative z-10 px-2 py-0.5 text-[7px] rounded-full font-bold tracking-[0.12em] uppercase border border-dashed border-black/[0.15] text-black/45 group-hover:border-black/50 group-hover:text-black/70 bg-white/60 backdrop-blur-sm transition-colors duration-300">
          {service.ctaText}
        </motion.span>
      </div>

      <div className="relative z-10 mt-auto pt-2">
        <motion.h3 layoutId={titleLayoutId}
          className="font-bold font-[family-name:var(--font-museo-moderno)] leading-tight"
          style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.82rem)", color: "rgba(0,0,0,0.88)" }}>
          {service.title}
        </motion.h3>
        <motion.p layoutId={descLayoutId}
          className="mt-0.5"
          style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.68rem)", color: "rgba(0,0,0,0.50)", lineHeight: 1.4 }}>
          {service.description}
        </motion.p>
      </div>
    </motion.li>
  );
};


const CloseIcon = () => (
  <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4 text-black/70">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
  </motion.svg>
);


const services = [
  {
    title: "{ Full-Stack Development }",
    description: "Modern Web Applications",
    src: "./banner/fbanner.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Devsomeware builds modern web applications using technologies like
        Next.js, TypeScript, Node.js and PostgreSQL. We focus on creating
        maintainable, well-structured systems that are easy to scale and
        extend as your product grows.
        <br /><br />
        Our development process emphasizes clean architecture, clear
        documentation, and reliable deployment practices so teams can
        confidently continue building on the codebase.
      </p>
    ),
  },
  {
    title: "{ Product Prototyping }",
    description: "From Idea to Working Product",
    src: "./banner/pptye.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Turning ideas into working products requires thoughtful planning and
        efficient execution. Devsomeware helps teams design and build early
        versions of their applications so concepts can be tested with real
        users.
        <br /><br />
        We collaborate closely with founders and teams to prioritise the
        right features, iterate quickly, and refine the product based on
        feedback.
      </p>
    ),
  },
  {
    title: "{ Cloud & Deployment }",
    description: "Reliable Infrastructure",
    src: "./banner/cloud.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Devsomeware helps set up reliable cloud infrastructure for modern
        applications. From deployment pipelines to environment configuration,
        we ensure your application runs smoothly in production.
        <br /><br />
        Our approach focuses on stability, monitoring, and scalable
        architecture so your platform can handle growth without unnecessary
        complexity.
      </p>
    ),
  },
  {
    title: "{ UI / UX Design }",
    description: "User-Focused Interfaces",
    src: "./banner/ui.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Good design makes software easier and more enjoyable to use. We create
        clean, intuitive interfaces that work well across devices and screen
        sizes.
        <br /><br />
        Using tools like Figma, we design layouts, components, and flows that
        align with your brand while keeping usability and accessibility in
        focus.
      </p>
    ),
  },
  {
    title: "{ API Development }",
    description: "Reliable Integrations",
    src: "./banner/api.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Many modern applications rely on integrations with third-party
        services. Devsomeware builds structured REST and GraphQL APIs that
        make it easier to connect different systems together.
        <br /><br />
        Whether integrating payment providers, authentication systems, or
        communication tools, we focus on secure, well-documented integrations
        that keep your platform stable and maintainable.
      </p>
    ),
  },
];


const ContentSection = () => {
  const borderRef = useRef(null);
  const inView = useInView(borderRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState<(typeof services)[number] | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalDisplaceRef = useRef<SVGFEDisplacementMapElement>(null);
  const id = useId();

  const bentoPanelRef = {
    headline:     useRef<HTMLDivElement>(null),
    howWeWork:    useRef<HTMLDivElement>(null),
    delivery:     useRef<HTMLDivElement>(null),
    engagement:   useRef<HTMLDivElement>(null),
    deliverables: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const cards = Object.values(bentoPanelRef).map((r) => r.current).filter(Boolean);
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 16 });
    gsap.to(cards, {
      opacity: 1, y: 0,
      duration: 0.6, ease: "power3.out",
      stagger: 0.055,
      scrollTrigger: { trigger: cards[0], start: "top 82%", once: true },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(cardRef, () => setActive(null));

  return (
    <div
      id="services"
      className="relative w-full bg-white flex flex-col justify-center py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-10 xl:px-14 overflow-hidden"
    >
      <Image src="/assets/bg.png" alt="" fill className="object-cover opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />

      <div ref={borderRef} className="absolute inset-1.5 sm:inset-2 md:inset-3 pointer-events-none z-10">
        {inView && (
          <>
            <H pos="top"    offset={0} overhang={14} opacity={0.82} delay={0.1}  />
            <H pos="bottom" offset={0} overhang={14} opacity={0.82} delay={0.2}  />
            <V pos="left"   offset={0} overhang={14} opacity={0.82} delay={0.15} />
            <V pos="right"  offset={0} overhang={14} opacity={0.82} delay={0.25} />
            <H pos="top"    offset={7} overhang={7}  opacity={0.45} delay={0.3}  />
            <H pos="bottom" offset={7} overhang={7}  opacity={0.45} delay={0.4}  />
            <V pos="left"   offset={7} overhang={7}  opacity={0.45} delay={0.35} />
            <V pos="right"  offset={7} overhang={7}  opacity={0.45} delay={0.45} />
          </>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6">
            <motion.button key={`close-btn-${active.title}-${id}`} layout
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-3 right-3 lg:hidden items-center justify-center bg-white border border-dashed border-black/25 rounded-full h-8 w-8 shadow-sm z-[110]"
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`} ref={cardRef}
              style={{ background: "#fff", border: "1px dashed rgba(0,0,0,0.18)", boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)" }}
              className="w-full max-w-[500px] max-h-[90dvh] flex flex-col rounded-2xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}
                className="relative overflow-hidden cursor-crosshair shrink-0"
                style={{ borderBottom: "1px dashed rgba(0,0,0,0.12)" }}
                onMouseEnter={() => { if (modalDisplaceRef.current) gsap.to(modalDisplaceRef.current, { attr: { scale: 10 }, duration: 0.55, ease: "power2.out" }); }}
                onMouseLeave={() => { if (modalDisplaceRef.current) gsap.to(modalDisplaceRef.current, { attr: { scale: 0 }, duration: 0.8, ease: "power3.out" }); }}
              >
                <svg className="absolute w-0 h-0" aria-hidden="true">
                  <defs>
                    <filter id="modal-water" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.022 0.026" numOctaves="3" seed="8" result="noise">
                        <animate attributeName="baseFrequency" values="0.022 0.026;0.034 0.018;0.022 0.026" dur="5s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap ref={modalDisplaceRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                </svg>
                <div style={{ margin: "-12px", filter: "url(#modal-water)" }}>
                  <img width={500} height={220} src={active.src} alt={active.title}
                    style={{ width: "100%", height: "clamp(7rem, 24vw, 12rem)", objectFit: "cover", objectPosition: "center", display: "block", filter: "saturate(0.9) brightness(0.94)" }} />
                </div>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,80,180,0.08) 0%, rgba(0,40,120,0.20) 100%)", mixBlendMode: "multiply", pointerEvents: "none" }} />
                <motion.button layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="hidden lg:flex absolute top-3 right-3 items-center justify-center bg-white/90 border border-dashed border-black/25 rounded-full h-7 w-7 backdrop-blur-sm hover:bg-white transition-colors"
                  onClick={() => setActive(null)}>
                  <CloseIcon />
                </motion.button>
              </motion.div>

              <div className="overflow-y-auto flex-1 overscroll-contain">
                <div className="flex justify-between items-start p-4 sm:p-5 gap-3" style={{ borderBottom: "1px dashed rgba(0,0,0,0.09)" }}>
                  <div className="min-w-0">
                    <motion.h3 layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-base sm:text-lg text-black font-[family-name:var(--font-museo-moderno)] leading-snug break-words">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.title}-${id}`} className="text-black/40 text-xs sm:text-sm mt-0.5">
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a layoutId={`button-${active.title}-${id}`} href={active.ctaLink}
                    className="shrink-0 px-3 py-1.5 text-[9px] rounded-full font-bold tracking-widest uppercase border border-dashed border-black/25 text-black/60 bg-black/[0.025] hover:bg-black hover:text-white hover:border-black transition-all duration-250">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="p-4 sm:p-5 pb-8">
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-black/60 text-sm leading-relaxed">
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full flex flex-col px-1.5 sm:px-0">
        <ServicesHeading />

        <div className="w-full flex mb-2">
          <div className="w-full sm:w-[86%] lg:w-[52%] xl:w-[50%]">
            <HeadlineCard innerRef={bentoPanelRef.headline} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-stretch">

          <ul className="contents">
            <ServiceTile
              key={`card-${services[0].title}-${id}`}
              service={services[0]} index={0}
              layoutId={`card-${services[0].title}-${id}`}
              imageLayoutId={`image-${services[0].title}-${id}`}
              titleLayoutId={`title-${services[0].title}-${id}`}
              descLayoutId={`description-${services[0].title}-${id}`}
              btnLayoutId={`button-${services[0].title}-${id}`}
              onClick={() => setActive(services[0])}
            />
            <ServiceTile
              key={`card-${services[1].title}-${id}`}
              service={services[1]} index={1}
              layoutId={`card-${services[1].title}-${id}`}
              imageLayoutId={`image-${services[1].title}-${id}`}
              titleLayoutId={`title-${services[1].title}-${id}`}
              descLayoutId={`description-${services[1].title}-${id}`}
              btnLayoutId={`button-${services[1].title}-${id}`}
              onClick={() => setActive(services[1])}
            />
          </ul>
          <HowWeWorkCard innerRef={bentoPanelRef.howWeWork} />

          <DeliveryCard innerRef={bentoPanelRef.delivery} />
          <ul className="contents">
            <ServiceTile
              key={`card-${services[2].title}-${id}`}
              service={services[2]} index={2}
              layoutId={`card-${services[2].title}-${id}`}
              imageLayoutId={`image-${services[2].title}-${id}`}
              titleLayoutId={`title-${services[2].title}-${id}`}
              descLayoutId={`description-${services[2].title}-${id}`}
              btnLayoutId={`button-${services[2].title}-${id}`}
              onClick={() => setActive(services[2])}
            />
            <ServiceTile
              key={`card-${services[3].title}-${id}`}
              service={services[3]} index={3}
              layoutId={`card-${services[3].title}-${id}`}
              imageLayoutId={`image-${services[3].title}-${id}`}
              titleLayoutId={`title-${services[3].title}-${id}`}
              descLayoutId={`description-${services[3].title}-${id}`}
              btnLayoutId={`button-${services[3].title}-${id}`}
              onClick={() => setActive(services[3])}
            />
          </ul>

          <ul className="contents">
            <ServiceTile
              key={`card-${services[4].title}-${id}`}
              service={services[4]} index={4}
              layoutId={`card-${services[4].title}-${id}`}
              imageLayoutId={`image-${services[4].title}-${id}`}
              titleLayoutId={`title-${services[4].title}-${id}`}
              descLayoutId={`description-${services[4].title}-${id}`}
              btnLayoutId={`button-${services[4].title}-${id}`}
              onClick={() => setActive(services[4])}
            />
          </ul>
          <EngagementCard innerRef={bentoPanelRef.engagement} />
          <DeliverablesCard innerRef={bentoPanelRef.deliverables} />

        </div>
      </div>
    </div>
  );
};

export default ContentSection;