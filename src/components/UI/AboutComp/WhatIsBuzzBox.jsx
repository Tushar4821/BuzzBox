import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Brain, Flame, Users, Heart } from "lucide-react";

function WhatIsBuzzBox() {
  const highlights = [
    {
      icon: <Gamepad2 className="h-6 w-6 text-pink-300" />,
      title: "Party Games",
      desc: "From chaos-filled group games to laugh-out-loud dares, BuzzBox keeps the energy high.",
    },
    {
      icon: <Brain className="h-6 w-6 text-cyan-300" />,
      title: "Mind Games",
      desc: "Add some brainpower with bluff, mystery, and clever game modes that make players think.",
    },
    {
      icon: <Flame className="h-6 w-6 text-orange-300" />,
      title: "Wild Vibes",
      desc: "Switch moods easily with spicy, savage, funny, chill, and high-mode experiences.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-300" />,
      title: "Group Friendly",
      desc: "Built for friends, couples, squads, and house parties — all from one smooth experience.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-pink-200 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              What is BuzzBox
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              More than a game site — it’s your
              <span className="bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}party mood engine
              </span>
              .
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              BuzzBox is a one-stop party game experience made for every kind of
              night. Whether you want hilarious friend-group chaos, spicy couple
              moments, smart brain battles, or trippy high-mode vibes, BuzzBox
              brings everything together in one stylish place.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
              Instead of jumping between random games and boring apps, BuzzBox
              gives you a premium, mood-based experience where you can pick your
              vibe, launch a game fast, and keep the night interesting.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <Heart className="h-5 w-5 text-pink-300" />
                <span className="font-medium text-white/85">Couples Nights</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <Users className="h-5 w-5 text-cyan-300" />
                <span className="font-medium text-white/85">Group Chaos</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <Brain className="h-5 w-5 text-purple-300" />
                <span className="font-medium text-white/85">Brainy Battles</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhatIsBuzzBox;