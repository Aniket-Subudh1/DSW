'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const BRAND = 'DEVSOMEWARE';
const CHARS = '█▓▒░_/\\|<>{}[]';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [brand, setBrand] = useState(() => BRAND.split('').map(() => '▓').join(''));

  useEffect(() => {
    const duration = 2300;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const duration = 1700;
    const start = Date.now();
    let raf: number;
    const animate = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const revealed = Math.floor(p * BRAND.length);
      const result = BRAND.split('')
        .map((char, i) => {
          if (i < revealed) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setBrand(result);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pl-wrap">
      {/* Noise */}
      <div className="pl-noise" />
      {/* Subtle radial glow */}
      <div className="pl-glow" />
      {/* Corner rule lines */}
      <div className="pl-corner pl-corner-tl" />
      <div className="pl-corner pl-corner-tr" />
      <div className="pl-corner pl-corner-bl" />
      <div className="pl-corner pl-corner-br" />

      {/* Main content */}
      <div className="pl-body">
        {/* Icon */}
        <div className="pl-icon">
          <Image
            src="/logo/logo-v2.png"
            alt="Devsomeware"
            width={56}
            height={56}
            priority
            className="pl-img"
          />
        </div>

        {/* Scramble brand */}
        <p className="pl-brand">{brand}</p>

        {/* Tagline */}
        <p className="pl-tagline">Software that actually works</p>

        {/* Progress bar + counter */}
        <div className="pl-progress-wrap">
          <div className="pl-track">
            <div className="pl-fill" style={{ width: `${count}%` }} />
          </div>
          <div className="pl-meta">
            <span className="pl-label">Initialising</span>
            <span className="pl-count">{String(count).padStart(2, '0')}%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pl-wrap {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          animation: plFade 2.5s ease-in-out forwards;
        }

        .pl-noise {
          position: absolute;
          inset: 0;
          background-image: url('/assets/noise.png');
          background-size: 200px 200px;
          opacity: 0.045;
          mix-blend-mode: soft-light;
          pointer-events: none;
          z-index: 1;
        }

        .pl-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 65% 45% at 50% 50%,
            rgba(255, 255, 255, 0.045) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Corner decoration lines */
        .pl-corner {
          position: absolute;
          z-index: 2;
          pointer-events: none;
        }
        .pl-corner::before,
        .pl-corner::after {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.12);
        }
        .pl-corner::before { width: 28px; height: 1px; }
        .pl-corner::after  { width: 1px; height: 28px; }

        .pl-corner-tl { top: 28px; left: 28px; }
        .pl-corner-tl::before { top: 0; left: 0; }
        .pl-corner-tl::after  { top: 0; left: 0; }

        .pl-corner-tr { top: 28px; right: 28px; }
        .pl-corner-tr::before { top: 0; right: 0; left: auto; }
        .pl-corner-tr::after  { top: 0; right: 0; left: auto; }

        .pl-corner-bl { bottom: 28px; left: 28px; }
        .pl-corner-bl::before { bottom: 0; top: auto; left: 0; }
        .pl-corner-bl::after  { bottom: 0; top: auto; left: 0; }

        .pl-corner-br { bottom: 28px; right: 28px; }
        .pl-corner-br::before { bottom: 0; top: auto; right: 0; left: auto; }
        .pl-corner-br::after  { bottom: 0; top: auto; right: 0; left: auto; }

        /* Body */
        .pl-body {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
          animation: plReveal 0.5s ease-out forwards;
        }

        @keyframes plReveal {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Icon */
        .pl-icon {
          position: relative;
          width: 56px;
          height: 56px;
          animation: plPulse 2.2s ease-in-out infinite;
        }
        .pl-img {
          width: 100% !important;
          height: auto !important;
        }

        @keyframes plPulse {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(255,255,255,0.10)); }
          50%       { filter: drop-shadow(0 0 32px rgba(255,255,255,0.22)); }
        }

        /* Brand */
        .pl-brand {
          font-family: var(--font-museo-moderno);
          font-size: clamp(1.3rem, 3.8vw, 2rem);
          font-weight: 900;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1;
          margin: 0;
          min-width: 13ch;
          text-align: center;
        }

        /* Tagline */
        .pl-tagline {
          font-family: var(--font-geist-sans);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.22);
          margin: -0.8rem 0 0;
          text-align: center;
        }

        /* Progress */
        .pl-progress-wrap {
          width: min(280px, 76vw);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .pl-track {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          overflow: hidden;
        }

        .pl-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.82) 100%);
          border-radius: 999px;
          transition: width 0.04s linear;
        }

        .pl-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pl-label {
          font-family: var(--font-geist-mono);
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.2);
        }

        .pl-count {
          font-family: var(--font-geist-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.42);
          font-variant-numeric: tabular-nums;
        }

        @keyframes plFade {
          0%  { opacity: 0; }
          10% { opacity: 1; }
          84% { opacity: 1; }
          100%{ opacity: 0; }
        }

        @media (max-width: 480px) {
          .pl-icon { width: 44px; height: 44px; }
          .pl-corner-tl,
          .pl-corner-tr,
          .pl-corner-bl,
          .pl-corner-br { display: none; }
        }
      `}</style>
    </div>
  );
}
