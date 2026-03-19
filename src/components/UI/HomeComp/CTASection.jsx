import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-5xl rounded-4xl border border-white/10 bg-white/5 px-6 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-16"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
          <Sparkles size={16} />
          Ready for the chaos?
        </div>

        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Start the party, pick a mode, and let{" "}
          <span className="bg-linear-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            BuzzBox
          </span>{" "}
          do the rest.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Whether it’s a chill hangout or complete madness with friends, BuzzBox
          gives you games, challenges, and fun moments in one place.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NavLink
            to="/games"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-105"
          >
            Play Now
            <ArrowRight size={18} />
          </NavLink>

          <NavLink
            to="/games"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white/90 transition duration-300 hover:bg-white/10"
          >
            Explore Games
          </NavLink>
        </div>
      </motion.div>
    </section>
  );
}

export default CTASection;