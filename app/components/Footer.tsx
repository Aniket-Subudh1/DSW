"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const LinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Threads = () => (
  <svg width="16" height="16" viewBox="0 0 192 192" fill="currentColor">
    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.035l13.198 9.043c5.51-8.357 14.163-10.153 21.943-10.153h.23c8.48.054 14.883 2.516 19.024 7.313 3.005 3.47 5.013 8.235 5.994 14.2a102.158 102.158 0 0 0-13.733-1.164c-13.863 0-24.91 3.655-32.867 10.87-7.87 7.134-11.877 16.957-11.6 27.597.523 19.726 16.017 31.33 37.37 31.33 12.84 0 23.294-3.634 30.453-10.506 5.515-5.282 9.132-12.557 10.764-21.667 3.697 2.33 6.45 5.394 8.27 9.23 3.195 6.79 3.374 17.966-6.573 27.912-8.797 8.8-19.373 12.616-35.403 12.727-17.76-.124-31.23-5.831-40.025-16.967-8.195-10.416-12.415-25.378-12.54-44.478.125-19.1 4.345-34.063 12.54-44.478 8.795-11.136 22.265-16.843 40.025-16.967 17.918.125 31.788 5.864 41.2 17.053 4.57 5.502 8.006 12.39 10.2 20.464l15.463-4.124c-2.798-10.155-7.345-18.938-13.583-26.173-12.748-15.34-31.385-23.246-55.281-23.508l-.405.001c-23.835.263-42.066 8.198-54.351 23.575C28.024 55.815 22.705 74.5 22.543 96c.162 21.5 5.481 40.185 15.822 55.6 12.285 15.377 30.516 23.312 54.351 23.575l.405.001c21.267-.234 36.286-5.735 48.614-18.063 15.872-15.86 15.405-35.886 10.176-48.05-3.916-8.824-11.14-16.044-20.374-20.075Z" />
  </svg>
);

const Instagram = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const XTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { Icon: Instagram, href: "https://www.instagram.com/devsomeware/", label: "Instagram" },
  { Icon: LinkedIn, href: "https://www.linkedin.com/company/devsomeware/", label: "LinkedIn" },
  { Icon: XTwitter, href: "https://x.com/DevSomware", label: "X / Twitter" },
  { Icon: Threads, href: "https://www.threads.com/@devsomeware", label: "Threads" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const rule1Ref = useRef<HTMLSpanElement>(null);
  const rule2Ref = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wordmark = wordmarkRef.current;
    const wordmarkText = wordmarkTextRef.current;
    if (!wordmark || !wordmarkText) return;

    const fitWordmark = () => {
      const style = getComputedStyle(wordmark);
      const availableWidth =
        wordmark.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      if (!availableWidth) return;

      wordmarkText.style.fontSize = "240px";
      const measuredWidth = wordmarkText.scrollWidth;
      if (!measuredWidth) return;

      const safetyRatio = 0.99;
      const fittedSize = (availableWidth * safetyRatio * 240) / measuredWidth;
      wordmarkText.style.fontSize = `${Math.max(fittedSize, 40)}px`;
    };

    const resizeObserver = new ResizeObserver(() => fitWordmark());
    resizeObserver.observe(wordmark);

    fitWordmark();
    document.fonts?.ready.then(() => fitWordmark());

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.set([rule1Ref.current, rule2Ref.current], { scaleX: 0, transformOrigin: "left" });
      gsap.set(topBarRef.current, { opacity: 0, y: 10 });
      gsap.set(bottomBarRef.current, { opacity: 0, y: 8 });
      gsap.set(wordmarkRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(rule1Ref.current, { scaleX: 1, duration: 1.0 }, 0);
      tl.to(topBarRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.1);
      tl.to(rule2Ref.current, { scaleX: 1, duration: 1.0 }, 0.3);
      tl.to(bottomBarRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.45);
      tl.to(wordmarkRef.current, { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.5);
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black overflow-hidden"
      aria-label="Site footer"
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[url('/assets/noise.png')] bg-repeat bg-size-[200px_200px] opacity-[0.06] mix-blend-soft-light"
        aria-hidden="true"
      />
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 0%, rgba(90,110,210,0.06) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-20 w-full">
        <span
          ref={rule1Ref}
          className="block w-full h-px"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.10) 75%, transparent)",
            transform: "scaleX(0)",
            transformOrigin: "left",
          }}
        />

        {/* TOP BAR: logo + nav */}
        <div
          ref={topBarRef}
          className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-5 sm:gap-0"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="relative w-5 h-5 shrink-0"
              style={{ filter: "url(#footer-logo-grain)" }}
            >
              <Image
                src="/logo/d.png"
                alt="Devsomeware logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className="font-(family-name:--font-museo-moderno) text-white/80 font-bold text-sm"
              style={{ letterSpacing: "0.06em" }}
            >
              DEVSOMEWARE
            </span>
            {/* live status dot */}
            <span className="relative flex h-1.5 w-1.5 ml-0.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/30" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/50" />
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-0">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="relative text-white/38 text-[12px] sm:text-[13px] hover:text-white/70 transition-colors duration-200 tracking-wide group"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/35 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <span
          ref={rule2Ref}
          className="block w-full h-px"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
            transform: "scaleX(0)",
            transformOrigin: "left",
          }}
        />

        {/* BOTTOM BAR: copyright + socials */}
        <div
          ref={bottomBarRef}
          className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-0"
          style={{ opacity: 0 }}
        >
          <span className="text-white/28 text-[12px] sm:text-xs tracking-wide">
            © 2026 Devsomeware Pvt Ltd. All Rights Reserved.
          </span>

          <ul className="flex items-center gap-3" aria-label="Social links">
            {socialLinks.map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/32 hover:text-white/80 hover:border-white/30 hover:bg-white/8 hover:scale-110 transition-all duration-200"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* WORDMARK */}
      <div
        ref={wordmarkRef}
        className="relative z-20 w-full px-2 sm:px-3 pb-8 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.42) 34%, rgba(0,0,0,0.92) 76%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.42) 34%, rgba(0,0,0,0.92) 76%, rgba(0,0,0,0) 100%)",
        }}
      >
        <p
          ref={wordmarkTextRef}
          className="mx-auto w-max font-(family-name:--font-museo-moderno) leading-[0.88] whitespace-nowrap text-center"
          style={{
            fontSize: "240px",
            letterSpacing: "-0.02em",
            color: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(230,238,252,0.38) 0%, rgba(200,215,238,0.24) 40%, rgba(160,178,208,0.12) 72%, rgba(120,140,168,0.04) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1.5px rgba(210,222,238,0.15)",
            marginBottom: "-0.06em",
            paddingTop: "0.08em",
            transform: "scaleY(1.08)",
            transformOrigin: "center bottom",
          }}
        >
          DEVSOMEWARE
        </p>
      </div>

      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="footer-logo-grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feComposite in="grayNoise" in2="SourceGraphic" operator="in" result="clippedNoise" />
            <feBlend in="SourceGraphic" in2="clippedNoise" mode="soft-light" result="blended" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}