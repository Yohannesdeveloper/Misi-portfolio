"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Volume2, VolumeX, ShieldCheck, Zap } from "lucide-react";
import { DEFAULT_VITALS, VitalsData } from "./nav-items";
import { vitalAudio } from "./sound-effect";

export function VitalMonitor() {
  const [vitals, setVitals] = useState<VitalsData>(DEFAULT_VITALS);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [beatActive, setBeatActive] = useState(false);

  // Vital simulation loop (subtle natural variations)
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) => {
        // Natural slight heart rate drift between 70 and 74 bpm
        const delta = Math.floor(Math.random() * 3) - 1;
        const newHR = Math.min(76, Math.max(68, prev.heartRate + delta));
        return {
          ...prev,
          heartRate: newHR,
          spo2: Math.random() > 0.9 ? 98 : 99,
          etco2: Math.random() > 0.7 ? 35 : 36,
          bisScore: Math.min(52, Math.max(44, prev.bisScore + (Math.random() > 0.5 ? 1 : -1))),
        };
      });

      // Trigger beat glow and optional sound
      setBeatActive(true);
      vitalAudio.playPulseBeep(920);
      setTimeout(() => setBeatActive(false), 240);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = vitalAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative">
      {/* Mini Vitals Capsule Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-950/20 px-3 py-1.5 text-xs backdrop-blur-md transition-all duration-300 hover:border-teal-400/40 hover:bg-teal-900/30 hover:shadow-[0_0_15px_rgba(20,184,166,0.25)] dark:border-cyan-500/25 dark:bg-cyan-950/30 dark:hover:border-cyan-400/50"
        aria-label="Patient telemetry and vital signs"
      >
        {/* Pulsing beacon */}
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full rounded-full transition-all duration-300 ${
              beatActive
                ? "scale-150 bg-teal-400 opacity-100 dark:bg-cyan-400"
                : "bg-teal-500 opacity-70 dark:bg-cyan-500"
            }`}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500 dark:bg-cyan-400" />
        </span>

        {/* Live ECG Waveform Canvas / SVG */}
        <div className="relative hidden h-5 w-14 overflow-hidden sm:block">
          <svg
            className="h-full w-full stroke-teal-500 dark:stroke-cyan-400"
            viewBox="0 0 70 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10 H15 L18 6 L21 14 L24 2 L27 18 L30 10 L34 10 L37 8 L40 10 H70"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_4px_rgba(20,184,166,0.8)] dark:drop-shadow-[0_0_4px_rgba(34,211,238,0.9)]"
            />
          </svg>
          {/* Scanning glow beam */}
          <motion.div
            className="absolute inset-y-0 w-3 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent dark:via-cyan-300/50"
            animate={{ x: [-10, 60] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </div>

        {/* Heart Rate Counter */}
        <div className="flex items-center gap-1 font-mono font-medium tracking-tight text-teal-800 dark:text-cyan-300">
          <Activity
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              beatActive ? "scale-125 text-teal-500 dark:text-cyan-400" : "text-teal-600/70 dark:text-cyan-400/70"
            }`}
          />
          <span>{vitals.heartRate}</span>
          <span className="text-[10px] text-teal-600/70 dark:text-cyan-500/70">BPM</span>
        </div>

        {/* Small Sedation Depth Badge */}
        <span className="hidden rounded bg-teal-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700 dark:bg-cyan-500/20 dark:text-cyan-300 md:inline-block">
          BIS {vitals.bisScore}
        </span>
      </motion.button>

      {/* Expanded Telemetry Popover HUD */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismisser */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="absolute right-0 top-full z-50 mt-3 w-80 rounded-2xl border border-teal-500/30 bg-white/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-cyan-500/30 dark:bg-[#060c18]/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-teal-500/15 pb-2.5 dark:border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:bg-cyan-500/15 dark:text-cyan-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                      Vigilance Monitor
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      OR Suite 4 • Hemodynamic Stability
                    </p>
                  </div>
                </div>

                {/* Tone Sound Button */}
                <button
                  type="button"
                  onClick={handleSoundToggle}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                  title={isMuted ? "Unmute pulse tone" : "Mute pulse tone"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-teal-600 dark:text-cyan-400" />
                  )}
                </button>
              </div>

              {/* Live Metric Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {/* Heart Rate */}
                <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-2.5 dark:border-cyan-500/10 dark:bg-cyan-500/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Heart Rate</span>
                    <Activity className="h-3 w-3 text-rose-500 animate-pulse" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                      {vitals.heartRate}
                    </span>
                    <span className="text-[10px] text-slate-500">bpm</span>
                  </div>
                  <div className="mt-1 text-[9px] text-emerald-600 dark:text-emerald-400">
                    Sinus Rhythm • Normal
                  </div>
                </div>

                {/* SpO2 */}
                <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-2.5 dark:border-cyan-500/10 dark:bg-cyan-500/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>O₂ Saturation</span>
                    <span className="text-[10px] font-mono text-cyan-500">SpO₂</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-teal-600 dark:text-cyan-400">
                      {vitals.spo2}%
                    </span>
                  </div>
                  <div className="mt-1 text-[9px] text-teal-600 dark:text-cyan-300">
                    FiO₂ 0.40 • Hyperoxia
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-2.5 dark:border-cyan-500/10 dark:bg-cyan-500/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>NIBP</span>
                    <span className="text-[9px] text-slate-400">MAP 90</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      {vitals.bpSystolic}/{vitals.bpDiastolic}
                    </span>
                    <span className="text-[10px] text-slate-500">mmHg</span>
                  </div>
                  <div className="mt-1 text-[9px] text-slate-500">Normotensive</div>
                </div>

                {/* BIS Depth of Anesthesia */}
                <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-2.5 dark:border-cyan-500/10 dark:bg-cyan-500/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Sedation (BIS)</span>
                    <Zap className="h-3 w-3 text-amber-500" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-amber-600 dark:text-amber-400">
                      {vitals.bisScore}
                    </span>
                    <span className="text-[10px] text-slate-500">Target 40-60</span>
                  </div>
                  <div className="mt-1 text-[9px] text-amber-600 dark:text-amber-300">
                    Surgical Anesthesia
                  </div>
                </div>
              </div>

              {/* Infusion Status Pill */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-100/80 px-3 py-2 text-[11px] dark:bg-slate-900/60">
                <span className="text-slate-500 dark:text-slate-400">Target Controlled Infusion:</span>
                <span className="font-mono font-medium text-teal-700 dark:text-cyan-300">
                  {vitals.drugInfusion}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

