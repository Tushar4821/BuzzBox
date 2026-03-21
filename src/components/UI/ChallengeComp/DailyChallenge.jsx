import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  GlassWater,
  Copy,
  Share2,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { challengeData } from "../../../data/dailyChallengesData";

function DailyChallenge() {
  const [mode, setMode] = useState("nonDrinking");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [copied, setCopied] = useState(false);

  const currentList = useMemo(() => challengeData[mode] || [], [mode]);

  const currentChallenge =
    currentList.length > 0
      ? currentList[index % currentList.length]
      : "No challenges found.";

  const nextChallenge = () => {
    if (!currentList.length) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % currentList.length);
    setCopied(false);
  };

  const randomChallenge = () => {
    if (!currentList.length) return;
    let randomIndex = Math.floor(Math.random() * currentList.length);

    if (currentList.length > 1) {
      while (randomIndex === index) {
        randomIndex = Math.floor(Math.random() * currentList.length);
      }
    }

    setDirection(1);
    setIndex(randomIndex);
    setCopied(false);
  };

  const switchMode = (selectedMode) => {
    setMode(selectedMode);
    setIndex(0);
    setDirection(1);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentChallenge);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShare = async () => {
    const shareText = `🔥 BuzzBox Challenge:\n\n${currentChallenge}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "BuzzBox Challenge",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Top heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
            <Sparkles size={16} className="text-pink-400" />
            BuzzBox Daily Challenge
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            One bold move.
            <span className="mt-1 block bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              New chaos every tap.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Pick your mode, reveal a challenge, and make the moment way more fun.
            Built for friends, parties, and just enough spice to keep things
            interesting.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left side - main challenge card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            {/* outer glow */}
            <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
              {/* top row */}
              <div className="mb-4 flex flex-col gap-4 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111118]/80 px-3 py-2 text-xs font-medium text-white/80">
                    <Flame size={15} className="text-pink-400" />
                    Daily Pick
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111118]/80 px-3 py-2 text-xs font-medium text-white/80">
                    <Zap size={15} className="text-yellow-400" />
                    {index + 1} / {currentList.length}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => switchMode("nonDrinking")}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                      mode === "nonDrinking"
                        ? "bg-white text-black shadow-lg"
                        : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <Sparkles size={15} />
                    Non-Drinking
                  </button>

                  <button
                    onClick={() => switchMode("drinking")}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                      mode === "drinking"
                        ? "bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg"
                        : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <GlassWater size={15} />
                    Drinking
                  </button>
                </div>
              </div>

              {/* animated challenge card */}
              <div className="relative min-h-62.5 sm:min-h-70">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${mode}-${index}`}
                    custom={direction}
                    initial={{ opacity: 0, x: 70, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -70, scale: 0.96 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <div className="flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-[#111118]/85 p-6 shadow-xl sm:p-8">
                      <div>
                        <div className="mb-4 flex items-center gap-2 text-pink-400">
                          <Flame size={18} />
                          <span className="text-sm font-medium tracking-wide">
                            Challenge Unlocked
                          </span>
                        </div>

                        <p className="text-xl font-semibold leading-relaxed text-white sm:text-2xl sm:leading-relaxed">
                          {currentChallenge}
                        </p>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-2">
                        <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs text-pink-300">
                          Medium Spicy
                        </span>
                        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                          Party Ready
                        </span>
                        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                          Social Chaos
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* action buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={nextChallenge}
                  className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                >
                  <RefreshCw size={17} />
                  Next Challenge
                </button>

                <button
                  onClick={randomChallenge}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/10"
                >
                  Random Pick 🎲
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/10"
                >
                  {copied ? <CheckCircle2 size={17} /> : <Copy size={17} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/10"
                >
                  <Share2 size={17} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right side - supporting cards */}
         <motion.div
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
>
  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
    <div className="mb-3 inline-flex rounded-2xl bg-pink-500/15 p-3 text-pink-400">
      <Flame size={22} />
    </div>
    <h3 className="text-lg font-semibold text-white">
      Better than boring prompts
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-white/65">
      These challenges are made to feel social, playful, and a little
      risky — enough to get reactions without killing the vibe.
    </p>
  </div>

  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
    <div className="mb-3 inline-flex rounded-2xl bg-blue-500/15 p-3 text-blue-400">
      <Share2 size={22} />
    </div>
    <h3 className="text-lg font-semibold text-white">
      Built to be shared
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-white/65">
      Copy a challenge, drop it in the group chat, or share it with a
      friend instantly for even more chaos.
    </p>
  </div>

  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl sm:col-span-2 lg:col-span-1">
    <div className="mb-3 inline-flex rounded-2xl bg-purple-500/15 p-3 text-purple-400">
      <Zap size={22} />
    </div>
    <h3 className="text-lg font-semibold text-white">
      Two modes, same energy
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-white/65">
      Switch between drinking and non-drinking mode anytime without
      losing the premium feel of the experience.
    </p>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
}

export default DailyChallenge;