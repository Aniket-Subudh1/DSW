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
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: preloaderFade 2.5s ease-in-out forwards;
        }

        .preloader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 600px;
          padding: 1rem;
          margin-top: -8vh;
        }

        .logo-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .preloader-logo {
          width: 100% !important;
          height: auto !important;
          max-width: 380px;
          filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.12));
        }

        .loading-bar-container {
          width: 100%;
          max-width: 500px;
          height: 4px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .loading-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #000 20%,
            #1a1a1a 40%,
            #000 60%,
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
            max-width: 260px;
          }

          .loading-bar-container {
            max-width: 320px;
            height: 3px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .preloader-content {
            gap: 0.8rem;
          }

          .preloader-logo {
            max-width: 180px;
            filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.12));
          }

          .loading-bar-container {
            max-width: 220px;
            height: 2px;
          }
        }

        /* Very small phones */
        @media (max-width: 360px) {
          .preloader-logo {
            max-width: 150px;
          }

          .loading-bar-container {
            max-width: 180px;
          }
        }
      `}</style>
    </div>
  );
}
