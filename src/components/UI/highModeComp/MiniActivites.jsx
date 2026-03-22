import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Sparkles,
  Waves,
  BrainCircuit,
  X,
  RefreshCw,
  TimerReset,
  Play,
} from "lucide-react";

function MiniActivities() {
  const [activeActivity, setActiveActivity] = useState(null);
  const [stareSeconds, setStareSeconds] = useState(15);
  const [stareRunning, setStareRunning] = useState(false);
  const [thought, setThought] = useState("");
  const [vibeText, setVibeText] = useState("Floating through the universe...");
  const [pulse, setPulse] = useState(false);

  const weirdThoughts = useMemo(
    () => [
      "What if silence actually has a sound but our brain edits it out?",
      "Maybe dreams are just another tab your mind opens at night.",
      "What if every version of you is cheering for this one right now?",
      "If time feels slow when you’re high, maybe your mind is finally noticing everything.",
      "What if colors are just emotions wearing outfits?",
      "Maybe the universe is less a place and more a feeling.",
      "What if your thoughts are clouds and you don’t have to hold every one of them?",
      "Imagine if déjà vu is your brain remembering a moment from another reality.",
      "What if stars are just tiny reminders that darkness can glow too?",
      "Maybe your vibe is changing the room more than the room is changing you.",
      "What if being lost is just the first step to noticing something new?",
      "Maybe calm is not emptiness, maybe calm is full in a softer way.",
    ],
    []
  );

  const vibeLines = useMemo(
    () => [
      "Floating through the universe...",
      "Your room is now a spaceship.",
      "Breathe in. Let the glow reach your brain.",
      "You are not late. You are orbiting.",
      "The colors know what they’re doing.",
      "Close your eyes. The visuals stay anyway.",
      "You are drifting in premium high mode.",
      "Your thoughts are now in surround sound.",
    ],
    []
  );

  const activities = [
    {
      id: "stare",
      title: "Stare Challenge",
      desc: "Pick a timer and try not to blink while the orb pulls you in.",
      icon: Eye,
    },
    {
      id: "hypno",
      title: "Hypno Loop",
      desc: "Open a trippy visual loop and just zone out for a minute.",
      icon: Waves,
    },
    {
      id: "thought",
      title: "Random Thought",
      desc: "Generate weird, deep, late-night type thoughts instantly.",
      icon: BrainCircuit,
    },
    {
      id: "vibe",
      title: "Vibe Booster",
      desc: "Tap to switch the energy and let the screen pulse with you.",
      icon: Sparkles,
    },
  ];

  useEffect(() => {
    let interval;

    if (activeActivity === "stare" && stareRunning && stareSeconds > 0) {
      interval = setInterval(() => {
        setStareSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (stareSeconds === 0) {
      setStareRunning(false);
    }

    return () => clearInterval(interval);
  }, [activeActivity, stareRunning, stareSeconds]);

  const openActivity = (id) => {
    setActiveActivity(id);

    if (id === "thought") {
      randomThought();
    }

    if (id === "vibe") {
      randomVibe();
    }
  };

  const closeActivity = () => {
    setActiveActivity(null);
    setStareRunning(false);
    setStareSeconds(15);
  };

  const startStare = (time) => {
    setStareSeconds(time);
    setStareRunning(true);
  };

  const resetStare = () => {
    setStareRunning(false);
    setStareSeconds(15);
  };

  const randomThought = () => {
    const random =
      weirdThoughts[Math.floor(Math.random() * weirdThoughts.length)];
    setThought(random);
  };

  const randomVibe = () => {
    const random = vibeLines[Math.floor(Math.random() * vibeLines.length)];
    setVibeText(random);
    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, 700);
  };

  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-sm text-pink-200 backdrop-blur-xl">
              <Sparkles size={16} />
              Mini Activities
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Play While You’re{" "}
              <span className="bg-linear-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                High
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Tiny trippy interactions to make High Mode feel alive. Tap any
              activity and drift into the vibe.
            </p>
          </motion.div>

          {/* cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {activities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02, rotateX: 4, rotateY: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openActivity(item.id)}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-fuchsia-500/5 to-cyan-400/10 opacity-80 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-pink-500/15 blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />

                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-pink-200">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {item.desc}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fuchsia-200">
                      Open activity
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* modal */}
      <AnimatePresence>
        {activeActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-4xl border border-white/10 bg-[#0c0b14]/95 p-6 text-white shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-8"
            >
              <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-transparent to-cyan-500/10" />
              <div className="absolute top-0 left-1/4 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

              <button
                onClick={closeActivity}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <div className="relative z-10">
                {activeActivity === "stare" && (
                  <div className="text-center">
                    <h3 className="text-2xl font-black sm:text-3xl">
                      👁️ Stare Challenge
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                      Pick a timer, lock your eyes on the center, and try not to
                      blink. Pure high mode discipline.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      {[10, 15, 20, 30].map((sec) => (
                        <button
                          key={sec}
                          onClick={() => startStare(sec)}
                          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                          {sec}s
                        </button>
                      ))}

                      <button
                        onClick={resetStare}
                        className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-200 transition hover:bg-pink-500/20"
                      >
                        <TimerReset size={16} />
                        Reset
                      </button>
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-center">
                      <motion.div
                        animate={{
                          scale: stareRunning ? [1, 1.12, 1] : [1, 1.05, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: stareRunning ? 4 : 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="relative flex h-64 w-64 items-center justify-center rounded-full"
                      >
                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-400 blur-md" />
                        <div className="absolute inset-5 rounded-full border border-white/20 bg-[#120f1f]" />
                        <div className="absolute inset-[32%] rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.6)]" />
                        <div className="absolute inset-[42%] rounded-full bg-black" />
                      </motion.div>

                      <div className="mt-8 text-5xl font-black tracking-tight">
                        {stareSeconds}s
                      </div>

                      <p className="mt-3 text-sm text-white/65">
                        {stareSeconds === 0
                          ? "You survived the stare 👁️"
                          : stareRunning
                          ? "Don’t blink..."
                          : "Choose a timer to begin"}
                      </p>
                    </div>
                  </div>
                )}

                {activeActivity === "hypno" && (
                  <div className="text-center">
                    <h3 className="text-2xl font-black sm:text-3xl">
                      🌀 Hypno Loop
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                      No thoughts. No tasks. Just spin, stare, and drift.
                    </p>

                    <div className="mt-10 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="relative flex h-72 w-72 items-center justify-center rounded-full"
                      >
                        <div className="absolute inset-0 rounded-full border-8 border-fuchsia-500/20" />
                        <div className="absolute inset-4 rounded-full border-8 border-cyan-400/25" />
                        <div className="absolute inset-8 rounded-full border-8 border-pink-400/25" />
                        <div className="absolute inset-12 rounded-full border-8 border-violet-300/25" />
                        <div className="absolute inset-16 rounded-full border-8 border-cyan-200/20" />
                        <div className="absolute inset-24 rounded-full bg-black/40 backdrop-blur-md" />
                        <div className="absolute text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                          drift
                        </div>
                      </motion.div>
                    </div>

                    <p className="mt-8 text-sm text-fuchsia-200/80">
                      Let your brain take the scenic route.
                    </p>
                  </div>
                )}

                {activeActivity === "thought" && (
                  <div className="text-center">
                    <h3 className="text-2xl font-black sm:text-3xl">
                      🧠 Random Thought
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                      Tap the button and unlock a thought that feels suspiciously
                      important when you’re high.
                    </p>

                    <motion.div
                      key={thought}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-8 text-lg font-medium leading-8 text-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    >
                      {thought}
                    </motion.div>

                    <button
                      onClick={randomThought}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                    >
                      <RefreshCw size={18} />
                      New Thought
                    </button>
                  </div>
                )}

                {activeActivity === "vibe" && (
                  <div className="text-center">
                    <h3 className="text-2xl font-black sm:text-3xl">
                      ✨ Vibe Booster
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                      Tap the button and let the energy switch up. Tiny visual,
                      big mood.
                    </p>

                    <motion.div
                      animate={
                        pulse
                          ? { scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }
                          : {}
                      }
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-10"
                    >
                      <motion.div
                        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                        transition={{
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute left-10 top-8 h-28 w-28 rounded-full bg-pink-500/20 blur-3xl"
                      />
                      <motion.div
                        animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl"
                      />

                      <div className="relative z-10">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10">
                          <Play size={22} />
                        </div>

                        <motion.p
                          key={vibeText}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mx-auto max-w-xl text-xl font-semibold leading-8 text-white/90"
                        >
                          {vibeText}
                        </motion.p>
                      </div>
                    </motion.div>

                    <button
                      onClick={randomVibe}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-200 transition hover:scale-105 hover:bg-cyan-400/20"
                    >
                      <Sparkles size={18} />
                      Change The Vibe
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MiniActivities;