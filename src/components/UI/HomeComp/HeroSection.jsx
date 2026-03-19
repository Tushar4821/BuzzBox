import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from '../../../assets/homeImg/hero1.jpg';
import { Sparkles, Trophy, Users } from "lucide-react";

function HeroSection() {
  return (
   <section className="relative overflow-hidden bg-[#0b0b0f] text-white pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 -left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm text-gray-300 mb-5 sm:mb-6">
            <Sparkles size={15} className="text-pink-400" />
            The ultimate party games hub
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-xl">
            One place for all your{" "}
            <span className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              drinking games
            </span>{" "}
            and party challenges.
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-lg leading-relaxed max-w-xl">
            Stop jumping between random websites. BuzzBox brings drinking games,
            fun challenges, and party moments together in one smooth and premium
            experience.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <NavLink
              to="/games"
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.03] transition duration-300 text-center"
            >
              Explore Games
            </NavLink>

            <NavLink
              to="/challenges"
              className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold hover:bg-white/10 transition duration-300 text-center"
            >
              Try Challenges
            </NavLink>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 -mt-4 sm:mt-0"
        >
          <div className="relative rounded-[1.75rem] sm:rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 sm:p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 rounded-[1.75rem] sm:rounded-4xl bg-linear-to-br from-pink-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            <div className="absolute inset-2 sm:inset-3 bg-black/20 rounded-[1.35rem] sm:rounded-3xl pointer-events-none" />
            <img
              src={heroImg}
              alt="Friends enjoying party games"
              className="w-full h-70 sm:h-125 object-cover rounded-[1.35rem] sm:rounded-3xl"
            />
          </div>

          {/* Floating cards only desktop */}
          <div className="hidden lg:block absolute -left-8 bottom-10 rounded-2xl border border-white/10 bg-[#0b0b0f]/80 backdrop-blur-xl px-4 py-3 shadow-lg">
            <p className="text-sm font-semibold text-white">100+ Party Moments</p>
            <p className="text-xs text-gray-400 mt-1">Challenges, cards, dares</p>
          </div>

          <div className="hidden lg:block absolute -right-6 top-10 rounded-2xl border border-white/10 bg-[#0b0b0f]/80 backdrop-blur-xl px-4 py-3 shadow-lg">
            <p className="text-sm font-semibold text-white">Play Instantly</p>
            <p className="text-xs text-gray-400 mt-1">No more searching around</p>
          </div>
        </motion.div>
      </div>

      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-7xl mx-auto mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4 text-center">
          <Users className="mx-auto mb-2 sm:mb-3 text-purple-400" size={18} />
          <p className="text-[11px] sm:text-sm font-medium leading-snug">
            Made for friend groups
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4 text-center">
          <Sparkles className="mx-auto mb-2 sm:mb-3 text-pink-400" size={18} />
          <p className="text-[11px] sm:text-sm font-medium leading-snug">
            Fun premium UI
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4 text-center">
          <Trophy className="mx-auto mb-2 sm:mb-3 text-blue-400" size={18} />
          <p className="text-[11px] sm:text-sm font-medium leading-snug">
            Games & challenges
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;