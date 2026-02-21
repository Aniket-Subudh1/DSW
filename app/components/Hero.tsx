"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import diamondAnimation from "@/public/assets/diamond.json";

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
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16">
         
            <motion.div 
              className="order-1 lg:col-start-1 lg:row-start-1"
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
                className="mb-7 sm:mb-9 lg:mt-20 flex items-center gap-3"
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
                  max-w-[22ch]
                "
              >
                Rapid delivery.
                <br/>
                Industry grade. Best price.
              </motion.h2>

              <motion.div 
                variants={fadeInUp}
                className="mt-9 sm:mt-12 max-w-[65ch]"
              >
                <p className="text-white/65 text-base sm:text-lg lg:text-lg leading-[1.65]">
                  We ship production-ready MVPs at record speed without compromising quality.
                  Industry-grade products, unbeatable prices - built to grow with you.
                </p>
              </motion.div>

            </motion.div>

            <motion.div
              className="order-2 lg:col-start-2 lg:mt-15 lg:row-start-1 lg:row-span-2 flex flex-col items-center justify-center gap-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
            >
              <div className="relative w-[340px] h-[227px] sm:w-[480px] sm:h-[320px] lg:w-[580px] lg:h-[387px] xl:w-[660px] xl:h-[440px]">

                <svg
                  viewBox="0 0 700 467"
                  className="absolute inset-0 w-full h-full"
                  fill="none"
                >
                  <line x1="0" y1="50" x2="700" y2="50" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />
                  <line x1="0" y1="62" x2="700" y2="62" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />

                  <line x1="0" y1="405" x2="700" y2="405" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />
                  <line x1="0" y1="417" x2="700" y2="417" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />

                  <line x1="50" y1="0" x2="50" y2="467" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />
                  <line x1="62" y1="0" x2="62" y2="467" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />

                  <line x1="638" y1="0" x2="638" y2="467" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />
                  <line x1="650" y1="0" x2="650" y2="467" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 6" />

                  {[50, 62, 638, 650].flatMap(x =>
                    [50, 62, 405, 417].map(y => (
                      <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="white" fillOpacity="0.3" />
                    ))
                  )}
                </svg>

                <div
                  className="absolute overflow-hidden"
                  style={{
                    left:   `${(70 / 700) * 100}%`,
                    top:    `${(70 / 467) * 100}%`,
                    right:  `${(70 / 700) * 100}%`,
                    bottom: `${(70 / 467) * 100}%`,
                  }}
                >
                  <Image
                    src="/assets/bann.png"
                    alt="Hero visual"
                    fill
                    className="object-full rounded-lg opacity-100"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent" />
                </div>

                <div className="absolute inset-[28%] rounded-full bg-white/5 blur-3xl pointer-events-none" />
              </div>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.9 }}
                whileHover="hover"
                whileTap="hover"
                className="relative group inline-flex items-center gap-4 px-8 py-4 rounded-sm border border-dashed border-white/25 bg-white/[0.03] overflow-hidden cursor-pointer select-none active:scale-95 transition-transform duration-150"
              >
                <motion.span
                  variants={{ hover: { scaleX: 1 } }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  style={{ originX: 0 }}
                  className="absolute inset-0 bg-white/[0.06] pointer-events-none"
                />

                {["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((pos, i) => (
                  <motion.span
                    key={i}
                    variants={{ hover: { opacity: 1, scale: 1.4 } }}
                    initial={{ opacity: 0.35, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`absolute w-1 h-1 rounded-full bg-white/60 ${pos}`}
                  />
                ))}

                <span className="relative text-sm font-semibold tracking-widest uppercase text-white/70 group-hover:text-white/95 transition-colors duration-300">
                  Book a Strategy Call
                </span>

                <motion.span
                  variants={{ hover: { x: 5, opacity: 1 } }}
                  initial={{ x: 0, opacity: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative text-white text-base leading-none"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>

            <motion.div
              className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={fadeInUp}
                className="
                  pt-8 sm:pt-10 pb-8 sm:pb-10 px-3 sm:px-8 mb-10 -mx-4 sm:-mx-6
                  border-2 border-dotted border-white/15 rounded-lg
                  grid grid-cols-3 gap-0
                  relative
                "
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group cursor-default px-3 sm:px-4 py-0"
                >
                  <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
                    RAPID DELIVERY
                  </p>
                  <p className="text-white/95 text-[11px] sm:text-sm font-medium leading-[1.4] sm:leading-[1.5] transition-colors duration-300 group-hover:text-white">
                    Full SaaS products shipped at unmatched speed, from concept to production.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="
                    group cursor-default
                    px-3 sm:px-4 py-0
                    border-l-2 border-dotted border-white/15
                  "
                >
                  <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
                    INDUSTRY GRADE
                  </p>
                  <p className="text-white/95 text-[11px] sm:text-sm font-medium leading-[1.4] sm:leading-[1.5] transition-colors duration-300 group-hover:text-white">
                    Enterprise-quality engineering that scales with your business.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="
                    group cursor-default 
                    px-3 sm:px-4 py-0
                    border-l-2 border-dotted border-white/15 
                  "
                >
                  <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
                    BEST PRICES
                  </p>
                  <p className="text-white/95 text-[11px] sm:text-sm font-medium leading-[1.4] sm:leading-[1.5] transition-colors duration-300 group-hover:text-white">
                    Premium software at prices that make sense for every stage.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}