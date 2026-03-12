"use client";

import { CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type VBorderProps = {
  pos: "left" | "right";
  offset: number;
  overhang: number;
  opacity: number;
  delay: number;
};
const VBorder = ({ pos, offset, overhang, opacity, delay }: VBorderProps) => (
  <motion.span
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: "absolute",
      display: "block",
      [pos]: offset,
      top: -overhang,
      bottom: -overhang,
      width: "2px",
      backgroundColor: `rgba(0,0,0,${opacity})`,
      transformOrigin: "top",
    }}
  />
);

function CornerBrackets() {
  return (
    <>
      {[
        { top: "5%", left: "4%", rotate: "0deg" },
        { top: "5%", right: "4%", rotate: "90deg" },
        { bottom: "5%", left: "4%", rotate: "270deg" },
        { bottom: "5%", right: "4%", rotate: "180deg" },
      ].map((style, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.33, 1, 0.68, 1] }}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          className="pointer-events-none absolute"
          style={{ ...style, transform: `rotate(${style.rotate})` } as CSSProperties}
          aria-hidden="true"
        >
          <path
            d="M1 11V2H11"
            stroke="rgba(0,0,0,0.28)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </>
  );
}

export default function CraftReveal() {
  const borderRef = useRef<HTMLDivElement>(null);
  const inView = useInView(borderRef, { once: true, margin: "-60px" });

  return (
    <section
      id="craft"
      className="relative isolate overflow-hidden bg-white text-black"
    >
      <Image
        src="/assets/bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover opacity-[0.1]"
      />

      <div
        ref={borderRef}
        className="absolute inset-x-1.5 -top-2 bottom-0 pointer-events-none z-10 overflow-hidden sm:inset-x-2 md:inset-x-3"
      >
        {inView && (
          <>
            <VBorder pos="left" offset={0} overhang={0} opacity={0.82} delay={0.1} />
            <VBorder pos="right" offset={0} overhang={0} opacity={0.82} delay={0.25} />
            <VBorder pos="left" offset={7} overhang={0} opacity={0.45} delay={0.35} />
            <VBorder pos="right" offset={7} overhang={0} opacity={0.45} delay={0.45} />
          </>
        )}
        <CornerBrackets />
      </div>

      <div className="relative h-[100svh]" />
    </section>
  );
}