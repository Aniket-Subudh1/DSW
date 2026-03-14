"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const LAST_UPDATED = "15 March 2026";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    body: [
      {
        heading: "Information you provide directly",
        text: "When you fill out our contact or enquiry forms, we collect your name, email address, company name, job title, phone number (optional), and any message you submit. This information is provided voluntarily by you.",
      },
      {
        heading: "Automatically collected information",
        text: "When you visit our website, we may collect standard server log data such as your IP address, browser type, operating system, referring URLs, and pages visited. This data is used solely for security monitoring and aggregate analytics — it is not linked to your personal identity.",
      },
      {
        heading: "No tracking cookies without consent",
        text: "We do not use third-party advertising or behavioural tracking cookies. Any first-party session cookies used are strictly necessary for the operation of the site.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    body: [
      {
        heading: "Responding to enquiries",
        text: "The primary use of information you submit through our contact forms is to respond to your enquiry, evaluate your project requirements, and provide you with relevant information about our services.",
      },
      {
        heading: "Service delivery",
        text: "If you engage Devsomeware for a project, your contact details are used for project communication, invoicing, and contractual purposes within the scope of our registered entity under Indian law.",
      },
      {
        heading: "No marketing without consent",
        text: "We do not add you to any marketing mailing list without your explicit consent. We will never sell, rent, or trade your personal information to third parties.",
      },
      {
        heading: "Internal analytics and improvement",
        text: "Anonymised, aggregate data about website usage may be used internally to improve our website content and user experience. No personally identifiable information is used for this purpose.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing and Disclosure",
    body: [
      {
        heading: "We do not sell your data",
        text: "Devsomeware does not sell, lease, or monetise your personal information in any form.",
      },
      {
        heading: "Service providers",
        text: "We may share strictly necessary information with trusted third-party service providers (such as email delivery infrastructure) solely to fulfil requests you have initiated. These providers are contractually bound to process data only as instructed.",
      },
      {
        heading: "Legal obligations",
        text: "We may disclose information if required to do so by law, court order, or in response to a valid request by a government authority in India, as required under the Information Technology Act, 2000 and applicable rules.",
      },
      {
        heading: "Business transfers",
        text: "In the event of a merger, acquisition, or sale of all or part of our business, personal data may be transferred as part of that transaction. We will notify affected users and ensure equivalent data protection obligations are maintained.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "4. Data Retention",
    body: [
      {
        heading: "Enquiry data",
        text: "Contact form submissions are retained for up to 24 months from the date of submission, or for the duration of any resulting business relationship, whichever is longer.",
      },
      {
        heading: "Client data",
        text: "Data related to active client projects is retained for the duration of the engagement plus a minimum of 3 years for legal and accounting purposes, in accordance with India's Companies Act and tax regulations.",
      },
      {
        heading: "Deletion requests",
        text: "You may request deletion of your personal data at any time by contacting us at the address listed in Section 8. We will process valid deletion requests within 30 days, subject to any legal retention obligations.",
      },
    ],
  },
  {
    id: "data-security",
    title: "5. Data Security",
    body: [
      {
        heading: "Technical measures",
        text: "Our website is served over HTTPS. Form submissions are transmitted using TLS encryption. Internally stored submission data is kept on secured servers with access restricted to authorised personnel only.",
      },
      {
        heading: "Organisational measures",
        text: "Access to personal data is granted on a need-to-know basis. Employees and contractors who handle client data are bound by confidentiality obligations.",
      },
      {
        heading: "No guaranteed security",
        text: "While we implement industry-standard security measures, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but commit to promptly notifying affected individuals in the event of a data breach that poses a significant risk.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    body: [
      {
        heading: "Access and correction",
        text: "You have the right to request a copy of the personal information we hold about you, and to request correction of any inaccurate data.",
      },
      {
        heading: "Deletion",
        text: "You may request that we delete your personal data. We will comply unless we are required to retain it for legal reasons.",
      },
      {
        heading: "Withdrawal of consent",
        text: "Where processing is based on your consent, you may withdraw that consent at any time. This will not affect the lawfulness of processing prior to withdrawal.",
      },
      {
        heading: "How to exercise your rights",
        text: "To exercise any of these rights, please contact us at hello@devsomeware.com with the subject line 'Data Privacy Request'. We will respond within 30 calendar days.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "7. Third-Party Links",
    body: [
      {
        heading: "External websites",
        text: "Our website may contain links to third-party websites (including social media platforms). We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.",
      },
    ],
  },
  {
    id: "contact",
    title: "8. Contact & Grievance Redressal",
    body: [
      {
        heading: "Data controller",
        text: "Devsomeware Technology Private Limited is the data controller responsible for your personal information.",
      },
      {
        heading: "Contact details",
        text: "For any privacy-related queries, requests, or complaints, please contact us at: hello@devsomeware.com. We aim to acknowledge all requests within 5 business days and resolve them within 30 calendar days.",
      },
      {
        heading: "Grievance officer",
        text: "In accordance with the Information Technology Act, 2000, a Grievance Officer is designated to address complaints. You may reach the Grievance Officer at the email address above with the subject line 'Grievance — Privacy'.",
      },
    ],
  },
];

function SectionCard({ section }: { section: (typeof SECTIONS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id={section.id} className="flex flex-col gap-5">
      <h2
        className="text-xl sm:text-2xl font-black text-white leading-snug"
        style={{ fontFamily: "var(--font-museo-moderno)" }}
      >
        {section.title}
      </h2>
      <div className="flex flex-col gap-5">
        {section.body.map((item) => (
          <div key={item.heading} className="flex flex-col gap-1.5">
            <h3
              className="text-sm font-bold text-white/70"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              {item.heading}
            </h3>
            <p
              className="text-sm text-white/40 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
        const tl = gsap.timeline({ delay: 0.1 });
        tl.to(headingRef.current, { opacity: 1, duration: 0.3 }, 0);
        tl.to(
          headingRef.current,
          {
            duration: 1.5,
            scrambleText: {
              text: "PRIVACY POLICY",
              chars: "█▓▒░_/\\|<>{}[]",
              revealDelay: 0.2,
              speed: 0.55,
            },
            ease: "none",
          },
          0.05,
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/6 backdrop-blur-md bg-black/80"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo/logo-v2.png" alt="Devsomeware" width={28} height={28} className="opacity-90" />
          <span
            className="text-sm font-bold tracking-wider uppercase text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            Devsomeware
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Book a Call
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 pt-16 pb-12 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 right-1/3 w-120 h-60 rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/35"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Legal
            </span>
            <span className="h-px w-24 bg-white/8" />
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none"
            style={{ fontFamily: "var(--font-museo-moderno)", opacity: 0 }}
            aria-label="Privacy Policy"
          >
            ░░░░░░░░░░░░░░
          </h1>

          <p
            className="mt-6 text-white/40 text-sm max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            This Privacy Policy explains how Devsomeware Technology Private Limited
            collects, uses, and protects personal information you provide to us.
          </p>

          <p
            className="mt-3 text-white/25 text-xs"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)" }} />

      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16 items-start">

          <nav className="hidden lg:flex flex-col gap-1 sticky top-24" aria-label="Table of contents">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-3"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Contents
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-white/30 hover:text-white/65 transition-colors leading-snug py-1 border-l border-white/8 pl-3 hover:border-white/30"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {s.title}
              </a>
            ))}
            <div className="mt-6 pt-5 border-t border-white/7">
              <Link
                href="/terms"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Terms & Conditions →
              </Link>
            </div>
          </nav>

          <div className="flex flex-col gap-12">
            {SECTIONS.map((s) => (
              <SectionCard key={s.id} section={s} />
            ))}

            <div className="w-full h-px bg-white/7" />

            <p
              className="text-xs text-white/28 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              This Privacy Policy is governed by the laws of India. Any disputes
              arising under this policy shall be subject to the exclusive jurisdiction
              of the courts of India. Devsomeware reserves the right to update this
              policy at any time. The &quot;Last Updated&quot; date at the top of this page
              reflects when changes were last made. Continued use of our website after
              any changes constitutes acceptance of the revised policy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
