"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Activity, Sparkles } from "lucide-react";
import { NAV_ITEMS, NavItem } from "./nav-items";
import { ThemeToggle } from "./theme-toggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (href: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl md:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-x-4 top-4 z-50 max-h-[92vh] overflow-y-auto rounded-3xl border border-teal-500/20 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl dark:border-cyan-500/20 dark:bg-[#070d18]/95 md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-pink-500 p-[2px] shadow-md shadow-cyan-500/30">
                  <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                    <Image
                      src="/doctor.jpg"
                      alt="Mismak Mulu"
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Mismak Mulu, MD
                  </h3>
                  <p className="text-xs text-teal-600 dark:text-cyan-400">
                    Anesthesiologist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Navigation links with staggered animation */}
            <div className="mt-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item: NavItem, index: number) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectSection(item.href);
                      onClose();
                    }}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className={`group flex items-center justify-between rounded-2xl p-3.5 transition-all duration-200 ${
                      isActive
                        ? "bg-teal-500/10 text-teal-700 dark:bg-cyan-500/15 dark:text-cyan-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        {item.badge && (
                          <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 dark:text-cyan-300">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Vitals HUD Strip */}
            <div className="mt-6 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4 dark:border-cyan-500/20 dark:bg-cyan-500/5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-teal-700 dark:text-cyan-300">
                  <Activity className="h-3.5 w-3.5 text-teal-500 dark:text-cyan-400" />
                  Live OR Telemetry
                </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Optimal
                  </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/60 py-2 dark:bg-black/30">
                  <div className="text-[10px] text-slate-400">Heart Rate</div>
                  <div className="font-mono text-sm font-bold text-slate-800 dark:text-white">
                    72 BPM
                  </div>
                </div>
                <div className="rounded-xl bg-white/60 py-2 dark:bg-black/30">
                  <div className="text-[10px] text-slate-400">SpO₂</div>
                  <div className="font-mono text-sm font-bold text-teal-600 dark:text-cyan-400">
                    99%
                  </div>
                </div>
                <div className="rounded-xl bg-white/60 py-2 dark:bg-black/30">
                  <div className="text-[10px] text-slate-400">BIS Index</div>
                  <div className="font-mono text-sm font-bold text-amber-500">
                    48
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectSection("#contact");
                  onClose();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get in Touch</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="text-center text-[11px] text-slate-400">
                Ayder Comprehensive Specialized Hospital · Mekelle
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

