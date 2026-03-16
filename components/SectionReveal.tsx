"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionReveal({ children, className = "" }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
