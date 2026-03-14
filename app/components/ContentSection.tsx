"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
  Suspense,
} from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import deliveryImage from "@/public/assets/delivery.png";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const LottiePlayer = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

const BENTO_CARD_SHADOW = "0 1px 8px rgba(0,0,0,0.3)";

const SERVICE_TILE_STYLE: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  transition: "border-color 0.3s ease, background-color 0.3s ease",
};



const STATS = [
  { label: "Projects shipped", note: "MVPs to enterprise" },
  { label: "Client retention", note: "All clients renewed" },
  { label: "Avg. delivery", note: "Kickoff to live" },
] as const;

const STAT_TARGETS = [50, 100, 4];
const STAT_SUFFIXES = ["+", "%", "wk"];

const STEPS = [
  { x: 30, num: "01", label: "DISCOVER", sub: "Scope & plan" },
  { x: 150, num: "02", label: "BUILD", sub: "Sprint delivery" },
  { x: 270, num: "03", label: "LAUNCH", sub: "Ship & iterate" },
] as const;

const CAPABILITIES = [
  { label: "Full-Stack Web",         pct: 98, note: "Next.js · Node · TypeScript" },
  { label: "Cloud & DevOps",          pct: 93, note: "AWS · Docker · CI/CD" },
  { label: "UI / UX Design",          pct: 91, note: "Figma · Motion · A11y" },
  { label: "Mobile & Cross-platform", pct: 86, note: "React Native · Expo" },
] as const;

const DELIVERABLE_ITEMS = [
  "Full source code ownership & handoff",
  "CI/CD pipeline + cloud deployment",
  "Figma designs & component library",
  "Documentation & onboarding guide",
] as const;


type HProps = {
  pos: "top" | "bottom";
  offset: number;
  overhang: number;
  opacity: number;
  delay: number;
};
type VProps = {
  pos: "left" | "right";
  offset: number;
  overhang: number;
  opacity: number;
  delay: number;
};

const H = memo(({ pos, offset, overhang, opacity, delay }: HProps) => (
  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: "absolute",
      display: "block",
      [pos]: offset,
      left: -overhang,
      right: -overhang,
      height: "2px",
      backgroundColor: `rgba(255,255,255,${opacity})`,
      transformOrigin: "left",
    }}
  />
));
H.displayName = "H";

const V = memo(({ pos, offset, overhang, opacity, delay }: VProps) => (
  <motion.span
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: "absolute",
      display: "block",
      [pos]: offset,
      top: -overhang,
      bottom: -overhang,
      width: "2px",
      backgroundColor: `rgba(255,255,255,${opacity})`,
      transformOrigin: "top",
    }}
  />
));
V.displayName = "V";

const ServicesHeading = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
      gsap.to(textRef.current, {
        duration: 1.4,
        scrambleText: {
          text: "// our services",
          chars: "█▓▒░_/\\|<>{}[]",
          revealDelay: 0.3,
          speed: 0.5,
        },
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-6 sm:mb-8"
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
        aria-label="our services"
      />
      <span className="flex-1 h-px bg-linear-to-r from-white/20 to-transparent" />
    </div>
  );
});
ServicesHeading.displayName = "ServicesHeading";

const BentoCard = memo(
  ({
    children,
    className = "",
    innerRef,
  }: {
    children: React.ReactNode;
    className?: string;
    innerRef?: React.RefObject<HTMLDivElement | null>;
  }) => {
    const ownRef = useRef<HTMLDivElement>(null);
    const ref = innerRef ?? ownRef;

    const handleEnter = useCallback(() => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        y: -3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        duration: 0.28,
        ease: "power2.out",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLeave = useCallback(() => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        y: 0,
        boxShadow: BENTO_CARD_SHADOW,
        duration: 0.35,
        ease: "power2.out",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`rounded-2xl border border-white/8 bg-white/4 overflow-hidden ${className}`}
        style={{ boxShadow: BENTO_CARD_SHADOW, contain: "layout style" }}
      >
        {children}
      </div>
    );
  }
);
BentoCard.displayName = "BentoCard";

const Label = memo(({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-white/50 font-bold block">
    {children}
  </span>
));
Label.displayName = "Label";

const LazyLottieAnim = memo(({ animName }: { animName: string }) => {
  const [animData, setAnimData] = useState<object | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadedRef.current) {
          loadedRef.current = true;
          observer.disconnect();

          const importMap: Record<string, () => Promise<{ default: object }>> =
            {
              developer: () =>
                import("@/public/assets/Coding Development.json"),
              futuretech: () =>
                import("@/public/assets/some.json"),
              cloud: () => import("@/public/assets/cloud.json"),
              uiux: () => import("@/public/assets/Login.json"),
            };

          const loader = importMap[animName];
          if (loader) {
            loader().then((mod) => setAnimData(mod.default));
          }
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animName]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ opacity: 0.8 }}
    >
      {animData && (
        <Suspense fallback={null}>
          <LottiePlayer
            animationData={animData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      )}
    </div>
  );
});
LazyLottieAnim.displayName = "LazyLottieAnim";

const SolarSVG = memo(() => (
  <svg
    viewBox="0 0 512 512"
    className="w-full h-full"
    style={{ padding: "8%" }}
  >
    <g fill="#FFF" opacity="0.28">
      <path d="M346.152,235.112c-1.074-4.652-5.719-7.556-10.367-6.478c-4.652,1.074-7.552,5.716-6.478,10.367c1.278,5.537,1.927,11.256,1.927,16.998c0,41.485-33.75,75.235-75.235,75.235c-41.485,0-75.235-33.75-75.235-75.235c0-41.485,33.75-75.235,75.235-75.235c25.033,0,48.356,12.403,62.391,33.177c2.672,3.956,8.045,4.995,12.002,2.324c3.957-2.673,4.996-8.046,2.325-12.003c-17.254-25.539-45.934-40.786-76.717-40.786c-51.018,0-92.524,41.506-92.524,92.524s41.506,92.524,92.524,92.524c51.018,0,92.524-41.506,92.524-92.524C348.523,248.95,347.726,241.923,346.152,235.112z" />
      <path d="M430.911,34.115c-25.902,0-46.975,21.073-46.975,46.974c0,25.902,21.073,46.974,46.975,46.974c25.902,0,46.974-21.072,46.974-46.974C477.885,55.188,456.813,34.115,430.911,34.115z M430.911,110.774c-16.369,0-29.686-13.317-29.686-29.685s13.317-29.685,29.686-29.685c16.368,0,29.685,13.317,29.685,29.685C460.596,97.458,447.279,110.774,430.911,110.774z" />
      <path d="M255.999,380.397c-20.048,0-36.357,16.309-36.357,36.357c0,20.047,16.309,36.356,36.357,36.356c20.048,0,36.357-16.309,36.357-36.356C292.357,396.706,276.048,380.397,255.999,380.397z M255.999,435.821c-10.514,0-19.068-8.553-19.068-19.067c0-10.515,8.555-19.068,19.068-19.068c10.514,0,19.068,8.553,19.068,19.068C275.068,427.268,266.513,435.821,255.999,435.821z" />
      <path d="M187.014,391.606c-11.039-5.628-21.393-12.619-30.774-20.775c-3.601-3.132-9.062-2.751-12.194,0.851c-3.134,3.603-2.752,9.063,0.851,12.195c10.444,9.081,21.972,16.863,34.265,23.131c1.258,0.642,2.598,0.945,3.919,0.945c3.145,0,6.18-1.724,7.708-4.72C192.958,398.98,191.267,393.774,187.014,391.606z" />
      <path d="M326.455,101.908c-12.572-5.758-25.843-9.954-39.444-12.47c-4.697-0.868-9.205,2.23-10.074,6.925c-0.869,4.695,2.234,9.205,6.927,10.074c12.204,2.258,24.111,6.023,35.391,11.189c1.168,0.535,2.389,0.787,3.594,0.787c3.278,0,6.412-1.873,7.865-5.047C332.703,109.025,330.794,103.895,326.455,101.908z" />
      <path d="M136.161,39.376c-2.461-4.092-7.771-5.414-11.864-2.954c-10.869,6.535-21.371,13.972-31.215,22.101c-3.681,3.041-4.202,8.489-1.162,12.17c1.709,2.069,4.18,3.14,6.67,3.14c1.939,0,3.889-0.649,5.499-1.979c9.185-7.585,18.982-14.52,29.118-20.615C137.298,48.777,138.619,43.466,136.161,39.376z" />
      <path d="M380.279,32.108c-11.121-6.172-22.818-11.557-34.764-16.004c-4.477-1.669-9.451,0.612-11.118,5.086c-1.664,4.474,0.613,9.451,5.087,11.117c11.136,4.146,22.04,9.164,32.405,14.917c1.329,0.738,2.767,1.088,4.187,1.088c3.039,0,5.987-1.606,7.566-4.451C385.959,39.686,384.454,34.424,380.279,32.108z" />
      <path d="M362.768,376.488c-2.971-3.738-8.412-4.356-12.146-1.384c-9.735,7.744-20.389,14.275-31.668,19.41c-4.346,1.978-6.264,7.105-4.286,11.45c1.45,3.183,4.588,5.064,7.873,5.064c1.198,0,2.416-0.25,3.576-0.779c12.562-5.719,24.428-12.991,35.268-21.613C365.12,385.663,365.74,380.225,362.768,376.488z" />
      <path d="M419.985,441.395c-3.039-3.684-8.489-4.205-12.17-1.168c-9.187,7.578-18.988,14.509-29.127,20.6c-4.093,2.457-5.418,7.768-2.96,11.861c1.622,2.699,4.484,4.194,7.419,4.194c1.515,0,3.05-0.399,4.442-1.234c10.875-6.532,21.382-13.961,31.228-22.085C422.5,450.526,423.023,445.077,419.985,441.395z" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 256 256"
        to="360 256 256"
        dur="60s"
        repeatCount="indefinite"
      />
    </g>
  </svg>
));
SolarSVG.displayName = "SolarSVG";

const ANIM_NAMES = ["developer", "futuretech", "cloud", "uiux"];

const ServiceAnim = memo(({ index }: { index: number }) => {
  if (index < 4) {
    return <LazyLottieAnim animName={ANIM_NAMES[index]} />;
  }
  return <SolarSVG />;
});
ServiceAnim.displayName = "ServiceAnim";

const HeadlineCard = memo(
  ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
    const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      const ctxArr: gsap.core.Tween[] = [];
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        const tween = gsap.to(obj, {
          val: STAT_TARGETS[i],
          duration: 1.2,
          delay: 0.35 + i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (el)
              el.textContent = Math.round(obj.val) + STAT_SUFFIXES[i];
          },
        });
        ctxArr.push(tween);
      });
      return () => ctxArr.forEach((t) => t.kill());
    }, []);

    return (
      <BentoCard
        innerRef={innerRef}
        className="p-3 sm:p-4 bg-black! border-black! relative overflow-hidden flex justify-center items-center"
      >
        <HeadlineSVGBackground />
        <div className="absolute inset-1 rounded-xl border border-dashed border-white/6 pointer-events-none" />
        <div className="relative z-10 grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(22rem,0.9fr)] lg:items-center lg:gap-8">
          <p className="max-w-2xl text-xs sm:text-sm md:text-base font-bold text-white leading-[1.3] font-(family-name:--font-museo-moderno) lg:leading-tight">
            We design, build and deliver{" "}
            <span className="text-white/50">
              reliable, production-ready software
            </span>{" "}
            - turning ideas into scalable digital products.
          </p>
          <div className="grid w-full grid-cols-3 divide-x divide-dashed divide-white/10 lg:max-w-96 lg:justify-self-end">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex min-w-0 flex-col gap-1.5 ${i > 0 ? "pl-3 sm:pl-4" : ""} ${i < 2 ? "pr-3 sm:pr-4" : ""}`}
              >
                <span
                  className="text-lg sm:text-xl md:text-2xl font-bold text-white font-(family-name:--font-museo-moderno) leading-none tabular-nums"
                  ref={(el) => {
                    numRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                <span className="text-[10px] sm:text-xs text-white/60 font-semibold tracking-widest uppercase leading-none mt-1">
                  {s.label}
                </span>
                <span className="text-[9px] sm:text-[11px] text-white/40 leading-tight">
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>
    );
  }
);
HeadlineCard.displayName = "HeadlineCard";

const HeadlineSVGBackground = memo(() => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="none"
    viewBox="0 0 600 200"
  >
    {[58, 126].map((y, i) => (
      <g key={`h-${i}`}>
        <line
          x1="0"
          y1={y}
          x2="600"
          y2={y}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.5"
        />
        <circle r="2" fill="rgba(255,255,255,0.34)">
          <animateMotion
            dur={`${10 + i * 1.5}s`}
            begin={`${i * 1.3}s`}
            repeatCount="indefinite"
            path={`M0,${y} L600,${y}`}
          />
          <animate
            attributeName="opacity"
            values="0;0.6;0.6;0"
            dur={`${10 + i * 1.5}s`}
            begin={`${i * 1.3}s`}
            repeatCount="indefinite"
          />
        </circle>
        <circle r="5" fill="rgba(255,255,255,0.04)">
          <animateMotion
            dur={`${10 + i * 1.5}s`}
            begin={`${i * 1.3}s`}
            repeatCount="indefinite"
            path={`M0,${y} L600,${y}`}
          />
          <animate
            attributeName="opacity"
            values="0;0.28;0.28;0"
            dur={`${10 + i * 1.5}s`}
            begin={`${i * 1.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
    {[200, 400].map((x, i) => (
      <g key={`v-${i}`}>
        <line
          x1={x}
          y1="0"
          x2={x}
          y2="200"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />
        <circle r="1.8" fill="rgba(255,255,255,0.30)">
          <animateMotion
            dur={`${12 + i * 1.8}s`}
            begin={`${1 + i * 1.8}s`}
            repeatCount="indefinite"
            path={`M${x},0 L${x},200`}
          />
          <animate
            attributeName="opacity"
            values="0;0.55;0.55;0"
            dur={`${12 + i * 1.8}s`}
            begin={`${1 + i * 1.8}s`}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
  </svg>
));
HeadlineSVGBackground.displayName = "HeadlineSVGBackground";

const HowWeWorkCard = memo(
  ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
    const lineRef = useRef<SVGLineElement>(null);
    const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

    useEffect(() => {
      if (!lineRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 88%",
          once: true,
        },
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
      return () => {
        tl.kill();
      };
    }, []);

    return (
      <BentoCard
        innerRef={innerRef}
        className="sm:col-span-2 lg:col-span-2 p-2.5 sm:p-3 flex flex-col"
      >
        <div className="flex items-center justify-center gap-2 font-(family-name:--font-museo-moderno) font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
          <span className="text-white/20 text-[0.88em]">{"{"}</span>
          <span className="text-white/80">How We Work</span>
          <span className="text-white/20 text-[0.88em]">{"}"}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 mb-2 text-center">
          Our three-phase delivery framework
        </p>
        <div className="flex-1 flex items-center w-full">
          <svg
            viewBox="0 0 300 80"
            fill="none"
            className="w-full overflow-visible"
          >
            <line
              x1="30"
              y1="22"
              x2="270"
              y2="22"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <line
              ref={lineRef}
              x1="30"
              y1="22"
              x2="30"
              y2="22"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle r="4" fill="rgba(255,255,255,0.9)">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                path="M30,22 L270,22"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="14" fill="rgba(255,255,255,0.07)">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                path="M30,22 L270,22"
              />
              <animate
                attributeName="opacity"
                values="0;0.6;0.6;0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            {STEPS.map((s, i) => (
              <g key={s.label}>
                <circle
                  cx={s.x}
                  cy="22"
                  r="14"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                >
                  <animate
                    attributeName="r"
                    values="12;20;12"
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  cx={s.x}
                  cy="22"
                  r="0"
                  fill="rgba(255,255,255,0.9)"
                />
                <text
                  x={s.x}
                  y="26"
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="800"
                  fill="rgba(0,0,0,0.85)"
                  fontFamily="inherit"
                >
                  {s.num}
                </text>
                <text
                  x={s.x}
                  y="48"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill="rgba(255,255,255,0.75)"
                  letterSpacing="0.08em"
                  fontFamily="inherit"
                >
                  {s.label}
                </text>
                <text
                  x={s.x}
                  y="62"
                  textAnchor="middle"
                  fontSize="9"
                  fill="rgba(255,255,255,0.40)"
                  fontFamily="inherit"
                >
                  {s.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </BentoCard>
    );
  }
);
HowWeWorkCard.displayName = "HowWeWorkCard";

const DeliveryCard = memo(
  ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => (
    <BentoCard
      innerRef={innerRef}
      className="sm:col-span-2 lg:col-span-2 p-2.5 sm:p-3 flex flex-col"
    >
      <div className="flex items-center justify-center gap-2 font-(family-name:--font-museo-moderno) font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
        <span className="text-white/20 text-[0.88em]">{"{"}</span>
        <span className="text-white/80">Delivery Timeline</span>
        <span className="text-white/20 text-[0.88em]">{"}"}</span>
      </div>
      <p className="text-[10px] sm:text-xs text-white/50 font-medium mt-0.5 mb-2 text-center">
        Typical MVP: 4 - 6 weeks
      </p>
      <div className="w-full">
        <Image
          src={deliveryImage}
          alt="Delivery timeline chart"
          className="block w-full h-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
        />
      </div>
    </BentoCard>
  )
);
DeliveryCard.displayName = "DeliveryCard";

const EngagementCard = memo(
  ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
    const barRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pctRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const bars = barRefs.current.filter(Boolean);
      const pcts = pctRefs.current.filter(Boolean);
      if (!bars.length) return;

      gsap.set(bars, { scaleX: 0, transformOrigin: "left" });

      CAPABILITIES.forEach((cap, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: cap.pct,
          duration: 1.1,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 86%",
            once: true,
          },
          onUpdate() {
            if (pcts[i]) pcts[i]!.textContent = Math.round(obj.val) + "%";
          },
        });
        gsap.to(bars[i], {
          scaleX: cap.pct / 100,
          duration: 1.1,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 86%",
            once: true,
          },
        });
      });

      const rows = wrapRef.current?.querySelectorAll<HTMLDivElement>(".cap-row");
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: { trigger: wrapRef.current, start: "top 86%", once: true },
          }
        );
      }
    }, []);

    return (
      <BentoCard
        innerRef={innerRef}
        className="sm:col-span-2 md:col-span-2 p-4 sm:p-5 flex flex-col relative overflow-hidden"
      >
        {/* faint grid lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {[25, 50, 75, 100].map((x) => (
            <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%"
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 4" />
          ))}
        </svg>

        <div ref={wrapRef} className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="h-px w-4 bg-white/20" />
                <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-(family-name:--font-geist-mono)">
                  Expertise
                </span>
              </div>
              <p className="text-[14px] sm:text-[16px] font-bold text-white/90 font-(family-name:--font-museo-moderno) uppercase tracking-widest leading-tight">
                What We Build
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[9px] text-white/20 font-(family-name:--font-geist-mono) tracking-widest uppercase">Proficiency</span>
              <span className="text-[22px] sm:text-[26px] font-black text-white/8 font-(family-name:--font-museo-moderno) leading-none select-none">
                100
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-3.5 flex-1 justify-center">
            {CAPABILITIES.map((cap, i) => (
              <div key={cap.label} className="cap-row flex flex-col gap-1" style={{ opacity: 0 }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] sm:text-[12px] font-bold text-white/85 font-(family-name:--font-museo-moderno) tracking-wide">
                      {cap.label}
                    </span>
                    <span className="text-[9px] text-white/25 font-(family-name:--font-geist-mono) hidden sm:inline">
                      {cap.note}
                    </span>
                  </div>
                  <span
                    ref={(el) => { pctRefs.current[i] = el; }}
                    className="text-[10px] font-bold tabular-nums text-white/50 font-(family-name:--font-geist-mono)"
                  >
                    0%
                  </span>
                </div>
                {/* track */}
                <div className="relative h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    ref={(el) => { barRefs.current[i] = el; }}
                    className="absolute inset-y-0 left-0 w-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) ${cap.pct}%)`,
                      transformOrigin: "left",
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
            <span className="text-[9px] text-white/25 font-(family-name:--font-geist-mono) tracking-[0.2em] uppercase">Based on shipped projects</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="w-1 h-1 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </BentoCard>
    );
  }
);
EngagementCard.displayName = "EngagementCard";

const DeliverablesBackgroundSVG = memo(() => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 128 128"
    style={{ padding: "10%", opacity: 0.07 }}
  >
    <g fill="#fff">
      <path d="M51.54,61.5A12.46,12.46,0,1,0,64,49.05,12.47,12.47,0,0,0,51.54,61.5Zm22.92,0A10.46,10.46,0,1,1,64,51.05,10.47,10.47,0,0,1,74.46,61.5Z" />
      <path d="M14.2,31.49l-.06.12A1,1,0,0,0,14.48,33a1,1,0,0,0,.51.14,1,1,0,0,0,.86-.48h0a7.64,7.64,0,0,0,9.33-11.69h0a1,1,0,0,0-1.38-1.45l-.09.09A7.63,7.63,0,0,0,14.2,31.49Zm5.1-11.33a5.65,5.65,0,1,1-5.65,5.65A5.65,5.65,0,0,1,19.3,20.16Z" />
      <path d="M110.16,78.76a7.64,7.64,0,0,0-4.31-6.86c0-.05,0-.1,0-.15a1,1,0,0,0-1.94-.49,7.56,7.56,0,0,0-1.44-.14,7.63,7.63,0,0,0-4.65,13.7A1,1,0,0,0,99.52,86l.08-.12a7.64,7.64,0,0,0,10.56-7.07Zm-7.65,5.65a5.65,5.65,0,1,1,5.65-5.65A5.66,5.66,0,0,1,102.51,84.41Z" />
      <path d="M106.12,30.46A7.56,7.56,0,0,0,110,29.37h0a1,1,0,0,0,.82.43,1,1,0,0,0,.57-.18,1,1,0,0,0,.24-1.39l-.07-.11A7.64,7.64,0,0,0,101.28,16.9l-.1-.08a1,1,0,0,0-1.28,1.54h0a7.56,7.56,0,0,0-1.43,4.44A7.65,7.65,0,0,0,106.12,30.46Zm5.65-7.65a5.65,5.65,0,1,1-5.65-5.65A5.66,5.66,0,0,1,111.77,22.81Z" />
      <path d="M58.14,117.33a1,1,0,0,0-.21,2h.12a6,6,0,0,0,11.9,0h.12a1,1,0,1,0-.21-2h0a6,6,0,0,0-11.69,0ZM64,114.65a4,4,0,0,1,4,3.83v0s0,.07,0,.11a4,4,0,0,1-8,0,.52.52,0,0,1,0-.11v0A4,4,0,0,1,64,114.65Z" />
      <path d="M40.44,80.81a5.94,5.94,0,0,0,2.46-.54l.14.17a1,1,0,0,0,.74.33,1,1,0,0,0,.67-.26,1,1,0,0,0,.11-1.35A6,6,0,0,0,38.84,69a1,1,0,0,0-1.88.65c0,.07,0,.13.07.2a6,6,0,0,0,3.41,10.92Zm0-10a4,4,0,1,1-4,4A4,4,0,0,1,40.44,70.82Z" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 64 64"
        to="-360 64 64"
        dur="55s"
        repeatCount="indefinite"
      />
    </g>
  </svg>
));
DeliverablesBackgroundSVG.displayName = "DeliverablesBackgroundSVG";

const CheckIcon = memo(() => (
  <svg width="16" height="16" viewBox="0 0 22 22" fill="none" className="shrink-0">
    <rect
      x="1"
      y="1"
      width="20"
      height="20"
      rx="6"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="1.2"
    />
    <path
      d="M6.5 11.5L9.5 14.5L15.5 7.5"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const DeliverablesCard = memo(
  ({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) => {
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      if (!listRef.current) return;
      const rows =
        listRef.current.querySelectorAll<HTMLLIElement>("li");
      const tween = gsap.fromTo(
        rows,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.09,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
      return () => {
        tween.kill();
      };
    }, []);

    return (
      <BentoCard
        innerRef={innerRef}
        className="sm:col-span-2 lg:col-span-1 p-2.5 sm:p-3 flex flex-col relative overflow-hidden"
      >
        <DeliverablesBackgroundSVG />
        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex items-center gap-2 font-(family-name:--font-museo-moderno) font-bold uppercase tracking-[0.14em] text-[15px] sm:text-[17px] leading-none mb-1">
            <span className="text-white/20 text-[0.88em]">{"{"}</span>
            <span className="text-white/80">What You Get</span>
            <span className="text-white/20 text-[0.88em]">{"}"}</span>
          </div>
          <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 mb-2">
            Every engagement includes
          </p>
          <ul
            ref={listRef}
            className="flex flex-col gap-1.5 flex-1 justify-center"
          >
            {DELIVERABLE_ITEMS.map((text) => (
              <li
                key={text}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-white/4 transition-colors duration-200"
                style={{ opacity: 0 }}
              >
                <CheckIcon />
                <span className="text-[11px] sm:text-xs text-white/70 leading-snug font-medium">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </BentoCard>
    );
  }
);
DeliverablesCard.displayName = "DeliverablesCard";

interface ServiceTileProps {
  service: (typeof services)[number];
  index: number;
}

const ServiceTile = memo(({ service, index }: ServiceTileProps) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: index * 0.07 }}
      style={{ ...SERVICE_TILE_STYLE, minHeight: "200px" }}
      className="relative flex flex-col rounded-xl overflow-hidden hover:border-white/20"
    >
      {/* Lottie fills full card */}
      <div className="absolute inset-0 w-full h-full">
        <ServiceAnim index={index} />
      </div>

      {/* Dark gradient overlay so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Content pinned to bottom */}
      <div className="relative z-10 mt-auto p-4 sm:p-5">
        <div className="flex items-start justify-between mb-1">
          <h3
            className="font-bold font-(family-name:--font-museo-moderno) text-white/90 leading-snug wrap-break-word text-pretty"
            style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", letterSpacing: "-0.01em" }}
          >
            {service.title}
          </h3>
          <span className="text-[7px] font-bold tracking-[0.14em] uppercase text-white/30 border border-white/10 rounded-full px-2 py-0.5 leading-none shrink-0 ml-2">
            {service.ctaText}
          </span>
        </div>
        <p className="text-white/50" style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)" }}>
          {service.description}
        </p>
      </div>
    </motion.li>
  );
});
ServiceTile.displayName = "ServiceTile";


const services = [
  {
    title: "{ Full-Stack Development }",
    description: "Modern Web Applications",
    src: "/banner/fbanner.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Devsomeware builds modern web applications using technologies like
        Next.js, TypeScript, Node.js and PostgreSQL. We focus on creating
        maintainable, well-structured systems that are easy to scale and extend
        as your product grows.
        <br />
        <br />
        Our development process emphasizes clean architecture, clear
        documentation, and reliable deployment practices so teams can confidently
        continue building on the codebase.
      </p>
    ),
  },
  {
    title: "{ Product Prototyping }",
    description: "From Idea to Working Product",
    src: "/banner/pptye.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Turning ideas into working products requires thoughtful planning and
        efficient execution. Devsomeware helps teams design and build early
        versions of their applications so concepts can be tested with real users.
        <br />
        <br />
        We collaborate closely with founders and teams to prioritise the right
        features, iterate quickly, and refine the product based on feedback.
      </p>
    ),
  },
  {
    title: "{ Cloud & Deployment }",
    description: "Reliable Infrastructure",
    src: "/banner/cloud.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Devsomeware helps set up reliable cloud infrastructure for modern
        applications. From deployment pipelines to environment configuration, we
        ensure your application runs smoothly in production.
        <br />
        <br />
        Our approach focuses on stability, monitoring, and scalable architecture
        so your platform can handle growth without unnecessary complexity.
      </p>
    ),
  },
  {
    title: "{ UI / UX Design }",
    description: "User-Focused Interfaces",
    src: "/banner/ui.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Good design makes software easier and more enjoyable to use. We create
        clean, intuitive interfaces that work well across devices and screen
        sizes.
        <br />
        <br />
        Using tools like Figma, we design layouts, components, and flows that
        align with your brand while keeping usability and accessibility in focus.
      </p>
    ),
  },
  {
    title: "{ API Development }",
    description: "Reliable Integrations",
    src: "/banner/api.png",
    ctaText: "Explore",
    ctaLink: "#services",
    content: () => (
      <p>
        Many modern applications rely on integrations with third-party services.
        Devsomeware builds structured REST and GraphQL APIs that make it easier
        to connect different systems together.
        <br />
        <br />
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

  const bentoPanelRef = useMemo(
    () => ({
      headline: { current: null } as React.RefObject<HTMLDivElement | null>,
      howWeWork: { current: null } as React.RefObject<HTMLDivElement | null>,
      delivery: { current: null } as React.RefObject<HTMLDivElement | null>,
      engagement: { current: null } as React.RefObject<HTMLDivElement | null>,
      deliverables: {
        current: null,
      } as React.RefObject<HTMLDivElement | null>,
    }),
    []
  );

  useEffect(() => {
    const cards = Object.values(bentoPanelRef)
      .map((r) => r.current)
      .filter(Boolean);
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 16 });
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.055,
      scrollTrigger: {
        trigger: cards[0],
        start: "top 82%",
        once: true,
      },
    });
    return () => {
      tween.kill();
    };
  }, [bentoPanelRef]);

  return (
    <div
      id="services"
      className="relative w-full bg-black flex flex-col justify-center py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-10 xl:px-14 overflow-hidden"
    >
      <div
        ref={borderRef}
        className="absolute inset-1.5 sm:inset-2 md:inset-3 pointer-events-none z-10"
      >
        {inView && (
          <>
            <H pos="top" offset={0} overhang={14} opacity={0.82} delay={0.1} />
            <H
              pos="bottom"
              offset={0}
              overhang={14}
              opacity={0.82}
              delay={0.2}
            />
            <V
              pos="left"
              offset={0}
              overhang={14}
              opacity={0.82}
              delay={0.15}
            />
            <V
              pos="right"
              offset={0}
              overhang={14}
              opacity={0.82}
              delay={0.25}
            />
            <H pos="top" offset={7} overhang={7} opacity={0.45} delay={0.3} />
            <H
              pos="bottom"
              offset={7}
              overhang={7}
              opacity={0.45}
              delay={0.4}
            />
            <V
              pos="left"
              offset={7}
              overhang={7}
              opacity={0.45}
              delay={0.35}
            />
            <V
              pos="right"
              offset={7}
              overhang={7}
              opacity={0.45}
              delay={0.45}
            />
          </>
        )}
      </div>

      <div className="relative z-20 w-full flex flex-col px-1.5 sm:px-0">
        <ServicesHeading />

        <div className="w-full flex justify-center mb-2">
          <div className="w-full">
            <HeadlineCard innerRef={bentoPanelRef.headline} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-stretch">
          <ul className="contents">
            <ServiceTile service={services[0]} index={0} />
            <ServiceTile service={services[1]} index={1} />
          </ul>
          <HowWeWorkCard innerRef={bentoPanelRef.howWeWork} />

          <DeliveryCard innerRef={bentoPanelRef.delivery} />
          <ul className="contents">
            <ServiceTile service={services[2]} index={2} />
            <ServiceTile service={services[3]} index={3} />
          </ul>

          <ul className="contents">
            <ServiceTile service={services[4]} index={4} />
          </ul>
          <EngagementCard innerRef={bentoPanelRef.engagement} />
          <DeliverablesCard innerRef={bentoPanelRef.deliverables} />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
