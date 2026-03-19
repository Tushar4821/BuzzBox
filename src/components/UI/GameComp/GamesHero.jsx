import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Sparkles, Flame, Users, Dice5 } from "lucide-react";
import heroImg from "../../../assets/gameImg/gamehero.jpg";

function GamesHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 pt-28 pb-16 text-white sm:px-6 sm:pt-32 sm:pb-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-20 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
            <Sparkles size={16} className="text-pink-400" />
            BuzzBox Game Zone
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Pick the perfect game
            <span className="block bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              for your next vibe
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:mx-auto sm:text-base lg:mx-0">
            Explore crazy party games, fun group challenges, couple games, and
            drinking modes — all in one place. Choose your mood, tap play, and
            let the chaos begin.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <NavLink
              to="/games"
              className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Explore Games
            </NavLink>

            <NavLink
              to="/challenges"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/10"
            >
              View Challenges
            </NavLink>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">20+</p>
              <p className="text-xs text-white/60">Game Types</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">2-12</p>
              <p className="text-xs text-white/60">Players</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">Fun</p>
              <p className="text-xs text-white/60">Every Mood</p>
            </div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-130">
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              <img
                src={heroImg}
                alt="BuzzBox games"
                className="h-80 w-full object-cover sm:h-105 lg:h-125"
              />
            </div>

            <div className="absolute -left-2 top-4 rounded-2xl border border-white/10 bg-[#111118]/80 px-3 py-2 shadow-xl backdrop-blur-md sm:-left-8 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-pink-500/20 p-2 text-pink-400">
                  <Flame size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold sm:text-sm">Party Picks</p>
                  <p className="text-[10px] text-white/60 sm:text-xs">
                    Hot games tonight
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 bottom-20 rounded-2xl border border-white/10 bg-[#111118]/80 px-3 py-2 shadow-xl backdrop-blur-md sm:-right-8 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/20 p-2 text-blue-400">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold sm:text-sm">Group Ready</p>
                  <p className="text-[10px] text-white/60 sm:text-xs">
                    Best with friends
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute left-4 -bottom-4 rounded-2xl border border-white/10 bg-[#111118]/80 px-3 py-2 shadow-xl backdrop-blur-md sm:left-12 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-500/20 p-2 text-purple-400">
                  <Dice5 size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold sm:text-sm">Random Fun</p>
                  <p className="text-[10px] text-white/60 sm:text-xs">
                    Start instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GamesHero;