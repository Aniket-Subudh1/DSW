"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

type HProps = { pos: 'top' | 'bottom'; offset: number; overhang: number; opacity: number; delay: number };
type VProps = { pos: 'left' | 'right'; offset: number; overhang: number; opacity: number; delay: number };

const H = ({ pos, offset, overhang, opacity, delay }: HProps) => (
  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: 'absolute',
      display: 'block',
      [pos]: offset,
      left: -overhang,
      right: -overhang,
      height: '2px',
      backgroundColor: `rgba(0,0,0,${opacity})`,
      transformOrigin: 'left',
    }}
  />
);

const V = ({ pos, offset, overhang, opacity, delay }: VProps) => (
  <motion.span
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    style={{
      position: 'absolute',
      display: 'block',
      [pos]: offset,
      top: -overhang,
      bottom: -overhang,
      width: '2px',
      backgroundColor: `rgba(0,0,0,${opacity})`,
      transformOrigin: 'top',
    }}
  />
);

const ContentSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="relative w-full min-h-screen bg-white text-white py-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
      <Image
        src="/assets/bg.png"
        alt=""
        fill
        className="object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />
      <div ref={ref} className="absolute inset-3 sm:inset-4 pointer-events-none z-10">
        {inView && (
          <>
            <H pos="top"    offset={0} overhang={14} opacity={0.82} delay={0.1}  />
            <H pos="bottom" offset={0} overhang={14} opacity={0.82} delay={0.2}  />
            <V pos="left"   offset={0} overhang={14} opacity={0.82} delay={0.15} />
            <V pos="right"  offset={0} overhang={14} opacity={0.82} delay={0.25} />

            <H pos="top"    offset={7} overhang={7} opacity={0.45} delay={0.3}  />
            <H pos="bottom" offset={7} overhang={7} opacity={0.45} delay={0.4}  />
            <V pos="left"   offset={7} overhang={7} opacity={0.45} delay={0.35} />
            <V pos="right"  offset={7} overhang={7} opacity={0.45} delay={0.45} />
          </>
        )}
      </div>

    </div>
  );
};

export default ContentSection;
