"use client";

const ITEMS = [
  "{ Full-Stack Development }",
  "{ Rapid MVP Launch }",
  "{ Cloud & DevOps }",
  "{ UI / UX Design }",
  "{ API Integrations }",
  "{ Scalable Systems }",
];

const TRACK = [...ITEMS, ...ITEMS];

export default function ScrollRibbon() {
  return (
    <div className="w-full bg-black border-y border-white/10 overflow-hidden select-none">
      <div className="overflow-hidden w-full border-b border-white/[0.07]">
        <div
          className="flex shrink-0 whitespace-nowrap will-change-transform text-white/55"
          style={{ animation: "marquee-l 28s linear infinite" }}
        >
          {TRACK.map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 py-3 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden w-full">
        <div
          className="flex shrink-0 whitespace-nowrap will-change-transform text-white/30"
          style={{ animation: "marquee-r 22s linear infinite" }}
        >
          {TRACK.map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 py-3 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase"
            >
              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
