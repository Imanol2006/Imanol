"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/connect", label: "Connect" }
];

const donateUrl = "https://www.paypal.com/donate?hosted_button_id=MP3B43MDN7H2N";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6">
        <div
          className={`shell flex items-center justify-between rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-white/60 bg-white/80 px-4 py-3 shadow-[0_18px_40px_rgba(72,67,73,0.12)] backdrop-blur-xl"
              : "border-white/40 bg-white/55 px-4 py-4 backdrop-blur-lg"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/insights.png"
              alt="INSIGHTS Science Discovery logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-ink">INSIGHTS</p>
              <p className="text-xs text-brand-ink/58">Science Discovery</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-brand-ink/74 transition hover:text-brand-teal">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={donateUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button rounded-full bg-brand-coral px-5 py-3 text-white shadow-[0_18px_35px_rgba(242,115,87,0.25)] hover:-translate-y-0.5 hover:bg-[#e4674a]"
            >
              Donate
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-ink/10 bg-white/70 text-brand-ink md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <Dialog open={open} onClose={setOpen} className="relative z-[60] md:hidden">
        <div className="fixed inset-0 bg-brand-ink/35 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-end">
          <DialogPanel className="flex h-full w-[min(88vw,360px)] flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-ink">INSIGHTS</p>
                <p className="text-xs text-brand-ink/58">Science Discovery</p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/10"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-10 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-brand-ink/10 px-4 py-4 text-base font-medium text-brand-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href={donateUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button mt-auto rounded-full bg-brand-coral px-6 py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Donate
            </a>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
