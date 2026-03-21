import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, GlassWater, Flame, ArrowRight } from "lucide-react";

import groupImg from '../../../assets/challengeImg/group.jpg';
import coupleImg from '../../../assets/challengeImg/couple.jpg';
import drinkImg from '../../../assets/challengeImg/drink.jpg';
import savageImg from '../../../assets/challengeImg/savage.jpg';

function ChallengeCategories() {
  
const categories = [
  {
    title: "Group Chaos",
    desc: "Fun, messy, and loud challenges made for friends, parties, and full-on group madness.",
    icon: <Users size={20} />,
    badge: "40+ Challenges",
    image: groupImg,
    iconBg: "bg-blue-500/20 text-blue-300",
    overlay: "from-blue-900/40 via-black/30 to-black/70",
    accent: "from-blue-400 via-cyan-400 to-purple-400",
    position: "object-center",
  },
  {
    title: "Couple Heat",
    desc: "Cute, flirty, and spicy challenges perfect for couples, late-night vibes, and playful tension.",
    icon: <Heart size={20} />,
    badge: "30+ Challenges",
    image: coupleImg,
    iconBg: "bg-pink-500/20 text-pink-300",
    overlay: "from-pink-900/40 via-black/30 to-black/70",
    accent: "from-pink-400 via-rose-400 to-purple-400",
    position: "object-top",
  },
  {
    title: "Drink & Dare",
    desc: "Turn up the energy with bold party challenges built for drinking mode and chaotic nights.",
    icon: <GlassWater size={20} />,
    badge: "35+ Challenges",
    image: drinkImg,
    iconBg: "bg-cyan-500/20 text-cyan-300",
    overlay: "from-cyan-900/40 via-black/30 to-black/70",
    accent: "from-cyan-400 via-blue-400 to-purple-400",
    position: "object-center",
  },
  {
    title: "Savage Mode",
    desc: "Risky, shameless, and reaction-worthy prompts for people who want maximum chaos.",
    icon: <Flame size={20} />,
    badge: "25+ Challenges",
    image: savageImg,
    iconBg: "bg-orange-500/20 text-orange-300",
    overlay: "from-orange-900/40 via-black/30 to-black/70",
    accent: "from-orange-400 via-pink-400 to-red-400",
    position: "object-top",
  },
];

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
            <Flame size={16} className="text-pink-400" />
            Pick Your Chaos
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Challenge categories for
            <span className="mt-1 block bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              every kind of vibe
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Go cute, savage, social, or full party mode. Pick the category that
            matches your mood and let BuzzBox handle the chaos.
          </p>
        </motion.div>

        {/* cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative"
            >
              {/* glow */}
              <div
                className={`absolute inset-0 rounded-[30px] bg-linear-to-r ${item.accent} opacity-0 blur-2xl transition duration-500 group-hover:opacity-20`}
              />

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20">
                {/* image area */}
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <img
                    src={item.image}
                    alt={item.title}
                   className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${item.position}`}
                  />

                  <div
                    className={`absolute inset-0 bg-linear-to-t ${item.overlay}`}
                  />

                  {/* top row */}
                  <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                    <div
                      className={`inline-flex rounded-2xl border border-white/10 p-3 backdrop-blur-md ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>

                    <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* bottom text on image */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {item.title}
                    </h3>
                    <div
                      className={`mt-2 h-1 w-24 rounded-full bg-linear-to-r ${item.accent}`}
                    />
                  </div>
                </div>

                {/* content area */}
                <div className="bg-[#0f0f14]/90 p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                    {item.desc}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
                      Explore
                    </button>

                    <div className="flex items-center gap-2 text-sm font-medium text-white/70 transition group-hover:text-white">
                      View More
                      <ArrowRight
                        size={16}
                        className="transition duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChallengeCategories;