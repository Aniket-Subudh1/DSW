"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Lottie from "lottie-react";
import diamondAnimation from "@/public/assets/diamond.json";
import { NoiseBackground } from "@/app/components/ui/noise-background";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Hero() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[100svh] sm:min-h-[100dvh] overflow-hidden bg-black">
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="logo-grain" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feComposite in="grayNoise" in2="SourceGraphic" operator="in" result="clippedNoise" />
            <feBlend in="SourceGraphic" in2="clippedNoise" mode="soft-light" result="blended" />
            <feComponentTransfer in="blended">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <Image
        src="/assets/bg.png"
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover"
      />

      <div
        className="
          absolute inset-0
          pointer-events-none
          z-10
          bg-[url('/assets/noise.png')]
          bg-repeat
          bg-[length:200px_200px]
          opacity-10
          mix-blend-soft-light
        "
      />

      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
        className="
          absolute w-full flex items-center justify-between
          top-0 px-6
          sm:px-10
          lg:px-20
          py-6 sm:py-8 lg:py-5
          z-50
          bg-transparent
        "
      >

        <div className="relative" style={{ filter: 'url(#logo-grain)' }}>
          <h1
            className="
              text-white/90 font-bold whitespace-nowrap tracking-wide
              font-[family-name:var(--font-museo-moderno)]
              text-base sm:text-xl lg:text-[28px]
            "
          >
            DEVSOMEWARE .
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="
                text-white/70 text-sm font-medium tracking-wide
                hover:text-white/95 transition-colors duration-300
                relative group
              "
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/90 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative w-6 h-6 flex items-center justify-center group"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-[1px] bg-white/90 transition-all duration-300 origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-[1px] bg-white/90 transition-all duration-300"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-[1px] bg-white/90 transition-all duration-300 origin-center"
            />
          </div>
        </button>

        <div
          className="
            relative
            w-[45px]
            sm:w-[70px]
            lg:w-[110px]
            aspect-[125/116]
          "
          style={{ filter: 'url(#logo-grain)' }}
        >
          <Image
            src="/logo/logo-v2.png"
            alt="Devsomeware Logo"
            fill
            priority
            className="object-contain brightness-90"
          />
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="
          fixed inset-0 z-[45] lg:hidden
          backdrop-blur-md bg-black/80
          flex items-center justify-center
        "
      >
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                text-white/90 text-2xl font-medium tracking-wide
                font-[family-name:var(--font-museo-moderno)]
                hover:text-white transition-colors duration-300
              "
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative z-20 flex items-center pt-24 sm:pt-28 lg:pt-0 pb-10 sm:pb-0 min-h-[100svh] sm:min-h-[100dvh]">
        <div className="w-full px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-16">
         
            <motion.div 
              className="order-1 flex flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1], delay: 0.65 }}
                className="absolute left-[-56px] sm:left-[-72px] lg:left-[-88px] top-[78px] sm:top-[98px] lg:top-[112px] w-14 sm:w-20 lg:w-24 pointer-events-none hidden sm:block z-0"
              >
                <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-55" />
              
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mb-6 flex items-center gap-3 sm:mb-9 lg:mt-20"
              >
                <span className="h-px w-10 sm:w-14 bg-white/35" />
               
                <div className="w-16 sm:w-20 h-16 sm:h-20 relative">
                  <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-3, 0, -3] }}
                  transition={{ duration: 6.2, ease: "easeInOut", repeat: Infinity }}
                  className="relative"
                >
                  <Lottie
                    animationData={diamondAnimation}
                    loop={true}
                    className="w-full h-full opacity-75 mix-blend-screen"
                  />
                </motion.div>
                </div>
                <span className="h-px w-10 sm:w-14 bg-white/35" />
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="
                  text-white/95 font-medium
                  font-[family-name:var(--font-museo-moderno)]
                  text-[28px] sm:text-[40px] lg:text-[40px] xl:text-[40px]
                  leading-[1.15]
                  max-w-[14ch] sm:max-w-[22ch]
                "
              >
                Rapid delivery.
                <br/>
                Industry grade. Best price.
              </motion.h2>

              <motion.div 
                variants={fadeInUp}
                className="mt-7 max-w-[34ch] sm:mt-12 sm:max-w-[65ch]"
              >
                <p className="text-white/65 text-base sm:text-lg lg:text-lg leading-[1.65]">
                  We ship production-ready MVPs at record speed without compromising quality.
                  Industry-grade products, unbeatable prices - built to grow with you.
                </p>
              </motion.div>


            </motion.div>

            <motion.div
              className="order-2 flex flex-col items-center justify-center gap-5 sm:gap-7 lg:col-start-2 lg:mt-15 lg:row-start-1 lg:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
            >
              <NoiseBackground
  containerClassName="w-full max-w-[700px] h-[214px] sm:w-[380px] sm:h-[254px] lg:w-[460px] lg:h-[307px] xl:w-[540px] xl:h-[360px] p-[4px] rounded-sm bg-black backdrop-blur-none"
  className="h-full w-full rounded-lg"
  gradientColors={[
    "rgb(180, 120, 255)",
    "rgb(100, 180, 255)",
    "rgb(255, 180, 100)",
  ]}
  speed={0.06}
>
                <div className="relative w-full h-full rounded-none overflow-hidden bg-black">
                  <Image
                    src="/assets/bann.png"
                    alt="Hero visual"
                    fill
                    className="object-cover opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="absolute inset-[28%] rounded-full bg-white/5 blur-3xl pointer-events-none" />
                </div>
              </NoiseBackground>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.9 }}
              >
                <NoiseBackground
                  containerClassName="w-full sm:w-fit p-1.5 rounded-full bg-neutral-900"
                  gradientColors={[
                    "rgb(180, 120, 255)",
                    "rgb(100, 180, 255)",
                    "rgb(255, 180, 100)",
                  ]}
                >
                  <a
                    href="#contact"
                    className="flex min-w-[220px] items-center justify-center gap-2 cursor-pointer rounded-full bg-gradient-to-r from-black via-neutral-950 to-neutral-900 px-5 py-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-white/85 shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] transition-all duration-150 hover:text-white active:scale-95 sm:min-w-0 sm:px-6 sm:py-3 sm:text-sm sm:tracking-widest"
                  >
                    Book a Strategy Call
                    <span className="text-white/70 text-sm leading-none">&rarr;</span>
                  </a>
                </NoiseBackground>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-3 mb-4 lg:col-start-1 lg:row-start-2 lg:self-start lg:mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <NoiseBackground
  containerClassName="w-full p-[2px] rounded-lg bg-black"
  gradientColors={[
    "rgb(180, 120, 255)",
    "rgb(100, 180, 255)",
    "rgb(255, 180, 100)",
  ]}
  speed={0.05}
>
  <motion.div
    variants={fadeInUp}
    className="grid gap-0 rounded-[5px] bg-black/90 px-5 py-5 sm:grid-cols-3 sm:px-6"
  >
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-default py-3 sm:py-0 sm:pr-6"
    >
      <p className="mb-1.5 text-[9px] tracking-[0.18em] text-white/35 uppercase sm:text-[8px]">
        RAPID DELIVERY
      </p>
      <p className="text-[13px] font-medium leading-[1.5] text-white/85 transition-colors duration-300 group-hover:text-white sm:text-[11px]">
        From idea to production in weeks - we build and launch full SaaS
        platforms faster than traditional development teams.
      </p>
    </motion.div>

    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-default border-t border-white/[0.08] py-3 sm:border-l sm:border-t-0 sm:px-6 sm:py-0"
    >
      <p className="mb-1.5 text-[9px] tracking-[0.18em] text-white/35 uppercase sm:text-[8px]">
        ENTERPRISE QUALITY
      </p>
      <p className="text-[13px] font-medium leading-[1.5] text-white/85 transition-colors duration-300 group-hover:text-white sm:text-[11px]">
        Clean architecture, scalable infrastructure, and production-grade
        engineering built for real-world growth.
      </p>
    </motion.div>

    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-default border-t border-white/[0.08] py-3 sm:border-l sm:border-t-0 sm:pl-6 sm:py-0"
    >
      <p className="mb-1.5 text-[9px] tracking-[0.18em] text-white/35 uppercase sm:text-[8px]">
        SMART PRICING
      </p>
      <p className="text-[13px] font-medium leading-[1.5] text-white/85 transition-colors duration-300 group-hover:text-white sm:text-[11px]">
        High-quality software development without inflated agency costs -
        transparent pricing that founders actually appreciate.
      </p>
    </motion.div>
  </motion.div>
</NoiseBackground>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}