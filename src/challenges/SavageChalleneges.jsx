import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Shuffle, Siren } from "lucide-react";
import { savageChallenges } from "../data/savageChallengeData";
import faaaahSound from '../assets/sounds/faaaah.mp3';

function SavageChallenges() {
  const [index, setIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);

  const challenge = useMemo(() => savageChallenges[index], [index]);

  const nextChallenge = () => {
    setIndex((prev) => (prev + 1) % savageChallenges.length);
  };

  const randomChallenge = () => {
    let next = Math.floor(Math.random() * savageChallenges.length);
    if (next === index) next = (next + 1) % savageChallenges.length;
    setIndex(next);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (!soundOn) return;

    if (challenge.ultra) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // browser may block autoplay before first interaction
      });
    }
  }, [challenge, soundOn]);

  return (
    <section className="min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 lg:px-10">
      <audio ref={audioRef} src={faaaahSound} preload="auto" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
            <Flame size={16} />
            Savage Mode
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Enter at your own risk
            <span className="block bg-linear-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              feelings may be damaged
            </span>
          </h1>
        </div>

        <div className="relative">
          <div
            className={`absolute inset-0 rounded-4xl blur-3xl transition-all duration-500 ${
              challenge.ultra
                ? "bg-linear-to-r from-red-500/30 via-pink-500/20 to-orange-500/30"
                : "bg-linear-to-r from-orange-500/20 via-pink-500/10 to-red-500/20"
            }`}
          />

          <motion.div
            animate={
              challenge.ultra
                ? { x: [0, -4, 4, -3, 3, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.35 }}
            className={`relative rounded-4xl border bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 ${
              challenge.ultra
                ? "border-red-400/40 shadow-[0_0_40px_rgba(255,60,60,0.18)]"
                : "border-white/10"
            }`}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    challenge.ultra
                      ? "bg-red-500/20 text-red-200"
                      : "bg-orange-500/15 text-orange-200"
                  }`}
                >
                  {challenge.tag}
                </span>

                {challenge.ultra && (
                  <span className="rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-xs font-bold tracking-wide text-red-200">
                    ULTRA SAVAGE
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">
                  {index + 1} / {savageChallenges.length}
                </span>

                <button
                  onClick={() => setSoundOn((prev) => !prev)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10"
                >
                  {soundOn ? "Sound On" : "Sound Off"}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.28 }}
              >
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {challenge.title}
                </h2>

                <p className="mt-4 text-lg leading-relaxed text-white/75">
                  {challenge.text}
                </p>

                {challenge.ultra && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200"
                  >
                    💀 Ultra Savage unlocked. Brace for impact.
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={nextChallenge}
                className="rounded-2xl bg-linear-to-r from-orange-500 via-pink-500 to-red-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
              >
                Next Victim
              </button>

              <button
                onClick={randomChallenge}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/85 transition hover:bg-white/10"
              >
                <Shuffle size={18} />
                Random Damage
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
              <Siren size={16} />
              Warning: this category may start arguments.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SavageChallenges;