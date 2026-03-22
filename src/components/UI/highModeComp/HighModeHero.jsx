import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MoonStar, ArrowRight, Stars } from "lucide-react";
import highHeroImg from '../../../assets/challengeImg/highhero.jpg'

function HighModeHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-28 lg:px-10 lg:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            <MoonStar size={16} className="text-lime-300" />
            Welcome to
            <span className="bg-linear-to-r from-lime-300 via-cyan-300 to-fuchsia-400 bg-clip-text font-semibold text-transparent">
              High Mode
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Get
            <span className="mx-2 bg-linear-to-r from-lime-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
              buzzy
            </span>
            <br />
            enter the
            <span className="mt-2 block bg-linear-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent">
              trippy zone
            </span>
          </h1>

         <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0">
            Deep talks, mind-melt prompts, dumb laughs, floating vibes, and
            that late-night energy where everything suddenly feels funnier,
            deeper, and a little unreal.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-lime-300 via-cyan-300 to-fuchsia-400 px-6 py-3 font-semibold text-[#09070f] transition hover:scale-105">
              Enter High Mode
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-6 py-3 font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/12">
              <Sparkles size={18} />
              Explore vibes
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200">
              <Stars size={16} />
              Chill
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
              <Stars size={16} />
              Deep
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-200">
              <Stars size={16} />
              Cosmic
            </div>
          </div>
        </motion.div>

        {/* Right Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="h-80 w-[320px] rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 blur-[1px] sm:h-95 sm:w-95"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.08, 1] }}
              transition={{ rotate: { duration: 38, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
              className="h-65 w-65 rounded-full border border-cyan-300/20 bg-cyan-400/10 sm:h-80 sm:w-[320px]"
            />
          </div>

          {/* Floating image card */}
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-r from-fuchsia-500/20 via-cyan-400/10 to-lime-400/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/8 p-3 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_35%,rgba(255,255,255,0.04))]" />

              <img
                src={highHeroImg}
                alt="High mode visual"
                className="relative z-10 h-80 w-70 rounded-4xl object-cover sm:h-105 sm:w-90"
              />

              <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  buzzbox high mode
                </p>
                <p className="mt-1 text-sm text-white/80">
                  For nights that feel slower, softer, stranger.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating mini pills */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 top-8 rounded-full border border-lime-300/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-200 backdrop-blur-xl"
          >
            floaty vibes
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-0 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200 backdrop-blur-xl"
          >
            mind melt
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HighModeHero;