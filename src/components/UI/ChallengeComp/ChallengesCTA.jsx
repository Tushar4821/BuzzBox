import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Flame, ArrowRight, Sparkles, Zap } from "lucide-react";

function ChallengesCTA() {
  return (
    <section className="relative bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 px-6 py-10 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-14 lg:px-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
            <Sparkles size={16} className="text-pink-400" />
            Ready for more chaos?
          </div>

          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Your next wild moment is
            <span className="mt-1 block bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              just one tap away
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Jump into trending picks, explore every challenge category, and keep
            the vibe going with BuzzBox. Cute, savage, chaotic — it’s all here.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#111118]/80 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">100+</p>
              <p className="text-xs text-white/60">Challenge Ideas</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111118]/80 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">4</p>
              <p className="text-xs text-white/60">Chaos Categories</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111118]/80 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">Any Mood</p>
              <p className="text-xs text-white/60">Play Your Way</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavLink
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <Flame size={18} />
              Start Challenges
            </NavLink>

            <NavLink
              to="/games"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/10"
            >
              <Zap size={18} />
              Explore Games
            </NavLink>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/55">
            <span>Pick a vibe</span>
            <span className="text-pink-400">•</span>
            <span>Tap a challenge</span>
            <span className="text-blue-400">•</span>
            <span>Let the chaos begin</span>
            <ArrowRight size={16} className="text-white/45" />
          </div>

          <div className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

export default ChallengesCTA;