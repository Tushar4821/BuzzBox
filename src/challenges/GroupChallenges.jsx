import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shuffle, Sparkles } from "lucide-react";
import { groupChallenges } from "../data/groupChallengeData";

function GroupChallenges() {
  const [index, setIndex] = useState(0);

  const challenge = useMemo(() => groupChallenges[index], [index]);

  const nextChallenge = () => {
    setIndex((prev) => (prev + 1) % groupChallenges.length);
  };

  const randomChallenge = () => {
    let next = Math.floor(Math.random() * groupChallenges.length);
    if (next === index) next = (next + 1) % groupChallenges.length;
    setIndex(next);
  };

  return (
    <section className="min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            <Users size={16} />
            Group Chaos
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Bring the whole squad
            <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              into the madness
            </span>
          </h1>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-blue-500/20 via-cyan-500/10 to-purple-500/20 blur-3xl" />

          <div className="relative rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">
                {challenge.tag}
              </span>
              <span className="text-sm text-white/50">
                {index + 1} / {groupChallenges.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.28 }}
              >
                <h2 className="text-2xl font-bold sm:text-3xl">{challenge.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/75">
                  {challenge.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={nextChallenge}
                className="rounded-2xl bg-linear-to-r from-blue-500 via-cyan-500 to-purple-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
              >
                Next Chaos
              </button>

              <button
                onClick={randomChallenge}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/85 transition hover:bg-white/10"
              >
                <Shuffle size={18} />
                Random
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
              <Sparkles size={16} />
              Best played loud, fast, and with zero shame.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroupChallenges;