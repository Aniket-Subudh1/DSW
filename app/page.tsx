'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import CraftReveal from '@/app/components/CraftReveal';
import { Hero } from '@/app/components/Hero';
import ContentSection from '@/app/components/ContentSection';
import Preloader from '@/app/components/Preloader';
import ScrollRibbon from '@/app/components/ScrollRibbon';

const emptySubscribe = () => () => {};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-white z-[9999]" />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="w-full bg-black">
      <Hero />
      <ScrollRibbon />
      <ContentSection />
       <CraftReveal /> 
    </main>
  );
}
