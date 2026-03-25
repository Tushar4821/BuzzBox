import React from "react";
import { motion } from "framer-motion";
import { MoonStar, Users, Heart, Brain, Sparkles } from "lucide-react";

function BuiltForEveryTypeOfNight() {
  const nightModes = [
    {
      icon: <Users className="h-7 w-7 text-pink-300" />,
      title: "House Party Night",
      desc: "For loud laughs, wild dares, savage callouts, and games that turn the whole room chaotic in seconds.",
      vibe: "Funny • Loud • Unpredictable",
      glow: "from-pink-500/20 via-purple-500/10 to-transparent",
      border: "border-pink-400/20",
    },
    {
      icon: <Heart className="h-7 w-7 text-rose-300" />,
      title: "Couples Night",
      desc: "For flirty questions, deeper conversations, teasing choices, and playful moments made for just two.",
      vibe: "Spicy • Intimate • Playful",
      glow: "from-rose-500/20 via-pink-500/10 to-transparent",
      border: "border-rose-400/20",
    },
    {
      icon: <MoonStar className="h-7 w-7 text-cyan-300" />,
      title: "High Mode",
      desc: "For trippy visuals, chill energy, weird thoughts, cosmic vibes, and sessions that feel totally different.",
      vibe: "Trippy • Chill • Immersive",
      glow: "from-cyan-500/20 via-blue-500/10 to-transparent",
      border: "border-cyan-400/20",
    },
    {
      icon: <Brain className="h-7 w-7 text-purple-300" />,
      title: "Brainy Battle",
      desc: "For clever bluffing, mystery, pattern spotting, deduction, and games where brains matter as much as luck.",
      vibe: "Smart • Competitive • Addictive",
      glow: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
      border: "border-purple-400/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Built For Every Type Of Night
          </div>

          <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Whatever the mood,
            <span className="bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}BuzzBox has a mode for it
            </span>
            .
          </h2>

          <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
            Some nights are chaotic, some are cozy, some are brainy, and some
            are just pure weird energy. BuzzBox is built to match all of them.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {nightModes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className={`group relative overflow-hidden rounded-[30px] border bg-white/5 p-6 shadow-2xl backdrop-blur-xl ${item.border}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.glow} opacity-90`}
              />
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black">{item.title}</h3>

                <p className="mt-4 text-sm leading-6 text-white/70 sm:text-base">
                  {item.desc}
                </p>

                <div className="mt-5 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
                  {item.vibe}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BuiltForEveryTypeOfNight;