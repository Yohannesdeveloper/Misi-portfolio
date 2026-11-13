"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-slate-200 bg-slate-100/50 dark:border-slate-800 dark:bg-slate-900/50" />
    );
  }

  const currentTheme = resolvedTheme || theme || "light";
  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 p-2 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-cyan-400/50"
      aria-label="Toggle circadian light and dark theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Background aurora glow ring */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/0 via-cyan-400/10 to-teal-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-cyan-400/20 dark:to-emerald-400/30" />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          /* When in dark mode, display the Sun so clicking switches to Light mode */
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative flex items-center justify-center text-amber-400"
          >
            <Sun className="h-4 w-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </motion.div>
        ) : (
          /* When in light mode, display the Moon so clicking switches to Dark mode */
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative flex items-center justify-center text-cyan-700"
          >
            <Moon className="h-4 w-4 drop-shadow-[0_0_6px_rgba(8,145,178,0.4)]" />
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute -right-1 -top-1"
            >
              <Sparkles className="h-2 w-2 text-cyan-600" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
