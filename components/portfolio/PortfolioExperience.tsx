"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
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

type DeviceMockupProps = {
  title: string;
  labels: string[];
  variant?: "hero" | "project";
};

function DeviceMockup({ title, labels, variant = "project" }: DeviceMockupProps) {
  return (
    <div className={cn("visual-shell panel-noise", variant === "hero" ? "min-h-[26rem] p-4 md:min-h-[38rem] md:p-6" : "min-h-[24rem] p-4 md:min-h-[34rem] md:p-6")}>
      <div className="absolute inset-x-8 top-6 flex items-center gap-2 md:inset-x-10">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
      </div>
      <div className="grid-glow absolute inset-0 opacity-20" />
      <div className="absolute inset-x-[12%] top-[14%] h-[42%] rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(143,194,255,0.24),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] shadow-glow" />
      <div className="absolute inset-x-[9%] bottom-[10%] top-[28%] rounded-[2.25rem] border border-white/10 bg-black/30 backdrop-blur-xl" />
      <div className="absolute inset-x-[14%] top-[33%] flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Live concept</p>
          <p className="mt-3 text-lg font-semibold text-white md:text-2xl">{title}</p>
        </div>
        <div className="hidden rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50 md:block">
          Premium system
        </div>
      </div>
      <div className="absolute inset-x-[14%] bottom-[16%] grid gap-3 md:grid-cols-3">
        {labels.map((label, index) => (
          <div key={label} className={cn("rounded-[1.25rem] border border-white/10 px-4 py-5 backdrop-blur-xl", index === 0 ? "bg-white/[0.08]" : "bg-white/[0.04]")}>
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/35">{index === 0 ? "Primary" : "Layer"}</p>
            <p className="mt-3 text-sm font-medium text-white/75">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroPortrait() {
  return (
    <div className="visual-shell panel-noise relative min-h-[26rem] overflow-hidden p-3 md:min-h-[38rem] md:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,194,255,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
      <div className="absolute inset-x-6 top-6 flex items-center justify-between md:inset-x-8">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
        </div>
        <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-white/55 backdrop-blur-xl">
          Imanol Galvan
        </div>
      </div>
      <div className="absolute inset-4 overflow-hidden rounded-[1.8rem] border border-white/10 md:inset-5 md:rounded-[2.2rem]">
        <Image
          src="/imanolpic2.png.jpeg"
          alt="Portrait of Imanol Galvan"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.04),rgba(5,6,8,0.18)_40%,rgba(5,6,8,0.72)_100%)]" />
      </div>
      <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/10 bg-black/28 px-5 py-5 backdrop-blur-xl md:inset-x-10 md:bottom-10 md:px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/38">Builder in focus</p>
        <p className="mt-3 max-w-md text-lg font-semibold text-white/90 md:text-2xl">
          Software, AI, leadership, and founder ambition grounded in real execution.
        </p>
      </div>
    </div>
  );
}

function PortfolioNav() {
  const activeSection = useActiveSection(navItems.map((item) => item.id));

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a[data-scroll='true']") as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

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
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold tracking-[0.3em] text-white/82">{profile.initials}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.18em] text-white">{profile.name}</p>
            <p className="line-clamp-2 max-w-[15rem] text-xs text-white/45 xl:max-w-[18rem]">{profile.role}</p>
          </div>
        </a>
        <nav className="no-scrollbar hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full border border-white/8 bg-white/[0.02] p-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-scroll="true"
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-sm transition duration-300 xl:px-4",
                activeSection === item.id ? "bg-white/10 text-white" : "text-white/52 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <a href={`mailto:${profile.email}`} className="secondary-button whitespace-nowrap">Email</a>
          <a href="#contact" data-scroll="true" className="primary-button whitespace-nowrap">{profile.primaryCta}</a>
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
          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(18rem,calc(100vw-1.5rem))] rounded-[1.75rem] border border-white/10 bg-black/70 p-4 shadow-ambient backdrop-blur-2xl">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} data-scroll="true" className="block rounded-2xl border border-white/8 px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.04] hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
            <a href={`mailto:${profile.email}`} className="primary-button mt-4 w-full">{profile.primaryCta}</a>
          </div>
        </details>
      </div>
    </header>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current || !visualRef.current) {
      return;
    }

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
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.3
        }
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
    <section id="hero" ref={sectionRef} className="section-frame hero-noise relative min-h-screen scroll-mt-28 overflow-hidden pb-16 pt-28 md:pt-36">
      <div className="ambient-orb left-[-6rem] top-[10rem] h-56 w-56 opacity-60 md:h-80 md:w-80" />
      <div className="ambient-orb bottom-[8rem] right-[-5rem] h-56 w-56 opacity-45 md:h-72 md:w-72" />
      <div className="shell grid items-end gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div ref={contentRef} className="relative z-10 space-y-6 md:space-y-8">
          <span className="section-kicker">{profile.hero.eyebrow}</span>
          <h1 className="headline-xl max-w-4xl text-balance">{profile.hero.title}</h1>
          <p className="copy-lg text-balance">{profile.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#projects" data-scroll="true" className="primary-button">
              View featured work
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#vision" data-scroll="true" className="secondary-button">See the direction</a>
          </div>
          <div className="grid max-w-2xl gap-3 pt-6 sm:grid-cols-3">
            {profile.hero.stats.map((stat) => (
              <div key={stat.label} className="glass-panel px-5 py-4">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-white/88">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref={visualRef} className="relative lg:pb-8">
          <HeroPortrait />
        </div>
      </div>
      <div className="shell mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/35 md:mt-20">
        <span className="h-px w-10 bg-white/20" />
        Scroll to enter the story
      </div>
    </section>
  );
}

function IdentitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(textRefs.current.filter(Boolean), {
        opacity: 0,
        y: 30,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="identity" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell grid gap-16 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10">
        <SectionHeading eyebrow="Identity" title="Not an about box. A trajectory." description="UTEP computer science student. NSF S-STEM Scholar. Builder shaped by code, startup ecosystems, mentorship, service, and long-range ambition." />
        <div className="space-y-12 lg:space-y-20">
          {identityMoments.map((statement, index) => (
            <p
              key={statement}
              ref={(node) => {
                textRefs.current[index] = node;
              }}
              className="headline-md max-w-3xl text-white/92"
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card) => {
        const mockup = card.querySelector(".project-mockup");
        const copy = card.querySelectorAll(".project-copy > *");

        gsap.fromTo(
          mockup,
          { y: 60, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 72%",
              end: "top 30%",
              scrub: true
            }
          }
        );

        gsap.from(Array.from(copy), {
          opacity: 0,
          y: 26,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 68%"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="projects" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12 md:space-y-20">
        <SectionHeading
          eyebrow="Featured projects"
          title="Projects built around real traction, real users, and real direction."
          description="From pitch-winning AI products to systems labs, startup programs, and current venture ideas, each project marks a step toward building technology companies with strong human value."
        />
        <div className="space-y-8 md:space-y-12">
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className="project-card project-spotlight relative overflow-hidden rounded-[2rem] border px-5 py-6 md:px-8 md:py-8 lg:min-h-[44rem] lg:px-10 lg:py-10"
            >
              <div className="ambient-orb right-0 top-10 h-44 w-44 opacity-30" />
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
                <div className={cn("project-copy order-2 space-y-5 lg:order-1", index % 2 === 1 && "lg:order-2")}>
                  <div className="flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-white/38">
                    <span>{project.category}</span>
                    <span>/</span>
                    <span>{project.role}</span>
                  </div>
                  <h3 className="headline-md max-w-2xl text-balance">{project.title}</h3>
                  <p className="max-w-2xl text-xl leading-8 text-white/82">{project.tagline}</p>
                  <p className="copy-lg max-w-2xl">{project.description}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="glass-panel px-5 py-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/35">Tech stack</p>
                      <p className="mt-3 text-sm text-white/74">{project.stack.join(" / ")}</p>
                    </div>
                    <div className="glass-panel px-5 py-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/35">Impact</p>
                      <p className="mt-3 text-sm text-white/74">{project.impact}</p>
                    </div>
                  </div>
                </div>
                <div className={cn("project-mockup order-1 lg:order-2", index % 2 === 1 && "lg:order-1")}>
                  <DeviceMockup title={project.tagline} labels={project.accents} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MomentumSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".momentum-card", {
        opacity: 0,
        y: 34,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="momentum" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12 md:space-y-16">
        <SectionHeading
          eyebrow="Currently building"
          title="This is not a static portfolio. It reflects active momentum."
          description="The pattern is ongoing: build, support, test, show up, learn, repeat. The goal is not just to list what I have done, but to show what I am actively compounding."
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {currentMomentum.building.map((item) => (
            <article key={item.title} className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Currently building</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-white/78">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Currently learning</p>
            <div className="mt-5 grid gap-3">
              {currentMomentum.learning.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Traction and signals</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {currentMomentum.traction.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">How I build</p>
            <div className="mt-5 grid gap-3">
              {currentMomentum.operatingSystem.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="momentum-card glass-panel px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">{technicalBreakdown.title}</p>
            <p className="mt-4 text-base leading-8 text-white/78">{technicalBreakdown.intro}</p>
            <div className="mt-5 grid gap-3">
              {technicalBreakdown.points.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/72">
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

function JourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".journey-card", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      });

      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="journey" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Journey"
          title="Growth measured through action, not waiting."
          description="The pattern is consistent: step in early, learn in public, build under pressure, mentor others, and keep compounding across technology, leadership, and entrepreneurship."
        />
        <div className="relative mt-14 grid gap-8 md:mt-20 lg:grid-cols-[0.12fr_0.88fr] lg:gap-12">
          <div className="relative hidden justify-center lg:flex">
            <div className="timeline-line h-full w-px rounded-full opacity-20" />
            <div className="timeline-progress timeline-line absolute top-0 h-full w-px rounded-full" />
          </div>
          <div className="space-y-6 md:space-y-8">
            {journey.map((item) => (
              <article key={item.title} className="journey-card glass-panel relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
                <div className="absolute inset-y-0 left-0 w-px bg-white/8 lg:hidden" />
                <div className="grid gap-5 md:grid-cols-[10rem_1fr] md:gap-8">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.34em] text-white/38">{item.year}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">{item.title}</h3>
                    <p className="mt-3 copy-lg max-w-3xl">{item.description}</p>
                    <p className="mt-4 text-sm uppercase tracking-[0.28em] text-white/36">{item.note}</p>
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

function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".experience-card", {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });

      gsap.from(".leadership-card", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 58%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="experience" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12 md:space-y-16">
        <SectionHeading
          eyebrow="Experience and leadership"
          title="Real roles, real responsibility, and leadership that shows up in public."
          description="Beyond interests and projects, this is where the responsibility shows: leadership roles, operational work, student support, community service, and the environments where I have actually had to deliver."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {professionalExperience.map((item) => (
            <article key={`${item.role}-${item.organization}`} className="experience-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">{item.period}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{item.role}</h3>
              <p className="mt-2 text-base uppercase tracking-[0.24em] text-white/40">{item.organization}</p>
              <p className="mt-5 copy-lg max-w-3xl">{item.description}</p>
              <div className="mt-6 grid gap-3">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/72">
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
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">{item.organization}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.role}</h3>
              <p className="mt-4 text-base leading-8 text-white/76">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".capability-card", {
        opacity: 0,
        y: 36,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="capabilities" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12">
        <SectionHeading
          eyebrow="Capabilities"
          title="A capability stack shaped by engineering, initiative, and product ambition."
          description="The mix spans technical execution, AI experimentation, communication, mentorship, leadership, and startup thinking."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilityGroups.map((group) => (
            <article key={group.title} className="capability-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">{group.title}</p>
              <p className="mt-4 text-lg leading-8 text-white/82">{group.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/68">
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

function BeyondCodeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".beyond-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="beyond" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell space-y-12">
        <SectionHeading
          eyebrow="Beyond code"
          title="The human side matters because it changes how I build."
          description="The technical side is only part of the story. Service, mentorship, performance, sports, and creative work shape how I lead, communicate, and stay grounded."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {beyondCode.map((item) => (
            <article key={item.title} className="beyond-card glass-panel px-6 py-6 md:px-7 md:py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">{item.title}</p>
              <p className="mt-4 text-base leading-8 text-white/78">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(phraseRefs.current.filter(Boolean), {
        opacity: 0,
        y: 36,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="vision" ref={sectionRef} className="section-frame scroll-mt-28">
      <div className="shell rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)),radial-gradient(circle_at_top,rgba(143,194,255,0.16),transparent_40%)] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
          <div className="space-y-6">
            <span className="section-kicker">Vision</span>
            <h2 className="headline-lg text-balance">A philosophy built around movement, experimentation, and becoming.</h2>
            <p className="copy-lg max-w-xl text-balance">
              This is the mindset underneath the resume lines and project names: how I think about action, growth, risk, and building a life with intention.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {philosophyHighlights.map((line) => (
                <span key={line} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/68">
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
                  ref={(node) => {
                    phraseRefs.current[index] = node;
                  }}
                  className="copy-lg max-w-4xl text-balance text-white/88 md:text-[1.2rem] md:leading-9"
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {messageAndImpact.map((item) => (
                <article key={item.title} className="glass-panel px-6 py-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">{item.title}</p>
                  <p className="mt-4 text-base leading-8 text-white/78">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="contact" ref={sectionRef} className="section-frame scroll-mt-28 pb-16 md:pb-24">
      <div className="shell glass-panel overflow-hidden px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        <div className="ambient-orb right-[-4rem] top-[-3rem] h-44 w-44 opacity-40 md:h-60 md:w-60" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_0.05fr_0.45fr] lg:items-end">
          <div className="space-y-6">
            <span className="contact-reveal section-kicker">Final CTA</span>
            <h2 className="contact-reveal headline-lg max-w-4xl text-balance">I want to build technology companies and software platforms that help people grow, adapt, and move forward.</h2>
            <p className="contact-reveal copy-lg max-w-2xl">{profile.availability}</p>
            <div className="contact-reveal flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="primary-button">{profile.primaryCta}</a>
              <a href="#hero" data-scroll="true" className="secondary-button">Back to top</a>
            </div>
          </div>
          <div className="hidden h-full w-px bg-white/8 lg:block" />
          <div className="space-y-6">
            <div className="contact-reveal">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Email</p>
              <a href={`mailto:${profile.email}`} className="mt-3 block text-2xl font-semibold text-white hover:text-[var(--color-accent)]">{profile.email}</a>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Phone</p>
              <a href="tel:+19156303282" className="mt-3 block text-lg text-white/76 hover:text-[var(--color-accent)]">{profile.phone}</a>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Location</p>
              <p className="mt-3 text-lg text-white/76">{profile.location}</p>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Education</p>
              <p className="mt-3 text-lg text-white/76">{profile.education.school}</p>
              <p className="mt-2 text-sm text-white/54">{profile.education.degree} / {profile.education.minor} / {profile.education.graduation}</p>
            </div>
            <div className="contact-reveal">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/35">Elsewhere</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="secondary-button">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="contact-reveal mt-12 border-t border-white/10 pt-6 text-sm text-white/42">
          Built around your current academic path, leadership roles, startup ecosystem involvement, projects, and philosophy of growth through action.
        </div>
      </div>
    </section>
  );
}

export default function PortfolioExperience() {
  return (
    <div className="relative">
      <PortfolioNav />
      <main>
        <HeroSection />
        <IdentitySection />
        <ProjectsSection />
        <MomentumSection />
        <JourneySection />
        <ExperienceSection />
        <CapabilitiesSection />
        <BeyondCodeSection />
        <VisionSection />
        <ContactSection />
      </main>
    </div>
  );
}



