"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black">

      {/* Background */}
      <Image
        src="/assets/bg.png"
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover"
      />

      {/* Background Noise */}
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

      {/* Top Row */}
      <div
        className="
          absolute w-full flex items-center justify-between
          top-6 px-6
          sm:top-8 sm:px-10
          lg:top-5 lg:px-20
          z-20
        "
      >
        {/* Text Wrapper */}
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
          <div
            className="
              absolute inset-0
              pointer-events-none
              bg-[url('/assets/noise.png')]
              bg-repeat
              bg-[length:300px_300px]
              opacity-1
              mix-blend-soft-light
            "
          />
        </div>

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

         
          <div
            className="
              absolute inset-0
              pointer-events-none
              bg-[url('/assets/noise.png')]
              bg-repeat
              bg-[length:300px_300px]
              opacity-4
              mix-blend-soft-light
            "
          />
        </div>
      </div>

    </section>
  );
}
