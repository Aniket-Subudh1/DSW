"use client";

import { CSSProperties, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leftPoints = [
  "Product-first discovery",
  "Rapid sprint execution",
  "Interface systems with clarity",
  "Frontend detail with polish",
];

const rightPoints = [
  "Reliable production delivery",
  "Thoughtful motion and UX",
  "Cloud-ready architecture",
  "Built for long-term scale",
];

type MaskStyle = CSSProperties & { [key: string]: string | number | undefined };

const maskStyle: MaskStyle = {
  "--mask-size": "18%",
  WebkitMaskImage: "url('/logo/logo-v2.png')",
  maskImage: "url('/logo/logo-v2.png')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "var(--mask-size)",
  maskSize: "var(--mask-size)",
  WebkitMaskMode: "alpha",
  maskMode: "alpha",
};

const bulletIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    className="shrink-0"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="rgba(255,255,255,0.42)"
      strokeWidth="1.3"
    />
    <path
      d="M6.4 10.3L8.7 12.6L13.8 7.5"
      stroke="rgba(255,255,255,0.92)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function BulletList({
  items,
  align = "left",
}: {
  items: string[];
  align?: "left" | "right";
}) {
  return (
    <ul className={`grid gap-4 ${align === "right" ? "lg:justify-items-end" : ""}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`art-fade flex items-center gap-2.5 text-[13px] font-medium leading-[1.45] text-white/78 sm:text-[14px] ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}
        >
          {bulletIcon}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CraftReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileBulletsRef = useRef<HTMLDivElement>(null);
  const overlayTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const topBlock = topBlockRef.current;
    const heading = headingRef.current;
    const watermark = watermarkRef.current;
    const frame = frameRef.current;
    const mask = maskRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (
      !section ||
      !topBlock ||
      !heading ||
      !watermark ||
      !frame ||
      !mask ||
      !image ||
      !content
    )
      return;

    const ctx = gsap.context(() => {
      const fades = gsap.utils.toArray<HTMLElement>(".art-fade", section);
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const targetWidth = isMobile
        ? Math.max(window.innerWidth - 56, 240)
        : Math.min(window.innerWidth * 0.54, 860);

      const initWidth = isMobile
        ? Math.min(window.innerWidth * 0.45, 180)
        : Math.min(window.innerWidth * 0.15, 190);

      gsap.set(content, { opacity: 0, y: 22 });
      if (overlayTitleRef.current) gsap.set(overlayTitleRef.current, { opacity: 0, y: 14 });
      gsap.set(image, {
        scale: isMobile ? 1.14 : 1.1,
        transformOrigin: "center center",
      });
      gsap.set(topBlock, {
        height: topBlock.offsetHeight,
        overflow: "hidden",
      });
      gsap.set(frame, {
        width: initWidth,
        borderRadius: isMobile ? 28 : 36,
        borderColor: "rgba(255,255,255,0)",
        backgroundColor: "rgba(255,255,255,0)",
        boxShadow: "0 24px 80px rgba(0,0,0,0)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // longer pin so animation feels deliberate
          end: () =>
            `+=${Math.round(window.innerHeight * (isMobile ? 2.4 : 3.2))}`,
          scrub: 2.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
          [heading, ...fades],
          {
            opacity: 0,
            y: isMobile ? -8 : -14,
            stagger: 0.025,
            ease: "power1.inOut",
            duration: 0.38,
          },
          0,
        )
        .to(
          topBlock,
          {
            height: 0,
            paddingBottom: 0,
            marginBottom: 0,
            ease: "power2.inOut",
            duration: 0.42,
          },
          0.08,
        )
        .to(
          watermark,
          {
            opacity: 0.05,
            ease: "power1.inOut",
            duration: 0.38,
          },
          0,
        );

      if (isMobile && mobileBulletsRef.current) {
        tl.to(
          mobileBulletsRef.current,
          {
            opacity: 0,
            height: 0,
            marginTop: 0,
            overflow: "hidden",
            ease: "power1.inOut",
            duration: 0.3,
          },
          0,
        );
      }

      tl.to(
          frame,
          {
            width: targetWidth,
            borderRadius: isMobile ? 18 : 22,
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.03)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.48)",
            ease: "power2.inOut",
            duration: 0.46,
          },
          0.42,
        )
        .to(
          mask,
          {
            "--mask-size": isMobile ? "2400%" : "2100%",
            ease: "power1.inOut",
            duration: 0.46,
          },
          0.42,
        )
        .to(
          image,
          {
            scale: 1,
            ease: "power2.out",
            duration: 0.46,
          },
          0.42,
        )
        .to(
          overlayTitleRef.current ?? [],
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
          },
          0.58,
        )
        .to(
          overlayTitleRef.current ?? [],
          {
            opacity: 0,
            y: -10,
            ease: "power1.in",
            duration: 0.14,
          },
          0.82,
        )
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
          },
          0.84,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-black text-white"
    >
      {/* Background layers */}
      <Image
        src="/assets/bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover opacity-[0.1]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('/assets/noise.png')] bg-[length:200px_200px] opacity-[0.05] mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(0,0,0,0.42))]" />

      <div className="relative mx-auto flex h-[100svh] w-full max-w-[1540px] flex-col px-5 pt-10 pb-8 sm:px-8 sm:pt-12 sm:pb-10 lg:px-12 lg:pt-14 lg:pb-12">

        <div ref={topBlockRef} className="shrink-0 pb-8 sm:pb-10 lg:pb-12">
          <div
            ref={headingRef}
            className="relative z-20 mb-5 text-center sm:mb-6"
          >
            <div className="inline-flex items-center gap-3 font-[family-name:var(--font-museo-moderno)] text-[13px] font-bold uppercase tracking-[0.20em] text-white/60 sm:text-[15px]">
              <span className="text-white/28">—</span>
              <span>The Craft</span>
              <span className="text-white/28">—</span>
            </div>
          </div>

          <h2
            ref={watermarkRef}
            className="pointer-events-none select-none text-center font-[family-name:var(--font-museo-moderno)] text-[clamp(3.8rem,15vw,11.5rem)] font-bold leading-none tracking-[-0.02em] text-white/[1]"
          > CRAFT
          </h2>
        </div>

        {/* ── MIDDLE: bullets + image — centered in remaining space ── */}
        <div className="relative z-10 min-h-0 flex-1 flex items-center">
            <div className="grid w-full items-center gap-6 lg:grid-cols-[1fr_minmax(260px,900px)_1fr] lg:gap-10">
            {/* Left bullets */}
            <div className="hidden lg:block">
              <BulletList items={leftPoints} />
            </div>

            <div className="flex justify-center">
              <div className="relative w-full">
                <div className="absolute inset-x-[14%] top-[12%] h-[60%] rounded-full bg-white/[0.13] blur-3xl" />
                <div className="absolute inset-x-[18%] bottom-[6%] h-16 rounded-full bg-white/[0.08] blur-3xl sm:h-24" />

                <div
                  ref={frameRef}
                  className="relative mx-auto overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.48)] h-[clamp(180px,30vh,420px)] lg:h-[clamp(260px,46vh,560px)]"
                >
                  <div
                    ref={maskRef}
                    style={maskStyle}
                    className="relative h-full w-full overflow-hidden"
                  >
                    <div
                      ref={imageRef}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: "url('/assets/bann.png')" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.34))]" />
                  </div>

                  <div
                    ref={overlayTitleRef}
                    className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
                  >
                    <p className="font-[family-name:var(--font-museo-moderno)] text-[clamp(1.1rem,2.6vw,2.4rem)] font-bold leading-tight tracking-[-0.03em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.85)]">
                      Crafted to Scale
                    </p>
                    <p className="mt-2 text-[clamp(0.6rem,1vw,0.85rem)] uppercase tracking-[0.18em] text-white/55 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                      devsomeware.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <BulletList items={rightPoints} align="right" />
            </div>
          </div>
        </div>

        <div ref={mobileBulletsRef} className="relative z-20 mt-3 grid grid-cols-2 gap-3 lg:hidden">
          <BulletList items={leftPoints.slice(0, 2)} />
          <BulletList items={rightPoints.slice(0, 2)} align="right" />
        </div>

        <div
          ref={contentRef}
          className="relative z-20 shrink-0 pt-3 text-center sm:pt-5 lg:pt-8"
        >
          <h3 className="font-[family-name:var(--font-museo-moderno)] text-[clamp(1.5rem,3.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.04em] text-white">
            Made with Craft, Poured with Passion
          </h3>
          <p className="mx-auto mt-3 max-w-[46ch] px-2 text-[13px] leading-[1.65] text-white/50 sm:px-0 sm:text-[15px]">
            Brand, product thinking, interface polish, and engineering
            discipline - come together in one focused reveal.
          </p>
        </div>
      </div>
    </section>
  );
}
