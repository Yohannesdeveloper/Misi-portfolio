"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import {
  Menu,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { NAV_ITEMS } from "./nav-items";
import { VitalMonitor } from "./vital-monitor";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

interface NavbarProps {
  doctorName?: string;
  specialty?: string;
}

export function Navbar({
  doctorName = "Aria Vance, MD",
  specialty = "Anesthesiology & Critical Care",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("#induction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Smooth scroll handler
  const handleScrollTo = (href: string) => {
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`pointer-events-auto relative flex w-full items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "border-b border-slate-200/80 bg-white/85 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] backdrop-blur-2xl dark:border-white/8 dark:bg-[#050b16]/90 dark:shadow-[0_4px_24px_rgba(0,210,255,0.06)] sm:px-6 lg:px-10"
              : "bg-white/60 px-4 py-3.5 backdrop-blur-xl dark:bg-[#070e1c]/60 sm:px-6 lg:px-10"
          }`}
        >
          {/* Subtle mouse glow overlay */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-teal-500/5 via-cyan-500/10 to-teal-500/5 opacity-60 dark:opacity-80" />

          {/* LEFT: Anesthesia Monogram & Identity */}
          <div className="flex items-center gap-3">
            <a
              href="#induction"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#induction");
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              {/* Doctor Portrait Avatar with Dual Neon Glow */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 via-teal-400 to-pink-500 p-[2px] shadow-sm shadow-cyan-500/25 transition-transform duration-300 group-hover:scale-105">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-900">
                  <Image
                    src="/doctor.jpg"
                    alt={doctorName}
                    fill
                    unoptimized
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Subtle pulse aura */}
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-75" />
              </div>

              {/* Title and Specialty */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm tracking-tight text-slate-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-cyan-400">
                    {doctorName}
                  </span>
                </div>
                <span className="text-[10px] font-medium tracking-wide text-teal-600 dark:text-cyan-400/90 hidden sm:inline-block">
                  {specialty}
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href;
              const isHovered = hoveredIdx === index;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.href);
                  }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? "text-teal-900 dark:text-cyan-200"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {/* Sliding magnetic indicator pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-cyan-500/20 dark:shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Soft hover glow when not active */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 rounded-full bg-slate-200/60 dark:bg-white/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.name}
                    {item.badge && (
                      <span className="rounded-full bg-teal-500/15 px-1.5 py-0.2 text-[9px] font-bold text-teal-700 dark:bg-cyan-400/20 dark:text-cyan-300">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </div>

          {/* RIGHT: Vitals HUD, Circadian Theme Toggle, CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Anesthesia Live Vitals Monitor */}
            <VitalMonitor />

            {/* Dark & Light Mode Toggle */}
            <ThemeToggle />

            {/* Desktop CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative hidden sm:inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/35 dark:from-teal-400 dark:via-cyan-400 dark:to-sky-400 dark:text-slate-950"
            >
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />

              {/* Shimmer light beam animation */}
              <motion.div
                className="absolute inset-y-0 -left-[100%] w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ left: ["100%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 4,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              />
            </motion.a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 p-2 text-slate-700 backdrop-blur-md transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Scroll Progress Line — only visible when scrolling */}
          <motion.div
            style={{
              scaleX: scrollProgress,
              transformOrigin: "0%",
              opacity: scrollProgress > 0.01 ? 1 : 0,
            }}
            className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-400 to-pink-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] transition-opacity duration-200"
          />
        </motion.nav>
      </header>

      {/* Mobile Menu Drawer Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onSelectSection={handleScrollTo}
      />
    </>
  );
}

