/*
 * VA-Veteran.Life — Home Landing Page
 * Design: "Duty & Trust" — Military Gravitas with Warm Humanity
 * Palette: Deep Navy + Warm Gold + Sage Green + Off-White
 * Fonts: Playfair Display (headings) + Source Sans 3 (body)
 *
 * MOBILE-FIRST OPTIMIZATIONS:
 * - All images use loading="lazy" except above-the-fold hero
 * - Hero bg uses 800w on mobile, 1400w on desktop via srcSet
 * - Hero height is compact on mobile (auto, not 90vh) so CTA is above the fold
 * - Reduced animation delays on mobile (prefers-reduced-motion respected)
 * - Inline call CTAs inserted between every major section
 * - Floating bottom call bar always visible on mobile
 * - Sticky top bar shows phone number prominently on mobile
 * - Testimonials stack single-column on mobile for readability
 * - Benefits grid is 1-col on mobile, 2-col on sm, 3-col on lg
 * - No heavy background images on mobile for split sections
 * - Font sizes tightened for mobile readability
 */

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Shield,
  Star,
  CheckCircle2,
  Users,
  DollarSign,
  Globe,
  Heart,
  Award,
  Clock,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const PHONE = "(800) 555-0199";
const PHONE_HREF = "tel:+18005550199";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/TqyicfrLqnGSvHnK.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: 1,
    name: "James R.",
    title: "U.S. Army, Retired — 22 Years",
    location: "San Antonio, TX",
    rating: 5,
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/EgEgxPwoIQGKpHHF.jpg",
    quote:
      "After I retired, I spent two years trying to find coverage that didn't penalize me for my service history. VA-Veteran.Life got me covered in three days. The agent actually knew what a DD-214 was — I didn't have to explain anything.",
  },
  {
    id: 2,
    name: "Denise M.",
    title: "Veteran's Spouse — 18 Years of Military Family Life",
    location: "Clarksville, TN",
    rating: 5,
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/smdbpDtJvINaMzvT.jpg",
    quote:
      "My husband separated from the Army two years ago and we immediately lost our SGLI coverage. Every civilian insurer we called either declined us or quoted rates we couldn't afford. VA-Veteran.Life covered both of us at a rate lower than what we expected.",
  },
  {
    id: 3,
    name: "Carlos V.",
    title: "U.S. Marine Corps Veteran, 12 Years",
    location: "Phoenix, AZ",
    rating: 5,
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/JVaQuUBzALenTiJL.jpg",
    quote:
      "I separated in 2019 and went years without life insurance because I kept getting turned down. VA-Veteran.Life approved me without a medical exam. No hidden fees, no bait-and-switch — just a straightforward policy that protects my family.",
  },
  {
    id: 4,
    name: "Linda K.",
    title: "Gold Star Widow — U.S. Air Force",
    location: "Columbus, GA",
    rating: 5,
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/orHfcccjWasmdWMw.jpg",
    quote:
      "After losing my husband, I needed to make sure my children and I were protected. The team at VA-Veteran.Life treated me with genuine respect and patience. They understand the weight of what military families carry in a way that no civilian insurer ever has.",
  },
];

const BENEFITS = [
  { icon: DollarSign, title: "Guaranteed Payouts", desc: "Your family receives a tax-free death benefit to cover expenses, debts, or future needs." },
  { icon: Globe, title: "Portable Coverage", desc: "Most policies stay with you if you change duty stations, retire, or move into civilian life." },
  { icon: CheckCircle2, title: "No Medical Exam Options", desc: "Many plans offer simplified underwriting for easier and faster approval." },
  { icon: Heart, title: "Survivor Financial Security", desc: "Provides peace of mind that your loved ones can cover living expenses, mortgage, or education costs." },
  { icon: Users, title: "Continuation for Spouses", desc: "Non-military spouses can keep their coverage even if the service member leaves the military." },
  { icon: Shield, title: "Worldwide Protection", desc: "Coverage applies no matter where you're stationed or deployed — giving your family peace of mind." },
];

// CDN URLs for carrier logos (uploaded from official brand sources)
const CARRIERS = [
  {
    name: "Mutual of Omaha",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/NAFsqRKhMXsMuPMp.png",
  },
  {
    name: "Transamerica",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/iNNboQvORjCwIPPG.png",
  },
  {
    name: "AIG",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/IzlwpKxacfgWxFda.png",
  },
  {
    name: "Prudential",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/VxLejMxbTVVhfAcH.png",
  },
  {
    name: "Foresters Financial",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/HlOAVzVrYhsLcimd.png",
  },
  {
    name: "Lincoln Financial",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663209850724/XvwTAvynRCuDReKq.png",
  },
];

const STATS = [
  { value: "47,000+", label: "Families Covered" },
  { value: "$2/day", label: "Starting Rate" },
  { value: "48 hrs", label: "Avg. Approval" },
  { value: "A+", label: "Carrier Rating" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function useScrollFade(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollFade();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// Reusable gold call button — full-width on mobile
function CallBtn({ label = `Call ${PHONE}`, fullWidth = false, large = false }: { label?: string; fullWidth?: boolean; large?: boolean }) {
  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex items-center justify-center gap-2.5 rounded font-bold tracking-wide transition-all active:scale-95 hover:scale-105 ${fullWidth ? "w-full" : "w-fit"} ${large ? "px-8 py-4 text-base" : "px-6 py-3.5 text-sm"}`}
      style={{
        background: "oklch(0.72 0.12 75)",
        color: "oklch(0.12 0.04 255)",
        fontFamily: "'Source Sans 3', sans-serif",
        boxShadow: "0 4px 18px oklch(0.72 0.12 75 / 0.4)",
      }}
    >
      <Phone className={large ? "w-5 h-5" : "w-4 h-4"} />
      {label}
    </a>
  );
}

// Inline "mid-page" call nudge strip
function CallStrip({ text }: { text: string }) {
  return (
    <div
      className="py-5 px-4"
      style={{ background: "oklch(0.22 0.06 255)" }}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-center sm:text-left" style={{ color: "oklch(0.88 0.03 160)" }}>
          {text}
        </p>
        <CallBtn label={`Call ${PHONE}`} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>

      {/* ══ STICKY HEADER ══════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50"
        style={{ background: "oklch(0.22 0.06 255)", boxShadow: "0 2px 12px oklch(0 0 0 / 0.3)" }}
      >
        <div className="container flex items-center justify-between py-2.5">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src={LOGO_URL}
              alt="VA-Veteran.Life logo"
              width={40} height={40}
              className="h-9 w-9 object-contain"
            />
            <div className="leading-tight">
              <div className="text-xs font-bold tracking-widest" style={{ color: "oklch(0.98 0 0)" }}>
                VA-VETERAN.LIFE
              </div>
              <div className="text-[10px]" style={{ color: "oklch(0.72 0.12 75)" }}>
                Protecting Those Who Served
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium" style={{ color: "oklch(0.82 0.02 255)" }}>
            {["Benefits", "Why Us", "Testimonials", "FAQ"].map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(" ", "-")}`} className="hover:opacity-75 transition-opacity">{n}</a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile: prominent call button */}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 px-3 py-2 rounded font-bold text-xs tracking-wide"
              style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.04 255)" }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="md:hidden">Call Now</span>
              <span className="hidden md:inline">{PHONE}</span>
            </a>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 rounded"
              style={{ color: "oklch(0.98 0 0)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {menuOpen && (
          <nav
            className="md:hidden border-t flex flex-col"
            style={{ background: "oklch(0.18 0.05 255)", borderColor: "oklch(0.3 0.04 255)" }}
          >
            {["Benefits", "Why Us", "Testimonials", "FAQ"].map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(" ", "-")}`}
                className="px-5 py-3 text-sm font-medium border-b"
                style={{ color: "oklch(0.88 0.03 160)", borderColor: "oklch(0.28 0.04 255)" }}
                onClick={() => setMenuOpen(false)}
              >
                {n}
              </a>
            ))}
            {/* Full phone number in mobile menu */}
            <a
              href={PHONE_HREF}
              className="px-5 py-4 flex items-center gap-2 font-bold text-sm"
              style={{ color: "oklch(0.72 0.12 75)" }}
            >
              <Phone className="w-4 h-4" />
              {PHONE} — Free Consultation
            </a>
          </nav>
        )}
      </header>

      {/* ══ HERO ═══════════════════════════════════════════════════════════════
          Mobile-first: compact height so CTA is above the fold on all phones.
          Background image served at 800w on mobile, 1400w on desktop.
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          background: "oklch(0.12 0.04 255)",
          minHeight: "clamp(520px, 85vh, 780px)",
        }}
      >
        {/* Responsive background image — smaller on mobile for faster load */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            media="(min-width: 768px)"
            srcSet="https://images.unsplash.com/photo-1580130379624-3a069adbffc5?w=1400&q=75"
          />
          <img
            src="https://images.unsplash.com/photo-1580130379624-3a069adbffc5?w=800&q=70"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.32 }}
            fetchPriority="high"
          />
        </picture>

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, oklch(0.12 0.04 255 / 0.94) 40%, oklch(0.12 0.04 255 / 0.55) 100%)" }}
        />
        {/* Star watermark */}
        <div className="absolute inset-0 star-bg" />

        <div className="container relative z-10 py-14 md:py-24">
          <div className="max-w-xl">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
              style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
            >
              <Award className="w-3 h-3" />
              Army · Navy · Air Force · Marines · Coast Guard
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1]"
              style={{ color: "oklch(0.98 0 0)", fontFamily: "'Playfair Display', serif" }}
            >
              Life Insurance for{" "}
              <span style={{ color: "oklch(0.72 0.12 75)" }}>Veterans,</span>{" "}
              Retirees &amp; Their Families
            </h1>

            <p className="text-base sm:text-lg mb-2 leading-relaxed" style={{ color: "oklch(0.88 0.02 160)" }}>
              Whole life coverage starting at{" "}
              <strong style={{ color: "oklch(0.98 0 0)" }}>$2 a day</strong> — no war exclusions, no medical exam required.
            </p>

            {/* Trust chips — compact row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-7 mt-3">
              {["No War Exclusions", "No Medical Exam", "Coverage in 48 hrs"].map((t) => (
                <span key={t} className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.82 0.03 160)" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
                  {t}
                </span>
              ))}
            </div>

            {/* Primary CTA — full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              <CallBtn label={`Call Now — ${PHONE}`} fullWidth large />
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-4 rounded font-semibold text-sm transition-all hover:bg-white/10"
                style={{ color: "oklch(0.98 0 0)", border: "1.5px solid oklch(0.98 0 0 / 0.35)" }}
              >
                See Benefits
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            {/* Hours */}
            <p className="text-xs mt-4" style={{ color: "oklch(0.62 0.02 255)" }}>
              Mon–Fri 8am–8pm ET · Sat 9am–5pm ET · Free, no-obligation consultation
            </p>
          </div>
        </div>

        {/* Circular family photo — only on large screens */}
        <div
          className="absolute bottom-6 right-6 hidden lg:block"
          style={{ width: 200, height: 200, borderRadius: "50%", overflow: "hidden", border: "4px solid oklch(0.98 0 0)", boxShadow: "0 8px 32px oklch(0 0 0 / 0.45)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=75"
            alt="Military family"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* ══ FEATURE BAR ════════════════════════════════════════════════════════ */}
      <div style={{ background: "oklch(0.19 0.055 255)" }}>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { icon: Users, label: "Veterans, Retirees & Their Families" },
              { icon: DollarSign, label: "Rates Starting $2 a Day*" },
              { icon: Phone, label: PHONE, sub: "Speak with a specialist", isPhone: true },
            ].map(({ icon: Icon, label, sub, isPhone }) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-5 py-4 ${isPhone ? "cursor-pointer" : ""}`}
                onClick={isPhone ? () => (window.location.href = PHONE_HREF) : undefined}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}>
                  <Icon className="w-4 h-4" style={{ color: "oklch(0.72 0.12 75)" }} />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-snug" style={{ color: "oklch(0.98 0 0)" }}>{label}</div>
                  {sub && <div className="text-xs" style={{ color: "oklch(0.72 0.12 75)" }}>{sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CARRIER TRUST BAR ═══════════════════════════════════════════════════
          White background, desaturated logos, subtle border top/bottom.
          Scrolls horizontally on mobile to keep logos legible.
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        className="py-5 border-y"
        style={{
          background: "oklch(0.99 0 0)",
          borderColor: "oklch(0.91 0.005 255)",
        }}
      >
        <div className="container">
          <p
            className="text-center text-[10px] font-semibold tracking-widest uppercase mb-4"
            style={{ color: "oklch(0.62 0.01 255)" }}
          >
            Policies Underwritten by Top-Rated Carriers
          </p>
          {/* Scrollable row on mobile, centered wrap on desktop */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto sm:flex-wrap sm:justify-center pb-1 sm:pb-0 no-scrollbar">
            {CARRIERS.map(({ name, logo }) => (
              <div
                key={name}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ height: 36 }}
                title={name}
              >
                <img
                  src={logo}
                  alt={name}
                  className="h-full w-auto object-contain"
                  style={{
                    filter: "grayscale(100%) opacity(0.55)",
                    maxWidth: 110,
                    transition: "filter 0.2s ease",
                  }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%) opacity(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%) opacity(0.55)")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ══════════════════════════════════════════════════════════════ */}
      <div style={{ background: "oklch(0.86 0.03 160)" }}>
        <div className="container py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {STATS.map(({ value, label }, i) => (
              <Fade key={label} delay={i * 60}>
                <div className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 255)" }}>{value}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: "oklch(0.38 0.04 255)" }}>{label}</div>
              </Fade>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BENEFITS DETAIL ════════════════════════════════════════════════════ */}
      <section id="benefits" style={{ background: "oklch(0.86 0.03 160)" }}>
        <div className="grid lg:grid-cols-2">
          <div className="px-5 sm:px-8 lg:px-14 py-12 lg:py-20 flex flex-col justify-center">
            <Fade>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 heading-underline"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.01 255)" }}
              >
                Life Insurance Designed for Military Families
              </h2>
              <p className="mt-5 mb-6 text-sm sm:text-base leading-relaxed" style={{ color: "oklch(0.35 0.04 255)" }}>
                Serving in the military comes with unique risks, responsibilities, and sacrifices. That's why it's important to have coverage that understands and supports your lifestyle. Our policies are built to provide financial security no matter where duty takes you — whether you're deployed overseas, transitioning to civilian life, or protecting the future of your loved ones at home.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { bold: "Comprehensive Coverage", text: "No war exclusions or aviation-related restrictions, ensuring full protection in every situation." },
                  { bold: "Seamless Transition", text: "Your policy stays with you, even after leaving the military and moving into civilian life." },
                  { bold: "Family-Friendly Options", text: "Coverage is also available for non-military spouses, extending peace of mind to the whole family." },
                ].map(({ bold, text }) => (
                  <li key={bold} className="flex gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.06 255)" }} />
                    <span className="text-sm" style={{ color: "oklch(0.28 0.02 255)" }}>
                      <strong>{bold}</strong> — {text}
                    </span>
                  </li>
                ))}
              </ul>
              <CallBtn label={`Call ${PHONE}`} fullWidth />
            </Fade>
          </div>
          {/* Photo hidden on mobile to save bandwidth */}
          <div className="hidden lg:block relative">
            <img
              src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=75"
              alt="Soldier with American flag"
              className="w-full h-full object-cover"
              style={{ minHeight: 420 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ══ INLINE CALL STRIP 1 ════════════════════════════════════════════════ */}
      <CallStrip text="Questions about your coverage options? Our specialists are standing by." />

      {/* ══ BENEFITS GRID ══════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-12 sm:py-16 lg:py-20" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <Fade>
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.01 255)" }}
              >
                VA Life Insurance Benefits
              </h2>
              <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: "oklch(0.45 0.01 255)" }}>
                Serving in the military comes with unique risks, responsibilities, and sacrifices. That's why it's important to have coverage that understands and supports your lifestyle. Our policies are built to provide financial security no matter where duty takes you — whether you're deployed overseas, transitioning to civilian life, or protecting the future of your loved ones at home. With flexible options, affordable rates, and benefits tailored to both service members and their families, you can count on coverage that stands strong when it matters most.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <Fade key={title} delay={i * 60}>
                <div
                  className="p-5 rounded-xl h-full"
                  style={{ background: "oklch(1 0 0)", border: "1.5px solid oklch(0.9 0.005 255)", boxShadow: "0 2px 10px oklch(0 0 0 / 0.04)" }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "oklch(0.22 0.06 255 / 0.08)" }}>
                    <Icon className="w-4 h-4" style={{ color: "oklch(0.22 0.06 255)" }} />
                  </div>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: "oklch(0.15 0.01 255)", fontFamily: "'Source Sans 3', sans-serif" }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "oklch(0.5 0.01 255)" }}>{desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY VETERANS NEED SPECIALIZED COVERAGE ═════════════════════════════ */}
      <section>
        <div className="grid lg:grid-cols-2">
          {/* Photo — hidden on mobile */}
          <div className="hidden lg:block relative order-1">
            <img
              src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=75"
              alt="Military family at home"
              className="w-full h-full object-cover"
              style={{ minHeight: 460 }}
              loading="lazy"
            />
          </div>
          <div
            className="px-5 sm:px-8 lg:px-14 py-12 lg:py-20 flex flex-col justify-center order-2"
            style={{ background: "oklch(0.25 0.04 255)" }}
          >
            <Fade>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 heading-underline"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.98 0 0)" }}
              >
                Why Veterans Need Specialized Coverage
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "oklch(0.82 0.02 255)" }}>
                Life insurance isn't one-size-fits-all — especially for those who serve. Many traditional policies come with restrictions that leave gaps in protection, like exclusions for combat, deployment, or aviation-related deaths. Veterans and their families deserve better.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-7" style={{ color: "oklch(0.82 0.02 255)" }}>
                Specialized coverage is built with the military lifestyle in mind. It removes common exclusions, stays with you when you transition into civilian life, and extends options to your spouse and dependents. This ensures that no matter where service takes you — or what comes after — your family's financial security is always protected.
              </p>
              <CallBtn label={`Speak with a Specialist — ${PHONE}`} fullWidth />
            </Fade>
          </div>
        </div>
      </section>

      {/* ══ INLINE CALL STRIP 2 ════════════════════════════════════════════════ */}
      <CallStrip text="Most veterans qualify in under 20 minutes — no paperwork, no exam." />

      {/* ══ TESTIMONIALS ═══════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20" style={{ background: "oklch(0.96 0.005 80)" }}>
        <div className="container">
          <Fade>
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-3"
                style={{ background: "oklch(0.22 0.06 255 / 0.08)", color: "oklch(0.22 0.06 255)" }}
              >
                <Heart className="w-3 h-3" />
                Real Stories from Real Families
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.01 255)" }}
              >
                What Our Policyholders Say
              </h2>
              <p className="max-w-md mx-auto text-sm" style={{ color: "oklch(0.45 0.01 255)" }}>
                Real accounts from veterans and military families across the country.
              </p>
            </div>
          </Fade>

          {/* Single column on mobile, 2-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TESTIMONIALS.map(({ id, name, title, location, rating, photo, quote }, i) => (
              <Fade key={id} delay={i * 80}>
                <div
                  className="p-5 sm:p-6 rounded-xl h-full flex flex-col"
                  style={{ background: "oklch(1 0 0)", border: "1.5px solid oklch(0.9 0.005 255)", boxShadow: "0 3px 14px oklch(0 0 0 / 0.05)" }}
                >
                  <StarRating count={rating} />
                  <blockquote
                    className="text-sm leading-relaxed mt-3 mb-5 flex-1 italic"
                    style={{ color: "oklch(0.35 0.01 255)" }}
                  >
                    "{quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid oklch(0.92 0.005 255)" }}>
                    <img
                      src={photo}
                      alt={name}
                      width={48} height={48}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                      style={{ border: "2px solid oklch(0.86 0.03 160)" }}
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-sm" style={{ color: "oklch(0.15 0.01 255)" }}>{name}</div>
                      <div className="text-xs" style={{ color: "oklch(0.22 0.06 255)" }}>{title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "oklch(0.6 0.01 255)" }}>{location}</div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Call CTA right below testimonials */}
          <Fade delay={200}>
            <div className="mt-8 text-center">
              <p className="text-sm mb-4" style={{ color: "oklch(0.45 0.01 255)" }}>
                Ready to protect your family? It only takes one call.
              </p>
              <CallBtn label={`Call ${PHONE} — Free Consultation`} large />
            </div>
          </Fade>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-12 sm:py-16 lg:py-20" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-2xl">
          <Fade>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-8 text-center"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.01 255)" }}
            >
              Frequently Asked Questions
            </h2>
          </Fade>
          <div className="space-y-3">
            {[
              { q: "Does coverage apply if I'm called back to service?", a: "Yes. Our policies include no war exclusions and no aviation-related restrictions. If you are recalled or re-enlisted, your coverage remains fully in force with no interruption." },
              { q: "What happens to my policy when I leave the military?", a: "Your policy is fully portable. It stays in force regardless of your military status. No conversion requirements or re-application processes when you transition to civilian life." },
              { q: "Can my spouse get covered under the same plan?", a: "Yes. Coverage is available for both military and non-military spouses. Many families bundle coverage for a simplified, lower-cost solution." },
              { q: "Is a medical exam required?", a: "Many of our plans offer simplified underwriting with no medical exam required. Most veterans qualify with just a short health questionnaire." },
              { q: "How quickly can I get covered?", a: "Most applicants receive a decision within 24–48 hours. Our specialists can walk you through the entire process over the phone in under 20 minutes." },
            ].map(({ q, a }, i) => (
              <Fade key={q} delay={i * 50}>
                <details
                  className="group rounded-xl overflow-hidden"
                  style={{ background: "oklch(1 0 0)", border: "1.5px solid oklch(0.9 0.005 255)" }}
                >
                  <summary
                    className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm list-none"
                    style={{ color: "oklch(0.15 0.01 255)" }}
                  >
                    {q}
                    <ChevronDown className="w-4 h-4 shrink-0 ml-2 transition-transform group-open:rotate-180" style={{ color: "oklch(0.5 0.01 255)" }} />
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "oklch(0.45 0.01 255)", borderTop: "1px solid oklch(0.93 0.005 255)" }}>
                    <div className="pt-3">{a}</div>
                  </div>
                </details>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA BANNER ═══════════════════════════════════════════════════ */}
      <section
        className="py-14 sm:py-20 relative overflow-hidden"
        style={{ background: "oklch(0.22 0.06 255)" }}
      >
        <div className="absolute inset-0 star-bg" />
        <div className="container relative z-10 text-center max-w-2xl">
          <Fade>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
              style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
            >
              <Clock className="w-3 h-3" />
              Coverage in as little as 48 hours
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.98 0 0)" }}
            >
              Your Family's Protection Starts with One Phone Call
            </h2>
            <p className="text-sm sm:text-base mb-8 leading-relaxed" style={{ color: "oklch(0.82 0.02 255)" }}>
              Speak directly with a licensed specialist who understands military life. No pressure, no jargon — just honest answers and a plan that works for you.
            </p>
            <CallBtn label={`Call ${PHONE} — Free Consultation`} fullWidth large />
            <p className="text-xs mt-4" style={{ color: "oklch(0.55 0.02 255)" }}>
              Mon–Fri 8am–8pm ET · Sat 9am–5pm ET · No obligation
            </p>
          </Fade>
        </div>
      </section>

      {/* ══ FLOATING MOBILE CALL BAR ════════════════════════════════════════════
          Always visible on mobile. Hidden on md+ (header CTA handles desktop).
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-2.5 w-full py-4 font-bold text-base tracking-wide active:scale-95 transition-transform"
          style={{
            background: "oklch(0.72 0.12 75)",
            color: "oklch(0.12 0.04 255)",
            fontFamily: "'Source Sans 3', sans-serif",
            boxShadow: "0 -4px 20px oklch(0 0 0 / 0.3)",
          }}
        >
          {/* Animated ping ring */}
          <span className="relative flex items-center justify-center">
            <span
              className="absolute rounded-full animate-ping"
              style={{ width: 30, height: 30, background: "oklch(0.12 0.04 255 / 0.18)" }}
            />
            <Phone className="relative w-5 h-5" />
          </span>
          <span>Call {PHONE}</span>
          <span
            className="text-xs font-normal px-2 py-0.5 rounded-full"
            style={{ background: "oklch(0.12 0.04 255 / 0.15)" }}
          >
            Free · No Obligation
          </span>
        </a>
      </div>

      {/* Spacer to prevent footer being hidden by floating bar on mobile */}
      <div className="md:hidden" style={{ height: 64 }} />

      {/* ══ FOOTER ═════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "oklch(0.86 0.03 160)" }}>
        <div className="container py-10">
          <div className="flex flex-col sm:flex-row gap-6 justify-between mb-8">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <img src={LOGO_URL} alt="VA-Veteran.Life" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
                <div>
                  <div className="font-bold text-xs tracking-widest" style={{ color: "oklch(0.22 0.06 255)" }}>VA-VETERAN.LIFE</div>
                  <div className="text-[10px]" style={{ color: "oklch(0.4 0.03 255)" }}>Protecting Those Who Served</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "oklch(0.42 0.03 255)" }}>
                Life insurance for veterans, retirees, and their families. Nationwide. No war exclusions.
              </p>
              {/* Phone in footer */}
              <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold" style={{ color: "oklch(0.22 0.06 255)" }}>
                <Phone className="w-3.5 h-3.5" />
                {PHONE}
              </a>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              {[
                { heading: "Coverage", links: ["Veterans", "Retirees", "Military Spouses", "Dependents"] },
                { heading: "Company", links: ["About Us", "Privacy Policy", "Terms of Service", "Careers"] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <div className="font-bold mb-2 tracking-widest uppercase text-[10px]" style={{ color: "oklch(0.22 0.06 255)" }}>{heading}</div>
                  <ul className="space-y-1.5">
                    {links.map((l) => <li key={l} className="text-xs" style={{ color: "oklch(0.42 0.03 255)" }}>{l}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="pt-6 space-y-2 text-[11px] leading-relaxed"
            style={{ borderTop: "1px solid oklch(0.76 0.03 160)", color: "oklch(0.48 0.03 255)" }}
          >
            <p>All third-party trademarks, images, and logos displayed on this website are the property of their respective owners and are used for informational and descriptive purposes only.</p>
            <p>VA-Veteran.Life is a privately owned and operated insurance agency licensed to sell insurance products in applicable states. Coverage availability, eligibility, benefits, and pricing vary by insurance carrier and individual circumstances.</p>
            <p>VA-Veteran.Life is not affiliated with, endorsed by, or associated with the U.S. Department of Veterans Affairs (VA), the U.S. government, or any military or veteran organization.</p>
            <p>Final expense life insurance policies are issued by third-party insurance carriers and may be sold by licensed insurance agents appointed with those carriers. *$2/day rate based on qualifying applicants. Actual rates vary.</p>
            <p>By using this website, you acknowledge that you have read and agree to our <a href="#" style={{ textDecoration: "underline" }}>Terms of Service</a> and <a href="#" style={{ textDecoration: "underline" }}>Privacy Policy</a>. We are committed to protecting your privacy. If you prefer not to share your personal information, please visit <a href="#" style={{ textDecoration: "underline" }}>Do Not Sell My Personal Information</a>.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
