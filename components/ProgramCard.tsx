"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { Program } from "@/data/programs";

export default function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-[0_18px_45px_rgba(72,67,73,0.12)]"
    >
      <div className="relative h-[460px] overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">{program.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight">{program.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/74">{program.description}</p>
          <Link
            href={program.href}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition duration-300 group-hover:bg-brand-coral group-hover:text-white"
          >
            Learn More
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
