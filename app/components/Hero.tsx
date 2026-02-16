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
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] sm:min-h-[100dvh] overflow-hidden bg-black">

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
        className={`
          fixed w-full flex items-center justify-between
          top-0 px-6
          sm:px-10
          lg:px-20
          py-6 sm:py-8 lg:py-5
          z-50
          transition-all duration-500
          ${scrolled ? 'backdrop-blur-xl bg-black/80' : 'bg-transparent'}
        `}
      >

        <div className="relative">
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

        {/* Logo */}
        <div
          className="
            relative
            w-[45px]
            sm:w-[70px]
            lg:w-[110px]
            aspect-[125/116]
          "
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

      <div className="relative  z-20 flex items-start top-4 sm:items-center pt-32 sm:pt-24 lg:pt-20 xl:pt-0 pb-10 sm:pb-0 min-h-[100svh] sm:min-h-[100dvh]">
        <div className="w-full px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-8 xl:gap-10">
         
            <motion.div 
              className="max-w-4xl relative sm:left-20 sm:top-5 -top-10 lg:left-10 flex-1 lg:max-w-[52%]"
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
                className="mb-7 sm:mb-9  flex items-center gap-3"
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
                  text-2xl sm:text-6xl lg:text-[60px] xl:text-[40px]
                  
                  max-w-[22ch]
                "
              >
                Scalable products,
                <br/>
                disciplined execution.
              </motion.h2>

              <motion.div 
                variants={fadeInUp}
                className="mt-9 sm:mt-12 max-w-[65ch]"
              >
                <p className="text-white/65 text-base sm:text-lg lg:text-xl leading-[1.65]">
                  Devsomeware builds scalable software and future-ready brands.
                  We focus on systems, design, and execution that last.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="
                  mt-14 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-10 px-3 sm:px-8 -mx-4 sm:-mx-6
                  border-2 border-dotted border-white/15 rounded-lg
                  grid grid-cols-3 gap-0
                  relative
                "
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group cursor-default   px-2 sm:px-4 py-0"
                >
                  <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
                   SAAS PRODUCTS
                  </p>
                  <p className="text-white/95 text-[11px] sm:text-sm font-medium leading-[1.4] sm:leading-[1.5] transition-colors duration-300 group-hover:text-white">
                    Reliable systems designed for long <br/>term scalability.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="
                    group cursor-default
                    px-2 sm:px-4 py-0
                    border-l-2 border-dotted border-white/15
                  "
                >
                  <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
                    DIGI SOLUTIONS
                  </p>
                  <p className="text-white/95 text-[11px] sm:text-sm font-medium leading-[1.4] sm:leading-[1.5] transition-colors duration-300 group-hover:text-white">
                    Engineering and design built for real world performance.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="
                    group cursor-default 
                    px-2 sm:px-4 py-0
                    border-l-2 border-dotted border-white/15 
                  "
                >
                  <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
                    BRAND SYSTEMS
                  </p>
                  <p className="text-white/95 text-[11px] sm:text-sm font-medium leading-[1.4] sm:leading-[1.5] transition-colors duration-300 group-hover:text-white">
                    Strategic brand development supported by structure and clarity.
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