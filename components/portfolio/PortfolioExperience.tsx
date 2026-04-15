"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  capabilityGroups,
  beyondCode,
  currentMomentum,
  featuredProjects,
  identityMoments,
  journey,
  leadershipRoles,
  messageAndImpact,
  navItems,
  philosophyHighlights,
  philosophyManifesto,
  professionalExperience,
  profile,
  socialLinks,
  technicalBreakdown
} from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ─── Custom cursor ─────────────────────────────────────────────────────────── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      dotRef.current.style.opacity = "1";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={dotRef}
      style={{ opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
    />
  );
}

/* ─── Section divider ───────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="shell">
      <div className="h-px bg-white/[0.06]" />
    </div>
  );
}

/* ─── Section heading ───────────────────────────────────────────────────────── */
type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("relative z-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="headline-lg text-balance">{title}</h2>
      {description ? <p className="copy-lg mt-6 text-balance">{description}</p> : null}
    </div>
  );
}

/* ─── Project visual card ───────────────────────────────────────────────────── */
type ProjectVisualProps = {
  title: string;
  labels: string[];
};

function ProjectVisual({ title, labels }: ProjectVisualProps) {
  return (
    <div className="visual-shell min-h-[24rem] p-8 md:min-h-[34rem] md:p-10">
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/36">Project</p>
          <p className="mt-4 text-2xl font-semibold text-white md:text-3xl">{title}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {labels.map((label, index) => (
            <div
              key={label}
              className={cn(
                "rounded-2xl border border-white/8 px-4 py-5 transition-colors duration-200 hover:border-white/14",
                index === 0 ? "bg-white/[0.06]" : "bg-white/[0.03]"
              )}
            >
              <p className="text-[0.6rem] uppercase tracking-[0.36em] text-white/30">{index === 0 ? "Core" : "Layer"}</p>
              <p className="mt-3 text-sm font-medium text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero portrait ─────────────────────────────────────────────────────────── */
function HeroPortrait() {
  return (
    <div className="visual-shell relative min-h-[26rem] overflow-hidden md:min-h-[38rem]">
      <Image
        src="/imanolpic2.png.jpeg"
        alt="Portrait of Imanol Galvan"
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 46vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute inset-x-7 bottom-7 md:inset-x-8 md:bottom-8">
        <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/38">Builder in focus</p>
        <p className="mt-2 max-w-md text-lg font-semibold text-white/90 md:text-2xl">
          Software, AI, leadership, and founder ambition grounded in real execution.
        </p>
      </div>
    </div>
  );
}

/* ─── Navigation ────────────────────────────────────────────────────────────── */
function PortfolioNav() {
  const activeSection = useActiveSection(navItems.map((item) => item.id));

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a[data-scroll='true']") as HTMLAnchorElement | null;
      if (!anchor) return;
      event.preventDefault();
      const id = anchor.getAttribute("href")?.replace("#", "");
      const section = id ? document.getElementById(id) : null;
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 md:px-6 md:py-5">
      <div className="shell glass-panel flex items-center gap-3 px-4 py-3 md:px-6 md:py-4">
        <a href="#hero" data-scroll="true" className="flex min-w-0 shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold tracking-[0.3em] text-white/82 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08]">
            {profile.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.18em] text-white">{profile.name}</p>
            <p className="line-clamp-1 max-w-[15rem] text-xs text-white/40 xl:max-w-[18rem]">{profile.role}</p>
          </div>
        </a>

        <nav className="no-scrollbar hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full border border-white/8 bg-white/[0.02] p-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-scroll="true"
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-[0.8rem] font-medium transition duration-200 xl:px-4",
                activeSection === item.id
                  ? "bg-white/[0.10] text-white"
                  : "text-white/48 hover:text-white/80"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <a href={`mailto:${profile.email}`} className="secondary-button whitespace-nowrap text-[0.8rem]">
            Email
          </a>
          <a href="#contact" data-scroll="true" className="primary-button whitespace-nowrap text-[0.8rem]">
            {profile.primaryCta}
          </a>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white marker:hidden">
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-white/80 transition group-open:translate-y-[7px] group-open:rotate-45" />
              <span className="block h-px w-5 bg-white/80 transition group-open:opacity-0" />
              <span className="block h-px w-5 bg-white/80 transition group-open:-translate-y-[7px] group-open:-rotate-45" />
            </div>
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(18rem,calc(100vw-1.5rem))] rounded-[1.75rem] border border-white/10 bg-black/90 p-4 backdrop-blur-2xl">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-scroll="true"
                  className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-3 border-t border-white/8 pt-3">
              <a href={`mailto:${profile.email}`} className="primary-button w-full justify-center">
                {profile.primaryCta}
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current || !visualRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(contentRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.fromTo(
        visualRef.current,
        { scale: 0.92, y: 32, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.3 }
      );

      gsap.to(visualRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className="section-frame relative min-h-screen scroll-mt-28 overflow-hidden pb-16 pt-28 md:pt-36">
      <div className="shell grid items-end gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div ref={contentRef} className="relative z-10 space-y-7 md:space-y-9">
          <span className="section-kicker">{profile.hero.eyebrow}</span>
          <h1 className="headline-xl max-w-4xl text-balance">{profile.hero.title}</h1>
          <p className="copy-lg max-w-xl text-balance">{profile.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#projects" data-scroll="true" className="primary-button">
              View featured work
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#vision" data-scroll="true" className="secondary-button">
              See the direction
            </a>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-5 pt-2 md:pt-4">
            {profile.hero.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[0.58rem] uppercase tracking-[0.42em] text-white/32">{stat.label}</p>
                <p className="mt-1.5 text-[0.95rem] font-semibold text-white/80">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref={visualRef} className="relative lg:pb-8">
          <HeroPortrait />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="shell mt-16 flex items-center gap-3 md:mt-24">
        <div className="scroll-bounce text-white/28">
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <span className="text-[0.58rem] uppercase tracking-[0.42em] text-white/24">Scroll</span>
      </div>
    </section>
  );
}

/* ─── Identity ──────────────────────────────────────────────────────────────── */
function IdentitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(textRefs.current.filter(Boolean), {
        opacity: 0,
        y: 30,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="identity" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell grid gap-16 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10">
        <SectionHeading
          eyebrow="01 — Identity"
          title="Not an about box. A trajectory."
          description="UTEP computer science student. NSF S-STEM Scholar. Builder shaped by code, startup ecosystems, mentorship, service, and long-range ambition."
        />
        <div className="space-y-12 lg:space-y-20">
          {identityMoments.map((statement, index) => (
            <p
              key={statement}
              ref={(node) => { textRefs.current[index] = node; }}
              className="headline-md max-w-3xl border-l-[1.5px] border-[rgba(0,113,227,0.35)] pl-7 text-white/88"
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ──────────────────────────────────────────────────────────────── */
function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card) => {
        const mockup = card.querySelector(".project-mockup");
        const copy = card.querySelectorAll(".project-copy > *");

        gsap.fromTo(
          mockup,
          { y: 60, scale: 0.94, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 72%", end: "top 30%", scrub: true }
          }
        );

        gsap.from(Array.from(copy), {
          opacity: 0, y: 26, duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 68%" }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="projects" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12 md:space-y-20">
        <SectionHeading
          eyebrow="02 — Projects"
          title="Built around real traction, real users, and real direction."
          description="From pitch-winning AI products to systems labs, startup programs, and current venture ideas — each project marks a step toward building technology with strong human value."
        />
        <div className="space-y-6 md:space-y-8">
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className="project-card project-spotlight relative overflow-hidden rounded-[2rem] border px-5 py-6 md:px-8 md:py-8 lg:min-h-[44rem] lg:px-10 lg:py-10"
            >
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
                <div className={cn("project-copy order-2 space-y-5 lg:order-1", index % 2 === 1 && "lg:order-2")}>
                  <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.34em] text-white/34">
                    <span>{project.category}</span>
                    <span className="text-white/20">·</span>
                    <span>{project.role}</span>
                  </div>
                  <h3 className="headline-md max-w-2xl text-balance">{project.title}</h3>
                  <p className="max-w-2xl text-xl leading-8 text-white/80">{project.tagline}</p>
                  <p className="copy-lg max-w-2xl">{project.description}</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="glass-panel px-5 py-4">
                      <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Stack</p>
                      <p className="mt-3 text-sm leading-6 text-white/68">{project.stack.join(" · ")}</p>
                    </div>
                    <div className="glass-panel px-5 py-4">
                      <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Impact</p>
                      <p className="mt-3 text-sm leading-6 text-white/68">{project.impact}</p>
                    </div>
                  </div>
                </div>
                <div className={cn("project-mockup order-1 lg:order-2", index % 2 === 1 && "lg:order-1")}>
                  <ProjectVisual title={project.tagline} labels={project.accents} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Momentum ──────────────────────────────────────────────────────────────── */
function MomentumSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".momentum-card", {
        opacity: 0, y: 34, duration: 0.85, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="momentum" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12 md:space-y-16">
        <SectionHeading
          eyebrow="03 — Momentum"
          title="This is not a static portfolio. It reflects active momentum."
          description="The pattern is ongoing: build, support, test, show up, learn, repeat."
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {currentMomentum.building.map((item) => (
            <article key={item.title} className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Currently building</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-[0.95rem] leading-7 text-white/72">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Currently learning</p>
            <div className="mt-5 space-y-2">
              {currentMomentum.learning.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Traction and signals</p>
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              {currentMomentum.traction.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">How I build</p>
            <div className="mt-5 space-y-2">
              {currentMomentum.operatingSystem.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">{technicalBreakdown.title}</p>
            <p className="mt-4 text-[0.95rem] leading-7 text-white/72">{technicalBreakdown.intro}</p>
            <div className="mt-5 space-y-2">
              {technicalBreakdown.points.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ─── Journey ───────────────────────────────────────────────────────────────── */
function JourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".journey-card", {
        opacity: 0, y: 50, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      });

      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 80%", scrub: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="journey" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell">
        <SectionHeading
          eyebrow="04 — Journey"
          title="Growth measured through action, not waiting."
          description="Step in early, learn in public, build under pressure, mentor others, and keep compounding across technology, leadership, and entrepreneurship."
        />
        <div className="relative mt-14 grid gap-8 md:mt-20 lg:grid-cols-[0.12fr_0.88fr] lg:gap-12">
          <div className="relative hidden justify-center lg:flex">
            <div className="timeline-line h-full w-px rounded-full opacity-20" />
            <div className="timeline-progress timeline-line absolute top-0 h-full w-px rounded-full" />
          </div>
          <div className="space-y-5 md:space-y-6">
            {journey.map((item) => (
              <article key={item.title} className="journey-card glass-panel relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
                <div className="grid gap-5 md:grid-cols-[10rem_1fr] md:gap-8">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/36">{item.year}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">{item.title}</h3>
                    <p className="copy-lg mt-3 max-w-3xl">{item.description}</p>
                    <p className="mt-4 text-[0.65rem] uppercase tracking-[0.32em] text-white/30">{item.note}</p>
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

/* ─── Experience ────────────────────────────────────────────────────────────── */
function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".experience-card", {
        opacity: 0, y: 36, duration: 0.85, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
      gsap.from(".leadership-card", {
        opacity: 0, y: 28, duration: 0.75, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 58%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="experience" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12 md:space-y-16">
        <SectionHeading
          eyebrow="05 — Experience"
          title="Real roles, real responsibility, leadership that shows up in public."
          description="Leadership roles, operational work, student support, community service, and the environments where I have actually had to deliver."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {professionalExperience.map((item) => (
            <article key={`${item.role}-${item.organization}`} className="experience-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">{item.period}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{item.role}</h3>
              <p className="mt-1.5 text-sm uppercase tracking-[0.24em] text-white/36">{item.organization}</p>
              <p className="copy-lg mt-5 max-w-3xl">{item.description}</p>
              <div className="mt-5 space-y-2">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-[1.25rem] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white/68">
                    {highlight}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leadershipRoles.map((item) => (
            <article key={`${item.organization}-${item.role}`} className="leadership-card glass-panel px-6 py-6">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">{item.organization}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.role}</h3>
              <p className="mt-4 text-[0.95rem] leading-7 text-white/70">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Capabilities ──────────────────────────────────────────────────────────── */
function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".capability-card", {
        opacity: 0, y: 36, duration: 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="capabilities" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12">
        <SectionHeading
          eyebrow="06 — Capabilities"
          title="A stack shaped by engineering, initiative, and product ambition."
          description="Technical execution, AI experimentation, communication, mentorship, leadership, and startup thinking."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilityGroups.map((group) => (
            <article key={group.title} className="capability-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">{group.title}</p>
              <p className="mt-4 text-[1rem] leading-7 text-white/78">{group.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[0.8rem] text-white/60 transition-colors duration-150 hover:border-white/14 hover:text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Beyond code ───────────────────────────────────────────────────────────── */
function BeyondCodeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".beyond-card", {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="beyond" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12">
        <SectionHeading
          eyebrow="07 — Beyond"
          title="The human side matters because it changes how I build."
          description="Service, mentorship, performance, sports, and creative work shape how I lead, communicate, and stay grounded."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {beyondCode.map((item) => (
            <article key={item.title} className="beyond-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">{item.title}</p>
              <p className="mt-4 text-[0.95rem] leading-7 text-white/72">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Vision ────────────────────────────────────────────────────────────────── */
function VisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(phraseRefs.current.filter(Boolean), {
        opacity: 0, y: 36, stagger: 0.14, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="vision" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell rounded-[2.4rem] border border-white/8 bg-white/[0.02] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
          <div className="space-y-6">
            <span className="section-kicker">08 — Vision</span>
            <h2 className="headline-lg text-balance">A philosophy built around movement, experimentation, and becoming.</h2>
            <p className="copy-lg max-w-xl text-balance">
              The mindset underneath the resume lines: how I think about action, growth, risk, and building a life with intention.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {philosophyHighlights.map((line) => (
                <span key={line} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.8rem] text-white/60 transition-colors duration-150 hover:border-white/14 hover:text-white/80">
                  {line}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-10">
            <div className="space-y-8">
              {philosophyManifesto.map((line, index) => (
                <p
                  key={line}
                  ref={(node) => { phraseRefs.current[index] = node; }}
                  className="copy-lg max-w-4xl text-balance text-white/84 md:text-[1.2rem] md:leading-9"
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {messageAndImpact.map((item) => (
                <article key={item.title} className="glass-panel px-6 py-6">
                  <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">{item.title}</p>
                  <p className="mt-4 text-[0.95rem] leading-7 text-white/72">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ───────────────────────────────────────────────────────────────── */
function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0, y: 30, duration: 0.85, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="contact" ref={sectionRef} className="section-frame scroll-mt-28 pb-16 md:pb-24">
      <div className="shell glass-panel overflow-hidden px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_0.05fr_0.45fr] lg:items-end">
          <div className="space-y-6">
            <span className="contact-reveal section-kicker">09 — Contact</span>
            <h2 className="contact-reveal headline-lg max-w-4xl text-balance">
              I want to build technology companies and platforms that help people grow, adapt, and move forward.
            </h2>
            <p className="contact-reveal copy-lg max-w-2xl">{profile.availability}</p>
            <div className="contact-reveal flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="primary-button">{profile.primaryCta}</a>
              <a href="#hero" data-scroll="true" className="secondary-button">Back to top</a>
            </div>
          </div>
          <div className="hidden h-full w-px bg-white/8 lg:block" />
          <div className="space-y-7">
            <div className="contact-reveal">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Email</p>
              <a href={`mailto:${profile.email}`} className="mt-3 block text-xl font-semibold text-white transition-colors hover:text-[var(--color-accent)]">
                {profile.email}
              </a>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Phone</p>
              <a href="tel:+19156303282" className="mt-3 block text-lg text-white/70 transition-colors hover:text-[var(--color-accent)]">
                {profile.phone}
              </a>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Location</p>
              <p className="mt-3 text-lg text-white/70">{profile.location}</p>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Education</p>
              <p className="mt-3 text-[0.95rem] text-white/70">{profile.education.school}</p>
              <p className="mt-1.5 text-sm text-white/44">
                {profile.education.degree} · {profile.education.minor} · {profile.education.graduation}
              </p>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.6rem] uppercase tracking-[0.38em] text-white/30">Elsewhere</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="secondary-button text-[0.8rem]">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Root ──────────────────────────────────────────────────────────────────── */
export default function PortfolioExperience() {
  return (
    <div className="relative">
      <Cursor />
      <PortfolioNav />
      <main>
        <HeroSection />
        <Divider />
        <IdentitySection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <MomentumSection />
        <Divider />
        <JourneySection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <CapabilitiesSection />
        <Divider />
        <BeyondCodeSection />
        <Divider />
        <VisionSection />
        <Divider />
        <ContactSection />
      </main>
    </div>
  );
}
