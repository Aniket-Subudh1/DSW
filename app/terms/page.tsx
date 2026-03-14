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
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      {
        heading: "Agreement to these terms",
        text: "By accessing this website or engaging Devsomeware Technology Private Limited ('Devsomeware', 'we', 'us') for any services, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use this website or engage our services.",
      },
      {
        heading: "Capacity to contract",
        text: "You represent that you are at least 18 years of age and have the legal authority to enter into binding agreements on behalf of yourself or the organisation you represent.",
      },
    ],
  },
  {
    id: "services",
    title: "2. Services",
    body: [
      {
        heading: "Scope of work",
        text: "All services provided by Devsomeware are governed by a separate written Statement of Work (SOW) or Service Agreement executed between Devsomeware and the client. These Terms and Conditions apply in addition to, and do not replace, any such agreement.",
      },
      {
        heading: "Service descriptions on this website",
        text: "Information about our services on this website is provided for general informational purposes only and does not constitute a binding offer. Actual scope, pricing, and timelines are defined exclusively in signed project agreements.",
      },
      {
        heading: "Modifications to services",
        text: "We reserve the right to modify, suspend, or discontinue any service offering described on this website at our discretion, without notice. This does not affect obligations under any existing signed agreements.",
      },
    ],
  },
  {
    id: "payment",
    title: "3. Payment Terms",
    body: [
      {
        heading: "Payment schedule",
        text: "All payment terms — including instalment schedules, advance payments, and final balances — are specified in the signed project agreement. Standard practice requires a minimum advance of 50% before work commences.",
      },
      {
        heading: "Invoicing",
        text: "Devsomeware is a GST-registered Private Limited company. All invoices will be issued with applicable GST as required under Indian law. Clients are responsible for obtaining their own tax advice regarding deductibility.",
      },
      {
        heading: "Late payment",
        text: "Invoices not settled within the agreed period may attract a late fee as specified in the project agreement. Devsomeware reserves the right to pause work on outstanding projects where invoices remain overdue beyond 14 calendar days without written notice.",
      },
      {
        heading: "Refunds",
        text: "Refund eligibility is determined by the specific terms of the signed project agreement. Advance payments for work already completed are generally non-refundable unless otherwise agreed in writing.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    body: [
      {
        heading: "Ownership transfer on completion",
        text: "Upon receipt of full and final payment, all intellectual property rights in the deliverables created exclusively for the client under a project agreement — including source code, designs, and documentation — transfer fully to the client.",
      },
      {
        heading: "Devsomeware-owned components",
        text: "Where deliverables incorporate Devsomeware's pre-existing proprietary tools, libraries, or frameworks, or open-source components, those elements remain subject to their original licences. We will clearly identify any such components during the project.",
      },
      {
        heading: "Portfolio rights",
        text: "Devsomeware retains the right to reference the existence of a client engagement (name, industry, and general nature of work) in our portfolio and marketing materials, unless the client has requested confidentiality in writing.",
      },
      {
        heading: "Website content",
        text: "All content on this website — including text, design, graphics, and code — is the property of Devsomeware Technology Private Limited and is protected under applicable copyright law. Reproduction without written consent is prohibited.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "5. Confidentiality",
    body: [
      {
        heading: "Mutual confidentiality",
        text: "Both parties agree to hold in confidence any non-public information disclosed during the course of an engagement ('Confidential Information') and to use such information only for the purposes of fulfilling obligations under the relevant project agreement.",
      },
      {
        heading: "NDA capability",
        text: "As a registered Private Limited company, Devsomeware is fully capable of entering into formal Non-Disclosure Agreements. Clients may request an NDA before sharing sensitive information. Please contact us at hello@devsomeware.com.",
      },
    ],
  },
  {
    id: "warranties-liability",
    title: "6. Warranties and Limitation of Liability",
    body: [
      {
        heading: "Service warranty",
        text: "Devsomeware warrants that services will be performed in a professional and workmanlike manner, consistent with reasonable industry standards. Specific warranty periods and remedies are defined in the signed project agreement.",
      },
      {
        heading: "Website disclaimer",
        text: "This website is provided 'as is' without warranties of any kind, express or implied. We do not warrant that the website will be error-free, uninterrupted, or free of viruses or other harmful components.",
      },
      {
        heading: "Limitation of liability",
        text: "To the maximum extent permitted by applicable law, Devsomeware's aggregate liability to any client for any claims arising out of or related to a project shall not exceed the total fees paid by the client under the relevant project agreement during the 12 months preceding the claim.",
      },
      {
        heading: "Exclusion of consequential damages",
        text: "In no event shall Devsomeware be liable for any indirect, incidental, special, punitive, or consequential damages, including loss of profits, data, or business opportunity, even if advised of the possibility of such damages.",
      },
    ],
  },
  {
    id: "termination",
    title: "7. Termination",
    body: [
      {
        heading: "Termination by either party",
        text: "Either party may terminate a project agreement in accordance with the termination provisions contained within that agreement. The notice period and payment obligations upon termination are specified therein.",
      },
      {
        heading: "Effect of termination",
        text: "Upon termination, the client will owe payment for all work completed up to the termination date, calculated on a pro-rata basis against the agreed project price unless otherwise specified in the project agreement.",
      },
      {
        heading: "Survival",
        text: "Sections relating to Intellectual Property, Confidentiality, Limitation of Liability, and Governing Law shall survive the termination of any agreement.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "8. Governing Law and Dispute Resolution",
    body: [
      {
        heading: "Governing law",
        text: "These Terms and Conditions and any agreements entered into under them are governed by and construed in accordance with the laws of India, including but not limited to the Indian Contract Act, 1872, and the Information Technology Act, 2000.",
      },
      {
        heading: "Dispute resolution",
        text: "In the event of any dispute, the parties shall first attempt in good faith to resolve the matter through negotiation within 30 calendar days. If unresolved, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in India.",
      },
      {
        heading: "Jurisdiction",
        text: "For matters not subject to arbitration, you agree to submit to the exclusive jurisdiction of the courts of India.",
      },
    ],
  },
  {
    id: "general",
    title: "9. General Provisions",
    body: [
      {
        heading: "Entire agreement",
        text: "These Terms and Conditions, together with any signed project agreement, constitute the entire agreement between the parties and supersede all prior communications, representations, or agreements relating to the subject matter.",
      },
      {
        heading: "Severability",
        text: "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
      },
      {
        heading: "Amendments",
        text: "We reserve the right to update these Terms at any time. The revised Terms will be posted on this page with an updated 'Last Updated' date. Continued use of the website or our services after changes constitutes acceptance.",
      },
      {
        heading: "Contact",
        text: "For any questions regarding these Terms, please contact us at: hello@devsomeware.com",
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

export default function TermsPage() {
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
            duration: 1.6,
            scrambleText: {
              text: "TERMS & CONDITIONS",
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
          className="pointer-events-none absolute -top-20 left-1/3 w-120 h-60 rounded-full opacity-10"
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
            aria-label="Terms and Conditions"
          >
            ░░░░░░░░░░░░░░░░░░
          </h1>

          <p
            className="mt-6 text-white/40 text-sm max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            These Terms and Conditions govern your use of the Devsomeware website
            and any services provided by Devsomeware Technology Private Limited.
            Please read them carefully.
          </p>

          <p
            className="mt-3 text-white/25 text-xs"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)" }} />

      {/* Content */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16 items-start">

          {/* Sticky TOC */}
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
                href="/privacy"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Privacy Policy →
              </Link>
            </div>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {SECTIONS.map((s) => (
              <SectionCard key={s.id} section={s} />
            ))}

            {/* Divider */}
            <div className="w-full h-px bg-white/7" />

            <p
              className="text-xs text-white/28 leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Devsomeware Technology Private Limited is incorporated under the
              Companies Act, 2013 of India. These Terms were last updated on{" "}
              {LAST_UPDATED}. If you have any questions, please contact us at{" "}
              hello@devsomeware.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
