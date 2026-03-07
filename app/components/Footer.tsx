"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
];

const LinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YouTube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Instagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const XTwitter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { Icon: LinkedIn, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: YouTube, href: "https://youtube.com", label: "YouTube" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: XTwitter, href: "https://x.com", label: "X / Twitter" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const rule1Ref = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const rule2Ref = useRef<HTMLSpanElement>(null);
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
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[url('/assets/noise.png')] bg-repeat bg-[length:200px_200px] opacity-[0.06] mix-blend-soft-light"
        aria-hidden="true"
      />

      <div className="relative z-20 w-full">
        <span
          ref={rule1Ref}
          className="block w-full h-px bg-white/[0.08]"
          aria-hidden="true"
          style={{ transform: "scaleX(0)" }}
        />

        <div
          ref={topBarRef}
          className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-6 sm:py-6 flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-5 sm:gap-0"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative w-5 h-5 shrink-0" style={{ filter: "url(#footer-logo-grain)" }}>
              <Image
                src="/logo/d.png"
                alt="Devsomeware logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className="  font-[family-name:var(--font-museo-moderno)] text-white/80 font-bold text-sm"
              style={{ letterSpacing: "0.06em" }}
            >
              DEVSOMEWARE .
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-0">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/38 text-[12px] sm:text-[13px] hover:text-white/65 transition-colors duration-200 tracking-wide"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <span
          ref={rule2Ref}
          className="block w-full h-px bg-white/[0.08]"
          aria-hidden="true"
          style={{ transform: "scaleX(0)" }}
        />

        <div
          ref={bottomBarRef}
          className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-5 sm:py-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-0"
          style={{ opacity: 0 }}
        >
          <span className="text-white/28 text-[12px] sm:text-xs tracking-wide">
            © 2026 Devsomeware Pvt Ltd. All Rights Reserved.
          </span>

          <ul className="flex items-center gap-5" aria-label="Social links">
            {socialLinks.map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/32 hover:text-white/65 transition-colors duration-200 inline-flex"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        ref={wordmarkRef}
        className="relative z-20 w-full px-2 sm:px-3 pb-8  select-none pointer-events-none"
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
          className="mx-auto w-max font-[family-name:var(--font-museo-moderno)] leading-[0.88] whitespace-nowrap text-center"
          style={{
            fontSize: "240px",
            letterSpacing: "-0.02em",
            color: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(220,230,242,0.28) 0%, rgba(190,205,222,0.18) 45%, rgba(150,168,192,0.09) 80%, rgba(120,140,168,0.04) 100%)",
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
