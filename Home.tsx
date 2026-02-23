import { useEffect, useRef, useState } from "react";
import { Phone, Shield, Star, CheckCircle2, Award, Clock, ArrowRight } from "lucide-react";

const PHONE = "(877) 739-3610";
const PHONE_HREF = "tel:+18777393610";

// --- New Sticky Urgency Component ---
function StickyUrgencyBar() {
  const [seconds, setSeconds] = useState(90); // 01:30
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setFlash(true);
          setTimeout(() => setFlash(false), 2000);
          return 90; // Reset
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-red-700 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-t-2 border-yellow-400">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-4">
        
        <div className="flex items-center gap-2">
          <span className="text-xl animate-pulse">⏳</span>
          <span className="text-xs md:text-sm font-bold tracking-tight uppercase leading-none">
            {flash ? "Access Window Reset — Act Now" : "Unlock Your Veteran Benefit Window"}
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="font-mono text-xl md:text-2xl font-bold bg-black/30 px-2 py-1 rounded">
            {formatTime(seconds)}
          </div>
          
          <a
            href={PHONE_HREF}
            className="bg-yellow-400 text-red-900 px-4 md:px-8 py-2 md:py-3 rounded-full font-black text-sm md:text-lg uppercase tracking-tighter shadow-lg hover:scale-105 active:scale-95 transition-all animate-bounce"
          >
            Find Your Rate
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Simplified Page Sections ---
export default function Home() {
  return (
    <div className="pb-24 md:pb-32"> {/* Extra padding for the sticky bar */}
      
      {/* Header */}
      <nav className="bg-[#1a2744] text-white py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter">VA-VETERAN.LIFE</div>
          <a href={PHONE_HREF} className="font-bold text-yellow-400 flex items-center gap-2">
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#1a2744] text-white py-16 md:py-28 px-6 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1 border border-yellow-500 text-yellow-500 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
            Official Veteran Direct Portal
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif">
            Protecting Those <br/><span className="text-yellow-500">Who Served.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-300 font-light max-w-2xl mx-auto">
            Get your final expense rate in 60 seconds. No medical exams. No war exclusions. 
            <span className="block mt-2 font-bold text-white">Coverage starting at $2 a day.</span>
          </p>
          
          <a href={PHONE_HREF} className="inline-block bg-yellow-500 text-[#1a2744] px-12 py-6 rounded-lg text-2xl font-black shadow-2xl hover:scale-105 transition-transform uppercase tracking-tighter">
            Find Your Rate: {PHONE}
          </a>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-70 text-sm">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> No Exams</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> All Branches</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Fixed Rates</span>
          </div>
        </div>
      </section>

      {/* High Urgency Middle Bar */}
      <section className="bg-yellow-50 py-16 px-6 text-center border-y-2 border-yellow-200">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4 font-serif">Speak to a Licensed Benefits Specialist</h2>
        <p className="text-lg text-slate-600 mb-8">Our agents are standing by to lock in your veteran rate today.</p>
        <a href={PHONE_HREF} className="text-4xl md:text-6xl font-black text-red-700 hover:text-red-800 transition block mb-4">
          {PHONE}
        </a>
        <div className="flex justify-center gap-2 text-green-700 font-bold uppercase text-xs tracking-widest">
          <span className="animate-pulse">●</span> Currently Active: 14 Specialists Online
        </div>
      </section>

      {/* Simplified Proof Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
                <div className="text-4xl">🔒</div>
                <h3 className="text-2xl font-bold text-[#1a2744]">Locked-In Benefits</h3>
                <p className="text-slate-600">Your premiums will never increase and your benefit will never decrease as you age.</p>
            </div>
            <div className="space-y-4">
                <div className="text-4xl">⚡</div>
                <h3 className="text-2xl font-bold text-[#1a2744]">Fast Approval</h3>
                <p className="text-slate-600">Most veterans are approved in under 24 hours with zero medical exams or blood tests.</p>
            </div>
            <div className="space-y-4">
                <div className="text-4xl">🎖️</div>
                <h3 className="text-2xl font-bold text-[#1a2744]">War Exclusion Free</h3>
                <p className="text-slate-600">Full protection that traditional civilian insurance often misses for those who served.</p>
            </div>
        </div>
        <div className="mt-16 text-center">
            <a href={PHONE_HREF} className="inline-block bg-[#1a2744] text-white px-10 py-5 rounded font-bold text-xl hover:bg-slate-800">
                Find Your Rate Now
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-500 py-16 px-6 text-xs text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>VA-Veteran.Life is a private resource and is not affiliated with the Department of Veterans Affairs.</p>
          <p>© 2026 VA-VETERAN.LIFE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      {/* The Urgency Bar */}
      <StickyUrgencyBar />
    </div>
  );
}
