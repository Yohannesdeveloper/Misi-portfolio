"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar/navbar";
import {
  HeartPulse, Brain, Baby, ArrowDown, ArrowUpRight, ArrowUp,
  CheckCircle2, Syringe, Trophy, BookOpen, Briefcase,
  GraduationCap, ImageIcon, Mail, Sparkles, Activity,
  Shield, Stethoscope, Zap, Layers,
} from "lucide-react";
import { motion } from "framer-motion";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-24 w-full max-w-5xl scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#030712] dark:text-slate-100 selection:bg-cyan-500/30">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full bg-pink-500/15 blur-[120px]" />
      </div>

      <Navbar doctorName="Mismak Mulu" specialty="Anesthesiologist" />

      {/* HOME — 100% Edge-to-Edge Full Screen Hero */}
      <section id="home" className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden pt-20">
        {/* Full-bleed background image covering the entire viewport, anchored to the right */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/doctor.jpg"
            alt="Mismak Mulu, MD"
            fill
            unoptimized
            priority
            className="object-cover object-right-top sm:object-[80%_12%] lg:object-[85%_10%]"
          />
          {/* Left-to-right cinematic gradient: deep black on the left for text, completely clear on the right for her portrait */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent sm:from-black/95 sm:via-black/40 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Text content pinned to bottom */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[0.95]">
              <span className="block">Mismak</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-teal-200 to-pink-400 bg-clip-text text-transparent">
                Mulu
              </span>
            </h1>
            <p className="mt-3 text-xl font-medium text-white/80">
              MD · Anesthesiologist
            </p>
            <p className="mt-4 max-w-md text-sm text-white/70 leading-relaxed">
              Trained in modern hemodynamic monitoring, precision pharmacological induction,
              and vigilant perioperative care.
            </p>

            {/* Stats */}
            <div className="mt-8 flex items-center gap-8">
              {[
                { val: "0 Yrs", label: "Experience" },
                { val: "400+", label: "Clinical Cases" },
                { val: "100%", label: "Vigilance" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-2xl font-bold text-cyan-300">{m.val}</div>
                  <div className="text-xs text-white/60">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Get in Touch
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                About Me
              </a>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.4 }}
            className="absolute bottom-6 right-8 sm:right-12 lg:right-20 flex flex-col items-center gap-1 text-xs text-white/50"
          >
            <span>Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </section>

      {/* REST OF PORTFOLIO CONTENT */}
      <main className="flex flex-col items-center px-4 pb-24 sm:px-6 lg:px-8">

        {/* ABOUT ME */}
        <Section id="about" title="About Me">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            {/* Left — Portrait (Pristine 4K UHD Master) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-lg">
              <Image
                src="/about-4k.png"
                alt="Mismak Mulu, MD"
                fill
                unoptimized
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>

            {/* Right — Bio & Info */}
            <div className="flex flex-col gap-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                I am <strong>Mismak Mulu</strong> — a newly graduated Anesthesia professional
                equipped with rigorous clinical training in operating theatres, patient airway
                management, and hemodynamic vital monitoring.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Fresh out of my medical training with 0 years of post-qualification experience,
                I bring up-to-date knowledge of modern anesthetic protocols, intense focus,
                and an unwavering dedication to patient safety.
              </p>

              {/* At a Glance */}
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 dark:border-cyan-500/15">
                <div className="font-semibold text-slate-800 dark:text-white mb-3">At a Glance</div>
                {[
                  ["Specialty", "Clinical Anesthesia & Patient Care"],
                  ["Experience", "0 Years (Recent Graduate)"],
                  ["Institution", "Mekelle University (Ayder)"],
                  ["Location", "Mekelle, Ethiopia"],
                  ["Status", "Licensed & Ready for Clinical Practice"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5 text-sm last:border-0">
                    <span className="text-slate-500 dark:text-slate-400">{k}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* EXPERTISE */}
        <Section id="expertise" title="Clinical Expertise & Core Skills">
          <p className="text-sm text-slate-500 dark:text-slate-400 -mt-3 mb-6">
            Comprehensive intraoperative anesthesia techniques and perioperative competencies.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Activity,
                title: "Obstetric & Gynecological",
                desc: "Spinal and epidural anesthesia for elective & emergency C-sections, maternal vitals stabilization, and fetal safety.",
                skill: "Spinal · Epidural Analgesia",
              },
              {
                icon: Zap,
                title: "Emergency Trauma & Resuscitation",
                desc: "Rapid Sequence Induction (RSI), trauma airway control, hemorrhagic shock resuscitation, and hemodynamic rescue.",
                skill: "RSI · Shock Management",
              },
              {
                icon: Syringe,
                title: "Regional Anesthesia & Blocks",
                desc: "Ultrasound-guided neuraxial and peripheral nerve blocks for orthopedic, vascular, and lower extremity procedures.",
                skill: "Nerve Blocks · Opioid Sparing",
              },
              {
                icon: Layers,
                title: "General & Laparoscopic Anesthesia",
                desc: "Balanced inhalation and intravenous anesthesia (TIVA), muscle relaxation monitoring, and smooth extubation.",
                skill: "TIVA · Inhalation Agents",
              },
              {
                icon: Shield,
                title: "Difficult Airway Management",
                desc: "Proficiency with video laryngoscopes, gum elastic bougies, supraglottic airways (LMA), and airway rescue algorithms.",
                skill: "Video Laryngoscopy · LMA",
              },
              {
                icon: Baby,
                title: "Pediatric Perioperative Care",
                desc: "Weight-adjusted pharmacokinetics, pediatric airway anatomy management, fluid balance, and calm pediatric induction.",
                skill: "Pediatric Dosing · Airway",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-md dark:border-white/10 dark:bg-[#070e1c] dark:hover:border-cyan-500/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400 transition-transform group-hover:scale-105">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-700 dark:bg-white/5 dark:text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  {s.skill}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience & Clinical Training">
          <div className="space-y-3">
            {[
              { role: "Clinical Anesthesia Intern", place: "Ayder Comprehensive Specialized Hospital, Mekelle", period: "2025 – 2026 (Rotations)" },
              { role: "Surgical Theatre & Airway Trainee", place: "Ayder Referral Hospital Major OR Suites", period: "2024 – 2025" },
              { role: "ICU & Resuscitation Practicum", place: "Mekelle University College of Health Sciences", period: "2023 – 2024" },
            ].map((e) => (
              <div key={e.role} className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 dark:border-white/5 dark:bg-[#070e1a]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Briefcase className="h-4 w-4 text-cyan-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{e.role}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{e.place}</div>
                  <div className="mt-1 font-mono text-xs text-cyan-600 dark:text-cyan-400">{e.period}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education & Certifications">
          <div className="space-y-3">
            {[
              { degree: "Bachelor of Science in Anesthesia", school: "Mekelle University (Ayder Campus), Mekelle, Ethiopia", year: "Graduated 2026" },
              { degree: "Advanced Cardiovascular Life Support (ACLS)", school: "AHA Certified Training", year: "2025" },
              { degree: "Basic Life Support (BLS) & Difficult Airway", school: "Ayder Hospital Simulation Center", year: "2024" },
            ].map((e) => (
              <div key={e.degree} className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 dark:border-white/5 dark:bg-[#070e1a]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-500/10">
                  <GraduationCap className="h-4 w-4 text-pink-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{e.degree}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{e.school}</div>
                  <div className="mt-1 font-mono text-xs text-pink-500 dark:text-pink-400">{e.year}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ACHIEVEMENTS */}
        <Section id="achievements" title="Achievements & Honors">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Top Clinical Honors in Anesthesia — Mekelle University Class of 2026",
              "400+ Supervised Operating Theatre Cases at Ayder Comprehensive Hospital",
              "Advanced Airway & Rapid Sequence Induction Clinical Simulation Award",
              "Exemplary Perioperative Discipline & Patient Vigilance Recognition",
            ].map((a) => (
              <div key={a} className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white p-4 dark:border-white/5 dark:bg-[#070e1a]">
                <Trophy className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{a}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* GALLERY */}
        <Section id="gallery" title="Gallery">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-slate-200/60 dark:border-white/5 flex items-center justify-center"
              >
                <ImageIcon className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-pink-500/5" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400 text-center">Photos coming soon — add images to the gallery folder.</p>
        </Section>

        {/* CONTACT */}
        <section id="contact" className="mt-24 mb-10 w-full max-w-5xl scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Professional inquiries, collaborations, and referrals welcome.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr]">

            {/* Left — Contact Info */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "mismak.mulu@hospital.et",
                  href: "mailto:mismak.mulu@hospital.et",
                },
                {
                  icon: Briefcase,
                  label: "Hospital Affiliation",
                  value: "Ayder Comprehensive Specialized Hospital\nMekelle University, Mekelle, Ethiopia",
                  href: null,
                },
                {
                  icon: GraduationCap,
                  label: "Professional Body",
                  value: "Ethiopian Society of Anesthesiologists",
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 dark:border-white/5 dark:bg-[#070e1a]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                    <item.icon className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-slate-700 whitespace-pre-line dark:text-slate-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Availability badge */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Currently Available
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  Open to locum tenens, directorship roles, and clinical consultation engagements.
                </p>
              </div>
            </div>

            {/* Right — Contact Form */}
            <form
              className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#070e1c]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Full Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. John Smith"
                    required
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Email Address <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@hospital.com"
                    required
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Institution */}
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hospital / Institution
                </label>
                <input
                  type="text"
                  placeholder="Ayder Comprehensive Hospital"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500"
                />
              </div>

              {/* Subject */}
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Subject <span className="text-pink-500">*</span>
                </label>
                <select
                  defaultValue=""
                  required
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:focus:border-cyan-500"
                >
                  <option value="" disabled>Select a subject…</option>
                  <option>Locum Tenens Opportunity</option>
                  <option>Directorship / Leadership Role</option>
                  <option>Clinical Consultation</option>
                  <option>Research Collaboration</option>
                  <option>Speaking / Conference Invitation</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Message <span className="text-pink-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your inquiry in detail…"
                  required
                  className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500"
                />
              </div>

              {/* Submit */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="h-4 w-4" />
                  Send Message
                </button>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Typically responds within 48 hours.
                </p>
              </div>
            </form>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative mt-20 border-t border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#040812]/80">
        {/* Subtle top glow line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Col 1: Brand & Tagline */}
            <div className="flex flex-col gap-3 md:col-span-5">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 p-[1.5px]">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
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
                  <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                    Mismak Mulu
                  </span>
                  <span className="ml-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                    Anesthesiologist
                  </span>
                </div>
              </div>

              <p className="max-w-sm text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dedicated to vigilant perioperative patient monitoring, precise airway management,
                and safe anesthesia delivery at Ayder Comprehensive Specialized Hospital.
              </p>

              <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Ayder Campus · Mekelle University · Mekelle, Ethiopia
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="flex flex-col gap-2 md:col-span-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                Navigation
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <a href="#home" className="hover:text-cyan-500 transition-colors">Home</a>
                <a href="#about" className="hover:text-cyan-500 transition-colors">About Me</a>
                <a href="#expertise" className="hover:text-cyan-500 transition-colors">Expertise</a>
                <a href="#experience" className="hover:text-cyan-500 transition-colors">Experience</a>
                <a href="#education" className="hover:text-cyan-500 transition-colors">Education</a>
                <a href="#achievements" className="hover:text-cyan-500 transition-colors">Achievements</a>
                <a href="#gallery" className="hover:text-cyan-500 transition-colors">Gallery</a>
                <a href="#contact" className="hover:text-cyan-500 transition-colors">Contact</a>
              </div>
            </div>

            {/* Col 3: Core Disciplines & Back to Top */}
            <div className="flex flex-col gap-2 md:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                Clinical Focus
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Obstetric Anesthesia",
                  "Trauma RSI",
                  "Ultrasound Nerve Blocks",
                  "Difficult Airway",
                  "Pediatric Care",
                  "Vital Telemetry",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Ready for clinical practice
                </span>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:bg-[#070e1c] dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
                  title="Back to top"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 pt-6 text-[11px] text-slate-400 dark:border-white/5">
            <div>
              © 2026 Mismak Mulu. All rights reserved.
            </div>
            <div className="mt-2 sm:mt-0">
              Clinical Anesthesia Portfolio · Mekelle, Tigray, Ethiopia
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
