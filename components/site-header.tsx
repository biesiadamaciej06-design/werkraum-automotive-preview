"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Fahrzeuge", href: "#fahrzeuge" },
  { label: "Galerie", href: "#galerie" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 36);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6"
      animate={{
        paddingTop: scrolled ? 12 : 16,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`section-shell flex items-center justify-between px-5 py-3 transition duration-300 ${
          scrolled
            ? "border border-white/10 bg-[rgba(8,10,14,0.7)] shadow-aura backdrop-blur-2xl"
            : "border border-white/10 bg-[rgba(8,10,14,0.18)] backdrop-blur-md"
        }`}
        style={{ borderRadius: "999px" }}
      >
        <Link href="#top" className="flex items-center gap-3 text-white">
          <span className="h-2 w-2 rounded-full bg-champagne" />
          <span className="text-sm font-semibold uppercase tracking-[0.32em]">
            Werksraum Automotive
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </motion.header>
  );
}
