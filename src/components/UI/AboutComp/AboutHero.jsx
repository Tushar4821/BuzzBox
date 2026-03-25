import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Brain, Flame } from "lucide-react";
import aboutImg from '../../../assets/highmode/abouthero.jpg'

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-32 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-pink-200 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            About BuzzBox
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Where{" "}
            <span className="bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              chaos
            </span>{" "}
            meets game night.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg lg:mx-0">
            BuzzBox is your all-in-one party playground for wild games, spicy
            challenges, brainy battles, and unforgettable late-night vibes.
            Whether you’re playing with friends, your partner, or your whole
            squad, there’s always a mode that matches the mood.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-pink-300">
                <Gamepad2 className="h-5 w-5" />
                <span className="font-semibold">Party Games</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-cyan-300">
                <Brain className="h-5 w-5" />
                <span className="font-semibold">Mind Games</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-orange-300">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">High Mode Vibes</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-4xl bg-linear-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <img
              src={aboutImg}
              alt="BuzzBox about hero"
              className="h-80 w-full object-cover sm:h-105 lg:h-125"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0f]/85 via-[#0b0b0f]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                    Vibe
                  </p>
                  <p className="mt-2 text-lg font-bold">Fun + Premium</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                    Energy
                  </p>
                  <p className="mt-2 text-lg font-bold">Smart Chaos</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;