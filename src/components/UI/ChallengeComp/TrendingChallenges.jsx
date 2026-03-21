import React from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, ArrowRight, Zap } from "lucide-react";

const trendingChallenges = [
  {
    text: "Text ‘I have something to tell you’ and don’t reply for 5 minutes 😈",
    tag: "Hot Right Now",
    vibe: "Social Chaos",
  },
  {
    text: "Send ‘I miss you’ to someone random and wait for the reply 😂",
    tag: "Most Played",
    vibe: "Funny Risk",
  },
  {
    text: "Call someone and speak nonsense for 20 seconds without laughing",
    tag: "Quick Pick",
    vibe: "Instant Fun",
  },
  {
    text: "Send a risky emoji to your crush and act normal 😏",
    tag: "Spicy",
    vibe: "Bold Move",
  },
  {
    text: "Reveal your last embarrassing search in the group chat 🔥",
    tag: "Viral",
    vibe: "Reaction Bait",
  },
  {
    text: "Text someone ‘guess what 😈’ and disappear for 10 minutes",
    tag: "Danger Zone",
    vibe: "Maximum Chaos",
  },
];

function TrendingChallenges() {
  return (
    <section className="relative bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
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
            Trending Picks
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Popular challenges
            <span className="mt-1 block bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              everyone wants to try
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Quick picks for when you want instant fun without scrolling forever.
            Tap one, send it, and let the chaos start.
          </p>
        </motion.div>

        {/* cards */}
        <div className="mt-12 overflow-x-auto overflow-y-hidden pb-3 no-scrollbar">
          <div className="flex w-max gap-5 px-1">
            {trendingChallenges.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative w-72.5shrink-0 sm:w-[320px]"
              >
                <div className="absolute inset-0 rounded-[28px] bg-linear-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111118]/80 px-3 py-1.5 text-xs font-medium text-white/80">
                      <Flame size={14} className="text-pink-400" />
                      {item.tag}
                    </div>

                    <div className="rounded-2xl bg-white/5 p-2 text-white/70">
                      <Sparkles size={16} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-lg font-semibold leading-relaxed text-white">
                      {item.text}
                    </p>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                    <Zap size={13} />
                    {item.vibe}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
                      Try Now
                    </button>

                    <div className="flex items-center gap-2 text-sm font-medium text-white/60 transition group-hover:text-white">
                      Open
                      <ArrowRight
                        size={16}
                        className="transition duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingChallenges;