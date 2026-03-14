"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Footer from "@/app/components/Footer";

const STAGE_OPTIONS = ["Idea / Pre-seed", "MVP / Seed", "Series A", "Series B+", "Bootstrapped"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  stage: string;
  role: string;
  linkedin: string;
}

export default function StartupPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    stage: "",
    role: "",
    linkedin: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".left-content > *", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "startup" }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Request failed.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 z-60 bg-repeat opacity-[0.04]"
        style={{ backgroundImage: "url('/assets/noise.png')", backgroundSize: "200px 200px" }}
      />

      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b border-white/6 backdrop-blur-md bg-black/80">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo/logo-v2.png" alt="Devsomeware" width={28} height={28} className="opacity-90" />
          <span
            className="text-sm font-bold tracking-wider uppercase text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-museo-moderno)" }}
          >
            Devsomeware
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Home
        </Link>
      </header>

      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
        }}
      />

      <main className="flex flex-1 flex-col lg:flex-row">
        <div
          ref={leftRef}
          className="relative lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-8 py-14 lg:px-14 xl:px-20 lg:w-[46%] overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="left-content relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 mb-8">
              <Image
                src="/logo/logo-v2.png"
                alt="Devsomeware"
                width={16}
                height={16}
                className="opacity-80"
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-white/50"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Startup-first approach
              </span>
            </div>

            <h1
              className="text-4xl xl:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-museo-moderno)" }}
            >
              Your Startup
              <br />
              Deserves Better
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Engineering
              </span>
            </h1>

            <p
              className="text-white/50 text-base leading-relaxed mb-10 max-w-sm"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              We move fast without breaking things. Get your MVP shipped in
              weeks, not months — built to scale from day one.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {[
                "Rapid MVP delivery in 4–8 weeks",
                "Scalable architecture from day one",
                "Flat-rate sprint pricing, no surprises",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <polyline points="2 5 4.5 7.5 8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span
                    className="text-sm text-white/60"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact line */}
            <a
              href="mailto:hello@devsomeware.com"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              hello@devsomeware.com
            </a>
          </div>
        </div>

        {/* Vertical divider (desktop only) */}
        <div
          className="hidden lg:block w-px self-stretch"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
          }}
        />

        {/* RIGHT panel — form */}
        <div
          ref={rightRef}
          className="flex-1 flex flex-col justify-center px-8 py-14 lg:px-14 xl:px-20"
        >
          {status === "success" ? (
            <div className="flex flex-col items-start justify-center h-full max-w-xl mx-auto lg:mx-0">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2
                className="text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Sprint plan on its way!
              </h2>
              <p className="text-white/50 text-sm mb-8" style={{ fontFamily: "var(--font-geist-sans)" }}>
                We&apos;ll reach out to <span className="text-white">{form.email}</span> within 24 hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                ← Back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl mx-auto lg:mx-0 space-y-5"
              noValidate
            >
              <h2
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-museo-moderno)" }}
              >
                Request my Sprint Plan
              </h2>
              <p
                className="text-white/40 text-sm mb-6"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                All fields marked <span className="text-white">*</span> are required.
              </p>

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Alex Johnson"
                    className={inputCls}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@startup.io"
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    placeholder="Acme Inc."
                    className={inputCls}
                  />
                </Field>
                <Field label="Company Stage" required>
                  <CustomSelect
                    name="stage"
                    value={form.stage}
                    options={STAGE_OPTIONS}
                    placeholder="Select stage"
                    onChange={(val) => setForm((p) => ({ ...p, stage: val }))}
                  />
                </Field>
              </div>

              {/* Row 3 */}
              <Field label="Your Role / Title" required>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  placeholder="Founder, CTO, Product Lead…"
                  className={inputCls}
                />
              </Field>

              {/* Row 4 */}
              <Field label="Phone (optional)">
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 555 000 0000"
                  className={inputCls}
                />
              </Field>

              {/* Row 5 */}
              <Field label="LinkedIn Profile">
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/…"
                  className={inputCls}
                />
              </Field>

              {errorMsg && (
                <p className="text-red-400 text-sm" style={{ fontFamily: "var(--font-geist-mono)" }}>
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-white py-4 text-sm font-bold tracking-wide text-black transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {status === "loading" ? "Sending…" : "Request My Sprint Plan →"}
              </button>

              {/* Enterprise cross-link */}
              <p
                className="text-center text-sm text-white/30"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Not a startup?{" "}
                <Link
                  href="/contact"
                  className="text-white/60 underline underline-offset-2 hover:text-white transition-colors"
                >
                  Click here →
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all";

function CustomSelect({
  name,
  value,
  options,
  placeholder,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, useCallback(() => setOpen(false), []));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between rounded-xl border ${
          open ? "border-white/30 bg-white/7" : "border-white/10 bg-white/4"
        } px-4 py-3 text-sm transition-all outline-none`}
      >
        <span className={value ? "text-white" : "text-white/20"}>
          {value || placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-white/30 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === opt
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/6 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {/* Hidden native input for form validity */}
      <input type="hidden" name={name} value={value} required />
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-xs tracking-wide text-white/50"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {label}
        {required && <span className="text-white/80 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
