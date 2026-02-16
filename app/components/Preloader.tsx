'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader-container">
      
      {/* Background Image */}
      <div className="preloader-bg"></div>

      {/* FULLSCREEN GLASS */}
      <div className="preloader-glass"></div>

      {/* Noise */}
      <div className="preloader-noise"></div>

      {/* Content */}
      <div className="preloader-content">
        
        <div className="logo-container">
          <Image
            src="/logo/logo-v1.png"
            alt="Logo"
            width={450}
            height={450}
            priority
            className="preloader-logo"
          />
        </div>

        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>

      </div>

      <style jsx>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: preloaderFade 2.5s ease-in-out forwards;
        }

        /* Background */
        .preloader-bg {
          position: absolute;
          inset: 0;
          background-image: url('/assets/bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        }

        /* FULLSCREEN GLASS LAYER */
        .preloader-glass {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(140px) saturate(180%);
          -webkit-backdrop-filter: blur(140px) saturate(180%);
        }

        /* Noise */
        .preloader-noise {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-image: url('/assets/noise.png');
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.04;
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        /* Content */
        .preloader-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem;
          margin-top: -6vh;
        }

        .preloader-logo {
          width: 100% !important;
          height: auto !important;
          max-width: 340px;
          filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.5));
        }

        .loading-bar-container {
          width: 100%;
          max-width: 420px;
          height: 4px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          overflow: hidden;
        }

        .loading-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #ffffff 30%,
            #f5f5f5 50%,
            #ffffff 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: loadingSlide 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes loadingSlide {
          0% {
            transform: translateX(-100%);
            background-position: 0% center;
          }
          100% {
            transform: translateX(0);
            background-position: 200% center;
          }
        }

        @keyframes preloaderFade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .preloader-logo {
            max-width: 240px;
          }

          .loading-bar-container {
            max-width: 280px;
            height: 3px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .preloader-logo {
            max-width: 180px;
          }

          .loading-bar-container {
            max-width: 200px;
            height: 2px;
          }
        }
      `}</style>
    </div>
  );
}
