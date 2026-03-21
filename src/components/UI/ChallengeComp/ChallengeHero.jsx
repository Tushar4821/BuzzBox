import React from "react";
import { motion } from "framer-motion";
import { Flame, Zap, Users, Trophy } from "lucide-react";
import heroImg from '../../../assets/gameImg/ChallengeHero.jpg'

function ChallengeHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] text-white pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-10">
      
      {/* 🔥 Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 -left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        
       {/* LEFT CONTENT */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
>
  {/* Badge */}
  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
    <Flame size={16} className="text-pink-400" />
    <span className="text-sm text-white/80">
      Dare. Laugh. Repeat.
    </span>
  </div>

  {/* Heading */}
  <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
    Push Your Limits <br />
    <span className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
      With Crazy Challenges
    </span>
  </h1>

  {/* Description */}
  <p className="mx-auto mt-5 max-w-lg text-base text-white/70 sm:text-lg lg:mx-0">
    From savage dares to hilarious tasks, challenge yourself and your friends.
    Complete them… or face the consequences 😈
  </p>

  {/* CTA Buttons */}
  <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
    <button className="rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 font-semibold transition hover:scale-105">
      Start Challenge 🔥
    </button>

    <button className="rounded-xl border border-white/20 px-6 py-3 transition hover:bg-white/10">
      Explore All
    </button>
  </div>

  {/* Stats */}
  <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/70 lg:justify-start lg:gap-6">
    <div className="flex items-center gap-2">
      <Zap size={16} className="text-yellow-400" />
      200+ Challenges
    </div>
    <div className="flex items-center gap-2">
      <Users size={16} className="text-blue-400" />
      Party Ready
    </div>
    <div className="flex items-center gap-2">
      <Trophy size={16} className="text-green-400" />
      Daily Updates
    </div>
  </div>
</motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7 }}
  className="relative flex justify-center items-center"
>
  {/* Glow behind image */}
  <div className="absolute w-105 h-105 sm:w-125 sm:h-125 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-3xl rounded-full" />

  {/* Gradient Border Wrapper */}
  <div className="p-0.5 rounded-3xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500">
    
    {/* Image Container */}
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-105">
  
  <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl aspect-square">
    <img
      src={heroImg}
      alt="BuzzBox challenges"
      className="h-full w-full object-cover"
    />
  </div>
  </div>
  </div>

  {/* Floating Glass Cards */}
  <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-xl text-sm">
    🔥 Savage Mode
  </div>

  <div className="absolute bottom-4 -right-6 bg-white/10 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-xl text-sm">
    😈 No Mercy
  </div>

  <div className="absolute top-1/2 -right-2 bg-white/10 backdrop-blur-lg border border-white/10 px-3 py-2 rounded-xl text-xs">
    🎯 Daily Dare
  </div>
</motion.div>

      </div>
    </section>
  );
}

export default ChallengeHero;