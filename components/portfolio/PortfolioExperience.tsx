"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ArrowDown, Mail, Github, Linkedin, Copy, Trophy, Zap, MapPin } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  beyondCode, capabilityGroups, currentMomentum, featuredProjects,
  identityMoments, journey, leadershipRoles, messageAndImpact,
  navItems, philosophyHighlights, philosophyManifesto,
  professionalExperience, profile, recentFieldNotes,
  socialLinks, storyFrames, technicalBreakdown
} from "@/data/portfolio";

function cn(...c: Array<string | false | null | undefined>) { return c.filter(Boolean).join(" "); }

/* ─── Konami ────────────────────────────────────────────────────────────────── */
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
function useKonamiCode(onSuccess: () => void) {
  const p = useRef(0);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === KONAMI[p.current]) { p.current++; if (p.current === KONAMI.length) { onSuccess(); p.current = 0; } }
      else { p.current = e.key === KONAMI[0] ? 1 : 0; }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onSuccess]);
}

/* ─── ScrambleText ──────────────────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [d, setD] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const a = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return; obs.disconnect();
      let i = 0;
      a.current = setInterval(() => {
        setD(text.split("").map((ch, idx) => { if (ch===" ") return " "; if (idx < Math.floor(i)) return text[idx]; return CHARS[Math.floor(Math.random()*CHARS.length)]; }).join(""));
        i += 0.5; if (i >= text.length) { if (a.current) clearInterval(a.current); setD(text); }
      }, 40);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); if (a.current) clearInterval(a.current); };
  }, [text, prefersReducedMotion]);
  return <span ref={ref} className={className}>{d}</span>;
}

/* ─── Cursor ────────────────────────────────────────────────────────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const rp = useRef({ x:-100, y:-100 });
  const mp = useRef({ x:-100, y:-100 });
  const raf = useRef<number|null>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    // dot = 10px, ring = 36px — subtract half to center on cursor
    const DOT = 5; const RING = 18;
    const move = (e: MouseEvent) => {
      mp.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - DOT}px, ${e.clientY - DOT}px)`;
        if (!hasMoved.current) { dot.current.style.opacity = "1"; hasMoved.current = true; }
      }
    };
    const leave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const enter = () => {
      if (hasMoved.current) {
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      rp.current.x = lerp(rp.current.x, mp.current.x, 0.12);
      rp.current.y = lerp(rp.current.y, mp.current.y, 0.12);
      if (ring.current && hasMoved.current) {
        ring.current.style.transform = `translate(${rp.current.x - RING}px, ${rp.current.y - RING}px)`;
        ring.current.style.opacity = "1";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (<>
    <div ref={dot} style={{ opacity: 0, willChange: "transform" }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
    <div ref={ring} style={{ opacity: 0, willChange: "transform" }}
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-[var(--color-accent)]/50 transition-opacity duration-150" />
  </>);
}

/* ─── Scroll progress ───────────────────────────────────────────────────────── */
function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const u=()=>{ if(!bar.current)return; const m=document.documentElement.scrollHeight-window.innerHeight; bar.current.style.width=`${m>0?(window.scrollY/m)*100:0}%`; };
    u(); window.addEventListener("scroll",u,{passive:true}); window.addEventListener("resize",u);
    return ()=>{ window.removeEventListener("scroll",u); window.removeEventListener("resize",u); };
  },[]);
  return <div className="fixed inset-x-0 top-0 z-[9997] h-[1.5px] bg-white/[0.05]"><div ref={bar} className="h-full bg-[var(--color-accent)]" style={{width:"0%",transition:"width 0.08s linear"}}/></div>;
}

/* ─── Click burst ───────────────────────────────────────────────────────────── */
function ClickBurst() {
  const pref = usePrefersReducedMotion();
  useEffect(() => {
    if(pref) return;
    const COLORS=["#ffffff","#0071e3","#64b4ff","#f97316","#22c55e"];
    const h=(e:MouseEvent)=>{ for(let i=0;i<8;i++){ const ang=(i/8)*Math.PI*2+Math.random()*0.4; const d=28+Math.random()*36; const s=3+Math.random()*3.5; const el=document.createElement("div"); el.className="burst-particle"; el.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${s}px;height:${s}px;background:${COLORS[Math.floor(Math.random()*COLORS.length)]};--tx:${Math.cos(ang)*d}px;--ty:${Math.sin(ang)*d}px;margin-left:-${s/2}px;margin-top:-${s/2}px;`; document.body.appendChild(el); setTimeout(()=>el.remove(),600); } };
    window.addEventListener("click",h); return ()=>window.removeEventListener("click",h);
  },[pref]); return null;
}

/* ─── Context menu ──────────────────────────────────────────────────────────── */
function ContextMenu() {
  const [pos,setPos]=useState<{x:number;y:number}|null>(null); const [copied,setCopied]=useState(false);
  useEffect(()=>{
    const c=(e:MouseEvent)=>{ e.preventDefault(); setPos({x:Math.min(e.clientX,window.innerWidth-260),y:Math.min(e.clientY,window.innerHeight-230)}); setCopied(false); };
    const h=()=>setPos(null); const k=(e:KeyboardEvent)=>{if(e.key==="Escape")setPos(null);};
    document.addEventListener("contextmenu",c); document.addEventListener("click",h); document.addEventListener("keydown",k);
    return ()=>{ document.removeEventListener("contextmenu",c); document.removeEventListener("click",h); document.removeEventListener("keydown",k); };
  },[]);
  if(!pos) return null;
  const actions=[
    {label:"Email Imanol",icon:<Mail className="h-3 w-3"/>,onClick:()=>{window.location.href=`mailto:${profile.email}`;setPos(null);}},
    {label:"GitHub",icon:<Github className="h-3 w-3"/>,onClick:()=>{window.open("https://github.com/Imanol2006","_blank");setPos(null);}},
    {label:"LinkedIn",icon:<Linkedin className="h-3 w-3"/>,onClick:()=>{window.open("https://linkedin.com/in/imanol-galvan","_blank");setPos(null);}},
    {label:copied?"Copied!":"Copy email",icon:<Copy className="h-3 w-3"/>,onClick:()=>{navigator.clipboard.writeText(profile.email);setCopied(true);setTimeout(()=>setPos(null),900);}},
  ];
  return <div className="custom-ctx" style={{left:pos.x,top:pos.y}} onClick={e=>e.stopPropagation()}><p className="custom-ctx-header">Imanol Galvan</p><div className="custom-ctx-sep"/>{actions.map(a=><button key={a.label} className="custom-ctx-item" onClick={a.onClick}><span className="custom-ctx-icon">{a.icon}</span>{a.label}</button>)}</div>;
}

/* ─── KonamiToast ───────────────────────────────────────────────────────────── */
function KonamiToast({visible}:{visible:boolean}) {
  const [r,setR]=useState(false); const [ex,setEx]=useState(false);
  useEffect(()=>{ if(visible){setR(true);setEx(false); const t1=setTimeout(()=>setEx(true),2800); const t2=setTimeout(()=>setR(false),3200); return ()=>{clearTimeout(t1);clearTimeout(t2);} } },[visible]);
  if(!r)return null;
  return <div className={cn("pointer-events-none fixed bottom-8 left-1/2 z-[9998]",ex?"konami-toast-exit":"konami-toast-enter")}><div className="rounded-full border border-white/16 bg-black/90 px-6 py-3 backdrop-blur-xl"><p className="whitespace-nowrap text-sm font-medium text-white/90">↑↑↓↓←→←→ · You found it. Nice moves.</p></div></div>;
}

/* ─── IdleToast ─────────────────────────────────────────────────────────────── */
function IdleToast() {
  const [r,setR]=useState(false); const [ex,setEx]=useState(false); const t=useRef<ReturnType<typeof setTimeout>|null>(null); const shown=useRef(false);
  useEffect(()=>{
    const reset=()=>{ if(t.current)clearTimeout(t.current); if(shown.current)return; t.current=setTimeout(()=>{ shown.current=true; setR(true);setEx(false); setTimeout(()=>setEx(true),4000); setTimeout(()=>setR(false),4400); },15000); };
    reset(); ["mousemove","keydown","click","scroll"].forEach(ev=>window.addEventListener(ev,reset,{passive:true}));
    return ()=>{ if(t.current)clearTimeout(t.current); ["mousemove","keydown","click","scroll"].forEach(ev=>window.removeEventListener(ev,reset)); };
  },[]);
  if(!r)return null;
  return <div className={cn("pointer-events-none fixed bottom-8 right-8 z-[9996]",ex?"idle-toast-exit":"idle-toast-enter")}><div className="rounded-full border border-white/16 bg-black/90 px-5 py-3 backdrop-blur-xl"><p className="whitespace-nowrap text-sm font-medium text-white/80">Still reading? Take your time. 👀</p></div></div>;
}

/* ─── Magnetic ──────────────────────────────────────────────────────────────── */
function Magnetic({children}:{children:React.ReactNode}) {
  const ref=useRef<HTMLDivElement>(null);
  const mv=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{ if(!ref.current)return; const r=ref.current.getBoundingClientRect(); const x=(e.clientX-(r.left+r.width/2))*0.28; const y=(e.clientY-(r.top+r.height/2))*0.28; ref.current.style.transition="transform 0.08s ease"; ref.current.style.transform=`translate(${x}px,${y}px)`; },[]);
  const lv=useCallback(()=>{ if(!ref.current)return; ref.current.style.transition="transform 0.45s cubic-bezier(0.34,1.56,0.64,1)"; ref.current.style.transform="translate(0,0)"; },[]);
  return <div ref={ref} onMouseMove={mv} onMouseLeave={lv}>{children}</div>;
}

/* ─── AnimatedDivider ───────────────────────────────────────────────────────── */
function AnimatedDivider() {
  const path=useRef<SVGPathElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!path.current)return; const obs=new IntersectionObserver((entries)=>{ if(entries[0].isIntersecting){path.current!.classList.add("drawn");obs.disconnect();} },{threshold:0.6}); obs.observe(path.current); return ()=>obs.disconnect(); },[pref]);
  return <div className="shell py-1" aria-hidden><svg width="100%" height="16" viewBox="0 0 1000 16" preserveAspectRatio="none" fill="none"><path ref={path} d="M0 8 C125 0 250 16 375 8 C500 0 625 16 750 8 C875 0 1000 16 1000 8" stroke="rgba(0,113,227,0.2)" strokeWidth="1" className="svg-draw"/></svg></div>;
}

/* ─── Ticker ────────────────────────────────────────────────────────────────── */
const TICKER=[
  "🏆 1st Place — Tacos & Tech-ila","💰 $1,000 Prize — Microsoft","🥇 1st Place — Borderland AI Hackathon",
  "🏅 Innovator Award — STTE","🎓 NSF S-STEM Scholar","🔬 Bloomberg Tech Lab '25 & '26",
  "💻 Dell Tech Academy","✨ Disney College Program","📊 GPA 3.86 / 4.0",
  "⚡ 100+ Issues Resolved","🎯 ColorStack Technical Officer","🌱 GDG on Campus Mentor",
  "🚀 Break Through Tech AI 2026","🤝 Pioneers 21 Incubator Intern",
];
function AchievementsTicker() {
  const d=[...TICKER,...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.01] py-4">
      <div className="marquee-inner items-center gap-12">
        {d.map((item,i)=>(<span key={i} className="flex shrink-0 items-center gap-12"><span className="whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.34em] text-white/50">{item}</span><span className="text-white/16 select-none">◆</span></span>))}
      </div>
    </div>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────────────────── */
function PortfolioNav() {
  const active=useActiveSection(navItems.map(i=>i.id));
  useEffect(()=>{ const h=(e:MouseEvent)=>{ const a=(e.target as HTMLElement).closest("a[data-scroll='true']") as HTMLAnchorElement|null; if(!a)return; e.preventDefault(); const id=a.getAttribute("href")?.replace("#",""); document.getElementById(id??"")?.scrollIntoView({behavior:"smooth",block:"start"}); }; document.addEventListener("click",h); return ()=>document.removeEventListener("click",h); },[]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 md:px-6 md:py-4">
      <div className="shell glass-panel flex items-center gap-3 px-4 py-3 md:px-6 md:py-3.5">
        <a href="#hero" data-scroll="true" className="flex min-w-0 shrink-0 items-center gap-3">
          <span className="ig-badge flex h-10 w-10 items-center justify-center rounded-full border text-[0.78rem] font-bold tracking-[0.28em] text-white/90">{profile.initials}</span>
          <div className="min-w-0 hidden sm:block">
            <p className="truncate text-sm font-semibold tracking-[0.16em] text-white">{profile.name}</p>
            <p className="text-[0.68rem] text-white/36">El Paso · UTEP · CS + Entrepreneurship</p>
          </div>
        </a>
        <nav className="no-scrollbar hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto rounded-full border border-white/8 bg-white/[0.02] p-1 lg:flex">
          {navItems.map(item=>(
            <a key={item.id} href={`#${item.id}`} data-scroll="true" className={cn("shrink-0 rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition duration-200 xl:px-3.5",active===item.id?"bg-white/[0.10] text-white":"text-white/45 hover:text-white/80")}>{item.label}</a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Magnetic><a href={`mailto:${profile.email}`} className="secondary-button whitespace-nowrap text-[0.8rem]">Email</a></Magnetic>
          <Magnetic><div className="cta-ring"><a href="#contact" data-scroll="true" className="primary-button whitespace-nowrap text-[0.8rem]">{profile.primaryCta}</a></div></Magnetic>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── HERO ──────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{
    if(pref||!secRef.current)return;
    const ctx=gsap.context(()=>{
      gsap.from("[data-hero-left] > *",{y:40,opacity:0,duration:1.1,stagger:0.11,ease:"power3.out",delay:0.15});
      gsap.from("[data-hero-right] > *",{y:30,opacity:0,scale:0.96,duration:1.2,stagger:0.12,ease:"power3.out",delay:0.3});
    },secRef);
    return ()=>ctx.revert();
  },[pref]);

  return (
    <section id="hero" ref={secRef} className="relative min-h-screen scroll-mt-0 overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Giant background name */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 select-none overflow-hidden">
        <p className="feat-num whitespace-nowrap text-center" style={{fontSize:"clamp(4rem,18vw,16rem)"}}>IMANOL</p>
      </div>

      <div className="shell relative z-10 grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
        {/* Left */}
        <div data-hero-left className="space-y-7 pt-6 md:space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="live-dot" />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[var(--color-green)]">Available · Building</span>
          </div>
          <h1 className="headline-xl text-balance gradient-headline">{profile.hero.title}</h1>
          <p className="copy-lg max-w-xl text-balance">{profile.hero.subtitle}</p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {n:"3.86",label:"GPA / 4.0",color:"text-[var(--color-accent)]"},
              {n:"2×",label:"Hackathon 1st",color:"text-[var(--color-orange)]"},
              {n:"100+",label:"Issues resolved",color:"text-[var(--color-green)]"},
            ].map(s=>(
              <div key={s.label} className="dark-card px-4 py-4 md:px-5 md:py-5">
                <p className={cn("mega-stat-num",s.color)}>{s.n}</p>
                <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.32em] text-white/36">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Magnetic><div className="cta-ring"><a href="#projects" data-scroll="true" className="primary-button">View the work <ArrowRight className="ml-2 h-4 w-4"/></a></div></Magnetic>
            <Magnetic><a href="#activity" data-scroll="true" className="secondary-button">What&rsquo;s active now</a></Magnetic>
          </div>

          {/* Float badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["NSF S-STEM Scholar","Bloomberg Tech Lab","Disney CP","Break Through Tech AI"].map(b=>(
              <span key={b} className="float-badge text-white/70">{b}</span>
            ))}
          </div>
        </div>

        {/* Right — photo collage */}
        <div data-hero-right className="grid grid-cols-2 gap-3">
          <div className="story-card col-span-2 aspect-[16/9] md:aspect-[16/8]">
            <Image src="/imanolpic2.png.jpeg" alt="Imanol Galvan" fill priority className="object-cover object-top" sizes="(max-width:1024px) 100vw, 46vw"/>
            <div className="absolute inset-x-5 bottom-5 z-10">
              <div className="flex flex-wrap gap-1.5">
                <span className="pill pill-blue">Software</span>
                <span className="pill pill-orange">Founder</span>
                <span className="pill pill-green">Leader</span>
              </div>
              <p className="mt-2.5 text-base font-semibold text-white/90 leading-6">
                Builder, mentor, officer — turning ideas into execution in public.
              </p>
            </div>
          </div>
          <div className="story-card aspect-[4/5]">
            <Image src="/speaking.jpg" alt="P21 VMS Pitch Challenge" fill className="object-cover object-center" sizes="25vw"/>
            <div className="absolute inset-x-3 bottom-3 z-10">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/45">P21 Pitch Challenge</p>
              <p className="mt-1 text-sm text-white/80">Presenting STAR at the 3rd Annual P21 VMS Pitch Challenge.</p>
            </div>
          </div>
          <div className="dark-card accent-card-orange flex flex-col justify-between p-5">
            <Trophy className="h-7 w-7 text-[var(--color-orange)]"/>
            <div>
              <p className="text-2xl font-bold text-[var(--color-orange)]">$1,000</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-white/50">Microsoft Prize</p>
              <p className="mt-2 text-xs text-white/60">Tacos & Tech-ila pitch competition — STAR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="shell mt-12 flex items-center gap-3">
        <div className="scroll-bounce text-white/28"><ArrowDown className="h-4 w-4" strokeWidth={1.5}/></div>
        <span className="text-[0.58rem] uppercase tracking-[0.42em] text-white/24">Scroll</span>
      </div>
    </section>
  );
}

/* ─── WINS STRIP ────────────────────────────────────────────────────────────── */
function WinsStrip() {
  const wins=[
    {emoji:"🥇",title:"1st Place",sub:"Tacos & Tech-ila · $1,000",color:"accent-card-orange"},
    {emoji:"🥇",title:"1st Place",sub:"Borderland AI Hackathon",color:"accent-card-orange"},
    {emoji:"🏅",title:"Innovator Award",sub:"STTE Foundation",color:"accent-card-purple"},
    {emoji:"🎓",title:"NSF S-STEM Scholar",sub:"Federal scholarship",color:"accent-card-blue"},
    {emoji:"🥉",title:"3rd Place",sub:"Miner Tank — Black Box",color:"accent-card-green"},
    {emoji:"🥉",title:"3rd Place",sub:"Steele Consulting Hackathon",color:"accent-card-green"},
    {emoji:"🔬",title:"Bloomberg Tech Lab",sub:"'25 & '26 participant",color:"accent-card-blue"},
    {emoji:"🚀",title:"Break Through Tech AI",sub:"2026–2027 cohort",color:"accent-card-purple"},
  ];
  return (
    <section className="py-10 md:py-14">
      <div className="shell space-y-5">
        <div className="flex items-center gap-3">
          <span className="live-dot"/>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[var(--color-green)]">Recognition & wins</span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          {wins.map(w=>(
            <div key={w.title+w.sub} className={cn("dark-card",w.color,"px-4 py-4")}>
              <span className="text-2xl">{w.emoji}</span>
              <p className="mt-3 text-sm font-bold text-white">{w.title}</p>
              <p className="mt-1 text-[0.65rem] text-white/50">{w.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ACTIVITY (Now) ────────────────────────────────────────────────────────── */
function ActivitySection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{
    if(pref||!secRef.current)return;
    const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:32,duration:0.85,stagger:0.08,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef);
    return ()=>ctx.revert();
  },[pref]);

  return (
    <section id="activity" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell space-y-10">
        <div className="flex items-start justify-between gap-6" data-reveal>
          <div>
            <div className="flex items-center gap-2 mb-4"><span className="live-dot"/><span className="section-kicker">01 — Now</span></div>
            <h2 className="headline-lg max-w-3xl text-balance">Active, moving, and building in public.</h2>
            <p className="copy-lg mt-5 max-w-2xl">The strongest signal across every week is consistency — workshops, pitches, founder programs, outreach, and technical work keep stacking up.</p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid gap-3 md:grid-cols-12 md:auto-rows-[11rem]" data-reveal>
          {/* Featured first item — tall */}
          {recentFieldNotes[0] && (
            <article className="dark-card accent-card-blue col-span-12 flex flex-col justify-between px-6 py-6 md:col-span-5 md:row-span-2 md:py-7">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="pill pill-blue">{recentFieldNotes[0].period}</span>
                </div>
                <h3 className="text-2xl font-bold text-white md:text-3xl">{recentFieldNotes[0].title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{recentFieldNotes[0].summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">{recentFieldNotes[0].tags.map(t=><span key={t} className="pill pill-blue">{t}</span>)}</div>
            </article>
          )}

          {/* Photo card */}
          <div className="story-card col-span-12 md:col-span-4 md:row-span-2">
            <Image src="/hackathon-coding.jpg" alt="Building at the STTE Sandbox" fill className="object-cover object-center" sizes="(max-width:768px) 100vw, 30vw"/>
            <div className="absolute inset-x-4 bottom-4 z-10">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/45">STTE Sandbox · Pioneers 21</p>
              <p className="mt-1.5 text-sm text-white/80">Working on STAR at the co-working space. Good environment to focus.</p>
            </div>
          </div>

          {/* Stats card */}
          <article className="dark-card col-span-12 flex items-center gap-6 px-6 py-5 md:col-span-3">
            <Zap className="h-8 w-8 shrink-0 text-[var(--color-orange)]"/>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/34">Currently active</p>
              <p className="mt-1 text-base font-bold text-white">4 parallel builds</p>
            </div>
          </article>

          {/* Remaining activity items */}
          {recentFieldNotes.slice(1,5).map((item,i)=>(
            <article key={item.title} className={cn("dark-card px-5 py-5 flex flex-col justify-between", i<2?"col-span-12 md:col-span-6":"col-span-12 md:col-span-6")} data-reveal>
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.3em] text-white/30">{item.period}</p>
                <h3 className="mt-2.5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">{item.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">{item.tags.map(t=><span key={t} className="pill pill-white">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── IDENTITY ──────────────────────────────────────────────────────────────── */
function IdentitySection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:30,duration:0.85,stagger:0.1,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="identity" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:gap-14">
          <div className="space-y-8" data-reveal>
            <div>
              <span className="section-kicker"><ScrambleText text="02 — Identity"/></span>
              <h2 className="headline-lg text-balance mt-2">More than an about section. A direction.</h2>
              <p className="copy-lg mt-5">UTEP computer science student, NSF S-STEM Scholar, and builder shaped by code, startup ecosystems, mentorship, service, and long-range ambition.</p>
            </div>
            {/* Portrait + quote */}
            <div className="story-card aspect-[4/5] max-w-xs" data-reveal>
              <Image src="/imanol.png" alt="In the room" fill className="object-cover object-center" sizes="(max-width:768px) 100vw, 22vw"/>
              <div className="absolute inset-x-4 bottom-4 z-10">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">What ties it together</p>
                <p className="mt-2 text-sm leading-6 text-white/80">Software is one part. Leadership, pitching, mentorship, and showing up in harder rooms complete the picture.</p>
              </div>
            </div>
            {/* Second photo — ML workshop */}
            <div className="photo-card aspect-[4/3] max-w-xs" data-reveal>
              <Image src="/teaching-ml.jpg" alt="ColorStack ML workshop" fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 22vw"/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,7,11,0.88)_100%)]"/>
              <div className="absolute bottom-3 left-4 z-10">
                <span className="pill pill-blue text-[0.58rem]">ColorStack at UTEP</span>
                <p className="mt-1.5 text-xs text-white/75">Presented on supervised and unsupervised learning with Monet Nevarez.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-0 lg:pt-8" data-reveal>
            {identityMoments.map((s,i)=>(
              <div key={i} className="dark-card px-6 py-6 md:px-7 md:py-7">
                <p className="text-[0.6rem] uppercase tracking-[0.36em] text-[var(--color-accent)]">0{i+1}</p>
                <p className="mt-4 text-xl font-semibold leading-[1.4] tracking-[-0.02em] text-white/88 md:text-2xl">{s}</p>
              </div>
            ))}
            <div className="dark-card accent-card-green px-6 py-5 flex items-center gap-4" data-reveal>
              <MapPin className="h-5 w-5 shrink-0 text-[var(--color-green)]"/>
              <p className="text-sm text-white/70">Based in El Paso, TX. Building technology that travels beyond borders.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────────────────────── */
const PROJECT_COLORS=["accent-card-blue","accent-card-orange","accent-card-green","accent-card-purple","accent-card-pink"] as const;
const PROJECT_PILL_COLORS=["pill-blue","pill-orange","pill-green","pill-purple","pill-pink"] as const;

function ProjectsSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.utils.toArray<HTMLElement>(".proj-item").forEach(el=>{ gsap.from(el.querySelectorAll("[data-reveal]"),{opacity:0,y:28,duration:0.85,stagger:0.08,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 72%"}}); }); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="projects" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell space-y-5">
        <div data-reveal>
          <span className="section-kicker"><ScrambleText text="03 — Projects"/></span>
          <h2 className="headline-lg max-w-3xl text-balance mt-2">Built around real traction, real users, real direction.</h2>
          <p className="copy-lg mt-5 max-w-2xl">From pitch-winning AI products to systems labs and current ventures — each project marks a deliberate step.</p>
        </div>

        <div className="space-y-5 pt-4">
          {featuredProjects.map((p,i)=>(
            <article key={p.title} className={cn("proj-item dark-card",PROJECT_COLORS[i%5],"overflow-visible px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10")}>
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
                {/* Copy */}
                <div className={cn("space-y-5",i%2===1&&"lg:order-2")} data-reveal>
                  <div className="flex items-center gap-4">
                    <span className="project-index">{String(i+1).padStart(2,"0")}</span>
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={cn("pill",PROJECT_PILL_COLORS[i%5])}>{p.category}</span>
                        <span className="pill pill-white">{p.role}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">{p.title}</h3>
                  <p className="text-lg leading-8 text-white/80 font-medium">{p.tagline}</p>
                  <p className="text-[0.95rem] leading-7 text-white/65 max-w-xl">{p.description}</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="dark-card px-4 py-4">
                      <p className="text-[0.58rem] uppercase tracking-[0.36em] text-white/28">Stack</p>
                      <p className="mt-2 text-sm leading-6 text-white/65">{p.stack.join(" · ")}</p>
                    </div>
                    <div className="dark-card px-4 py-4">
                      <p className="text-[0.58rem] uppercase tracking-[0.36em] text-white/28">Impact</p>
                      <p className="mt-2 text-sm leading-6 text-white/65">{p.impact}</p>
                    </div>
                  </div>
                </div>
                {/* Visual */}
                {i === 1 ? (
                  <div className={cn("story-card min-h-[22rem] md:min-h-[28rem]",i%2===1&&"lg:order-1")} data-reveal>
                    <Image src="/black-box-pitch.jpg" alt="Black Box pitch at Miner Tank" fill className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw"/>
                    <div className="absolute inset-x-5 bottom-5 z-10">
                      <div className="flex flex-wrap gap-1.5 mb-2">{p.accents.map(a=><span key={a} className={cn("pill",PROJECT_PILL_COLORS[i%5])}>{a}</span>)}</div>
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">Miner Tank · GDG on Campus: UTEP</p>
                      <p className="mt-1 text-sm font-semibold text-white/90">Pitched at Miner Tank — 3rd place.</p>
                    </div>
                  </div>
                ) : (
                  <div className={cn("dark-card min-h-[22rem] flex flex-col justify-between p-7 md:min-h-[28rem]",i%2===1&&"lg:order-1")} data-reveal>
                    <div className="flex flex-wrap gap-2">{p.accents.map(a=><span key={a} className={cn("pill",PROJECT_PILL_COLORS[i%5])}>{a}</span>)}</div>
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.36em] text-white/30">Project note</p>
                      <p className="mt-3 text-2xl font-bold leading-[1.15] tracking-[-0.04em] text-white/88 md:text-3xl">{p.tagline}</p>
                    </div>
                    <div className="h-px w-full bg-white/[0.06]"/>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/25">{p.category} · {p.role}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MOMENTUM ──────────────────────────────────────────────────────────────── */
function MomentumSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:30,duration:0.8,stagger:0.07,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="momentum" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell space-y-10">
        <div data-reveal>
          <span className="section-kicker"><ScrambleText text="04 — Momentum"/></span>
          <h2 className="headline-lg max-w-3xl text-balance mt-2">Not a static portfolio. Active momentum.</h2>
          <p className="copy-lg mt-5 max-w-2xl">Build, support, test, show up, learn, repeat. The pattern has been consistent for two years.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal>
          {currentMomentum.building.map((item,i)=>(
            <article key={item.title} className={cn("dark-card px-5 py-5",i===0?"accent-card-green":i===1?"accent-card-blue":i===2?"accent-card-orange":"accent-card-purple")}>
              <div className="mb-3"><span className="live-dot"/></div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3" data-reveal>
          <article className="dark-card px-6 py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.36em] text-white/30">Currently learning</p>
            <div className="mt-4 space-y-2">
              {currentMomentum.learning.map(l=><div key={l} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/65">{l}</div>)}
            </div>
          </article>
          <article className="dark-card px-6 py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.36em] text-white/30">Traction signals</p>
            <div className="mt-4 space-y-2">
              {currentMomentum.traction.slice(0,6).map(t=><div key={t} className="flex items-center gap-2 text-sm text-white/65"><span className="text-[var(--color-orange)]">→</span>{t}</div>)}
            </div>
          </article>
          <article className="dark-card px-6 py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.36em] text-white/30">How I build</p>
            <div className="mt-4 space-y-2">
              {currentMomentum.operatingSystem.map(o=><div key={o} className="flex items-start gap-2 text-sm leading-6 text-white/65"><span className="mt-0.5 shrink-0 text-[var(--color-accent)]">·</span>{o}</div>)}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ─── JOURNEY ───────────────────────────────────────────────────────────────── */
function JourneySection() {
  const secRef=useRef<HTMLElement>(null); const svgPath=useRef<SVGPathElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{
    if(pref||!secRef.current)return;
    const ctx=gsap.context(()=>{
      gsap.from("[data-reveal]",{opacity:0,y:40,duration:0.9,stagger:0.1,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 70%"}});
      if(svgPath.current){ const len=svgPath.current.getTotalLength(); gsap.set(svgPath.current,{strokeDasharray:len,strokeDashoffset:len}); gsap.to(svgPath.current,{strokeDashoffset:0,ease:"none",scrollTrigger:{trigger:secRef.current,start:"top 55%",end:"bottom 85%",scrub:1}}); }
    },secRef);
    return ()=>ctx.revert();
  },[pref]);

  return (
    <section id="journey" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell space-y-10">
        <div data-reveal>
          <span className="section-kicker"><ScrambleText text="05 — Journey"/></span>
          <h2 className="headline-lg max-w-3xl text-balance mt-2">Growth measured through action, not waiting.</h2>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
          {/* SVG line */}
          <div className="hidden lg:block w-8 relative">
            <svg className="absolute h-full w-4 left-2" viewBox="0 0 16 1000" preserveAspectRatio="none" fill="none">
              <line x1="8" y1="0" x2="8" y2="1000" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <path ref={svgPath} d="M8 0 L8 1000" stroke="rgba(0,113,227,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="space-y-4">
            {journey.map((item,i)=>(
              <article key={item.title} className="relative dark-card overflow-hidden px-6 py-6 md:px-8 md:py-7" data-reveal>
                {/* Big year in bg */}
                <div aria-hidden className="pointer-events-none absolute right-4 top-0 feat-num select-none opacity-100" style={{fontSize:"clamp(4rem,10vw,8rem)"}}>{item.year.slice(0,4)}</div>
                <div className="relative z-10 grid gap-4 md:grid-cols-[9rem_1fr] md:gap-8">
                  <div>
                    <span className={cn("pill text-[0.6rem]",i===0?"pill-green":i===1?"pill-blue":i===2?"pill-orange":"pill-purple")}>{item.year}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white md:text-3xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/65 max-w-3xl">{item.description}</p>
                    <p className="mt-4 text-[0.62rem] uppercase tracking-[0.3em] text-white/28">{item.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ────────────────────────────────────────────────────────────── */
function ExperienceSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:30,duration:0.85,stagger:0.08,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="experience" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell space-y-10">
        <div data-reveal>
          <span className="section-kicker"><ScrambleText text="06 — Experience"/></span>
          <h2 className="headline-lg max-w-3xl text-balance mt-2">Real roles, real responsibility, visible execution.</h2>
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4" data-reveal>
          {[
            {src:"/teaching-ml.jpg",label:"ColorStack · ML Workshop"},
            {src:"/hackathon-win.jpg",label:"Tacos & Tech-ila · 1st Place"},
            {src:"/gdg-event.jpg",label:"GDG on Campus · UTEP"},
            {src:"/science-floor.jpg",label:"Insights Science Discovery"},
          ].map(ph=>(
            <div key={ph.src} className="photo-card aspect-[3/4]">
              <Image src={ph.src} alt={ph.label} fill className="object-cover object-center" sizes="(max-width:768px) 50vw, 25vw"/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,7,11,0.82)_100%)]"/>
              <p className="absolute bottom-3 left-4 text-[0.58rem] uppercase tracking-[0.32em] text-white/50">{ph.label}</p>
            </div>
          ))}
        </div>

        {/* Featured role card with image */}
        <article className="dark-card overflow-hidden" data-reveal>
          <div className="grid lg:grid-cols-[0.55fr_0.45fr]">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[20rem]">
              <Image src="/insights.png" alt="INSIGHTS Science Discovery" fill className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw"/>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(10,12,18,0.95)_100%)] hidden lg:block"/>
            </div>
            <div className="px-7 py-7 md:px-8 md:py-8 flex flex-col justify-center gap-4">
              <span className="pill pill-green w-fit">Spring 2026 – Present</span>
              <h3 className="text-3xl font-bold text-white">STEAM Intern</h3>
              <p className="text-sm uppercase tracking-[0.28em] text-white/38">Insights Science Discovery</p>
              <p className="text-sm leading-7 text-white/65">Web design, digital content, analytics, outreach systems, and event support across SCRSEF, Science on Screen, DinoTracks, and STEAM programs.</p>
              <div className="flex flex-wrap gap-1.5"><span className="pill pill-green">Web</span><span className="pill pill-green">Content</span><span className="pill pill-green">Analytics</span><span className="pill pill-green">STEAM</span></div>
            </div>
          </div>
        </article>

        <div className="grid gap-4 xl:grid-cols-2" data-reveal>
          {professionalExperience.slice(1).map(item=>(
            <article key={`${item.role}-${item.organization}`} className="dark-card px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/30">{item.period}</p>
              <h3 className="mt-2.5 text-2xl font-bold text-white">{item.role}</h3>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.28em] text-white/36">{item.organization}</p>
              <p className="mt-4 text-sm leading-7 text-white/65">{item.description}</p>
              <div className="mt-4 space-y-2">{item.highlights.map(h=><div key={h} className="flex items-start gap-2 text-sm text-white/55"><span className="mt-0.5 shrink-0 text-[var(--color-accent)]">→</span>{h}</div>)}</div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal>
          {leadershipRoles.map(item=>(
            <article key={`${item.organization}-${item.role}`} className="dark-card px-5 py-5">
              <p className="text-[0.58rem] uppercase tracking-[0.32em] text-[var(--color-accent)]">{item.organization}</p>
              <h3 className="mt-2 text-lg font-bold text-white">{item.role}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CAPABILITIES ──────────────────────────────────────────────────────────── */
const CAP_COLORS=["pill-blue","pill-orange","pill-green","pill-purple","pill-pink","pill-blue"] as const;
function CapabilitiesSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:28,duration:0.8,stagger:0.07,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="capabilities" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell space-y-10">
        <div className="text-center" data-reveal>
          <span className="section-kicker"><ScrambleText text="07 — Capabilities"/></span>
          <h2 className="headline-lg text-balance mt-2">A stack built by engineering, initiative, and product ambition.</h2>
          <p className="copy-lg mx-auto mt-5">Technical execution, AI experimentation, mentorship, leadership, and startup thinking.</p>
        </div>

        {/* Skill marquee strip */}
        <div className="relative overflow-hidden border-y border-white/[0.07] py-3.5" data-reveal>
          <div className="marquee-inner marquee-fast items-center gap-8">
            {[...capabilityGroups.flatMap(g=>g.items),...capabilityGroups.flatMap(g=>g.items)].map((item,i)=>(
              <span key={i} className="pill pill-white shrink-0">{item}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal>
          {capabilityGroups.map((group,i)=>(
            <article key={group.title} className="dark-card px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/28">{group.title}</p>
              <p className="mt-3 text-[0.95rem] leading-7 text-white/70">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map(item=><span key={item} className={cn("pill",CAP_COLORS[i%6])}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BEYOND ────────────────────────────────────────────────────────────────── */
function BeyondSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:28,duration:0.8,stagger:0.08,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="beyond" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
          <div className="space-y-6" data-reveal>
            <span className="section-kicker"><ScrambleText text="08 — Beyond Code"/></span>
            <h2 className="headline-lg text-balance mt-2">The human side changes how I build.</h2>
            <p className="copy-lg">Service, mentorship, performance, sports, and creative work shape how I lead, communicate, and stay grounded.</p>
            <div className="story-card aspect-[3/4]">
              <Image src="/disney-castle.jpg" alt="Disney College Program certificate night at Magic Kingdom" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 28vw"/>
              <div className="absolute inset-x-4 bottom-4 z-10">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">Magic Kingdom · DCP Certificate</p>
                <p className="mt-1.5 text-sm leading-6 text-white/80">Certificate night at Magic Kingdom. One of the most meaningful experiences I've had.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 content-start" data-reveal>
            {/* Disney photo card — spans full width */}
            <div className="photo-card col-span-2 aspect-[16/7] md:aspect-[16/6]">
              <Image src="/disney-university.jpg" alt="Disney University — first day, Earning My Ears" fill className="object-cover object-center" sizes="(max-width:768px) 100vw, 55vw"/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,7,11,0.85)_100%)]"/>
              <div className="absolute bottom-4 left-5 z-10">
                <p className="text-[0.58rem] uppercase tracking-[0.3em] text-white/45">Disney University · Orlando, FL</p>
                <p className="mt-1 text-sm text-white/80 font-medium">First day of the Disney College Program. Magic Kingdom operations.</p>
              </div>
            </div>
            {beyondCode.map((item,i)=>(
              <article key={item.title} className={cn("dark-card px-5 py-5",i===0?"accent-card-purple":i===1?"accent-card-pink":i===2?"accent-card-orange":"")}>
                <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/28">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>
              </article>
            ))}
            {/* Minitec — community kids program */}
            <div className="photo-card aspect-[4/3]">
              <Image src="/disney-costume.jpg" alt="Minitec community program with kids" fill className="object-cover object-center" sizes="(max-width:768px) 50vw, 27vw"/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,7,11,0.9)_100%)]"/>
              <div className="absolute bottom-3 left-4 z-10">
                <p className="text-[0.58rem] uppercase tracking-[0.3em] text-white/45">Minitec · Community</p>
                <p className="mt-1 text-xs text-white/75">Part of Minitec — a program I've been involved with for years. These kids changed me.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── VISION ────────────────────────────────────────────────────────────────── */
function VisionSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:32,duration:0.9,stagger:0.1,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="vision" ref={secRef} className="section-frame scroll-mt-24">
      <div className="shell">
        <div className="dark-card accent-card-blue overflow-hidden px-6 py-14 md:px-10 md:py-18 lg:px-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
            <div className="space-y-6" data-reveal>
              <span className="section-kicker"><ScrambleText text="09 — Vision"/></span>
              <h2 className="headline-lg text-balance mt-2">Movement, experimentation, becoming.</h2>
              <p className="copy-lg max-w-sm">The mindset underneath the resume — how I think about action, growth, risk, and building a life with intention.</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {philosophyHighlights.map(l=><span key={l} className="pill pill-blue">{l}</span>)}
              </div>
            </div>
            <div className="space-y-5" data-reveal>
              {philosophyManifesto.map(line=>(
                <div key={line} className="pull-quote">
                  <p className="text-[1.05rem] leading-8 text-white/82 md:text-[1.15rem] md:leading-9">{line}</p>
                </div>
              ))}
              <div className="grid gap-3 md:grid-cols-2 pt-4">
                {messageAndImpact.map(item=>(
                  <article key={item.title} className="dark-card px-5 py-5">
                    <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/28">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/68">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────────────────── */
function ContactSection() {
  const secRef=useRef<HTMLElement>(null); const pref=usePrefersReducedMotion();
  useEffect(()=>{ if(pref||!secRef.current)return; const ctx=gsap.context(()=>{ gsap.from("[data-reveal]",{opacity:0,y:30,duration:0.85,stagger:0.08,ease:"power3.out",scrollTrigger:{trigger:secRef.current,start:"top 72%"}}); },secRef); return ()=>ctx.revert(); },[pref]);

  return (
    <section id="contact" ref={secRef} className="section-frame scroll-mt-24 pb-16 md:pb-24">
      <div className="shell">
        {/* Big CTA panel */}
        <div className="dark-card accent-card-blue overflow-hidden px-8 py-14 text-center md:px-14 md:py-20" data-reveal>
          <p className="section-kicker justify-center"><ScrambleText text="10 — Contact"/></p>
          <h2 className="headline-xl gradient-headline mx-auto max-w-4xl text-balance mt-4">Let&rsquo;s build something that matters.</h2>
          <p className="copy-lg mx-auto mt-6 max-w-xl text-balance">{profile.availability}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <Magnetic><div className="cta-ring"><a href={`mailto:${profile.email}`} className="primary-button text-base px-8 py-4">{profile.primaryCta}</a></div></Magnetic>
            <Magnetic><a href="#hero" data-scroll="true" className="secondary-button text-base px-8 py-4">Back to top</a></Magnetic>
          </div>
        </div>

        {/* Info grid */}
        <div className="mt-5 grid gap-4 md:grid-cols-3" data-reveal>
          <article className="dark-card px-6 py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/28">Direct</p>
            <a href={`mailto:${profile.email}`} className="mt-4 flex items-center gap-2 text-base text-white/80 transition hover:text-[var(--color-accent)]"><Mail className="h-4 w-4"/>{profile.email}</a>
            <p className="mt-2 text-sm text-white/45">{profile.phone}</p>
            <p className="mt-1 text-sm text-white/45">{profile.location}</p>
          </article>
          <article className="dark-card px-6 py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/28">Education</p>
            <p className="mt-4 text-base font-bold text-white/85">{profile.education.school}</p>
            <p className="mt-2 text-sm leading-7 text-white/55">{profile.education.degree} · {profile.education.minor} · {profile.education.graduation}</p>
          </article>
          <article className="dark-card px-6 py-6">
            <p className="text-[0.6rem] uppercase tracking-[0.34em] text-white/28">Elsewhere</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map(s=>{
                const icon=s.label==="Email"?<Mail className="h-3.5 w-3.5"/>:s.label==="LinkedIn"?<Linkedin className="h-3.5 w-3.5"/>:s.label==="GitHub"?<Github className="h-3.5 w-3.5"/>:null;
                return (<a key={s.label} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel={s.href.startsWith("http")?"noreferrer":undefined} className="secondary-button gap-2 text-[0.8rem]">{icon}{s.label}</a>);
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.07] pb-10 pt-8 md:pb-14">
      <div className="shell flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-white/65">{profile.name}</p>
          <p className="mt-1 text-[0.68rem] text-white/22">Built with ambition · {new Date().getFullYear()}</p>
        </div>
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/16">Right-click · ↑↑↓↓←→←→ba · Come back 👋</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 md:justify-end">
          {socialLinks.map(s=>(<a key={s.label} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel={s.href.startsWith("http")?"noreferrer":undefined} className="text-[0.7rem] text-white/28 transition hover:text-white/60">{s.label}</a>))}
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────────────────── */
export default function PortfolioExperience() {
  const [konami,setKonami]=useState(false);

  useEffect(()=>{
    console.group("%c Imanol Galvan — Portfolio ","background:#0071e3;color:#fff;padding:4px 10px;border-radius:4px;font-weight:700;font-size:13px;");
    console.log("%cHey, curious developer. 👋","color:#0071e3;font-size:14px;font-weight:600;");
    console.log("%cYou found the console. I like you already.","color:rgba(245,247,251,0.75);font-size:12px;");
    console.log("%c→ igalvan6@miners.utep.edu","color:#0071e3;font-size:12px;font-weight:500;");
    console.groupEnd();
  },[]);

  useEffect(()=>{
    const title=document.title;
    const ob=()=>{document.title="Come back 👋 — Imanol";}; const of=()=>{document.title=title;};
    window.addEventListener("blur",ob); window.addEventListener("focus",of);
    return ()=>{ window.removeEventListener("blur",ob); window.removeEventListener("focus",of); };
  },[]);

  const triggerKonami=useCallback(()=>{ setKonami(true); setTimeout(()=>setKonami(false),3200); },[]);
  useKonamiCode(triggerKonami);

  return (
    <div className="relative">
      <Cursor/>
      <ScrollProgress/>
      <ClickBurst/>
      <ContextMenu/>
      <KonamiToast visible={konami}/>
      <IdleToast/>
      <PortfolioNav/>
      <main>
        <HeroSection/>
        <AchievementsTicker/>
        <WinsStrip/>
        <AnimatedDivider/>
        <ActivitySection/>
        <AnimatedDivider/>
        <IdentitySection/>
        <AnimatedDivider/>
        <ProjectsSection/>
        <AnimatedDivider/>
        <MomentumSection/>
        <AnimatedDivider/>
        <JourneySection/>
        <AnimatedDivider/>
        <ExperienceSection/>
        <AnimatedDivider/>
        <CapabilitiesSection/>
        <AnimatedDivider/>
        <BeyondSection/>
        <AnimatedDivider/>
        <VisionSection/>
        <AnimatedDivider/>
        <ContactSection/>
      </main>
      <Footer/>
    </div>
  );
}
