import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Shuffle, Sparkles, TimerReset } from "lucide-react";
import { coupleChallenges } from "../data/coupleChallengeData";

function CoupleChallenges() {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [isRunning, setIsRunning] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  const audioContextRef = useRef(null);

  const challenge = useMemo(() => coupleChallenges[index], [index]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    return audioContextRef.current;
  };

  const playBeep = (frequency = 700, duration = 0.08, type = "sine", volume = 0.03) => {
    if (!soundOn) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;
    oscillator.start(now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.stop(now + duration);
  };

  const resetTimer = () => {
    setTimeLeft(12);
    setIsRunning(true);
  };

  const nextChallenge = () => {
    setIndex((prev) => (prev + 1) % coupleChallenges.length);
    resetTimer();
    playBeep(820, 0.09, "triangle", 0.04);
  };

  const randomChallenge = () => {
    let next = Math.floor(Math.random() * coupleChallenges.length);
    if (next === index) next = (next + 1) % coupleChallenges.length;

    setIndex(next);
    resetTimer();
    playBeep(920, 0.1, "triangle", 0.04);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      playBeep(260, 0.18, "sawtooth", 0.05);
      setTimeout(() => playBeep(220, 0.22, "sawtooth", 0.05), 120);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 3 && timeLeft > 0) {
      playBeep(980, 0.05, "square", 0.025);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, soundOn]);

  const progressWidth = `${(timeLeft / 12) * 100}%`;

  return (
    <section className="min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
            <Heart size={16} />
            Couple Heat
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Cute, flirty, and a little
            <span className="block bg-linear-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              dangerous together
            </span>
          </h1>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-pink-500/20 via-rose-500/10 to-purple-500/20 blur-3xl" />

          <div className="relative rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-semibold text-pink-200">
                {challenge.tag}
              </span>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">
                  {index + 1} / {coupleChallenges.length}
                </span>

                <button
                  onClick={() => setSoundOn((prev) => !prev)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10"
                >
                  {soundOn ? "Sound On" : "Sound Off"}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-pink-200">
                  <TimerReset size={16} />
                  <span>{isRunning ? "Complete this moment" : "Time’s up"}</span>
                </div>
                <span
                  className={`font-semibold ${
                    timeLeft <= 3 ? "text-rose-300" : "text-white/80"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  key={timeLeft}
                  initial={false}
                  animate={{ width: progressWidth }}
                  transition={{ duration: 0.35 }}
                  className={`h-full rounded-full ${
                    timeLeft <= 3
                      ? "bg-linear-to-r from-rose-400 via-pink-500 to-red-500"
                      : "bg-linear-to-r from-pink-400 via-rose-400 to-purple-400"
                  }`}
                />
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
                <h2 className="text-2xl font-bold sm:text-3xl">{challenge.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/75">
                  {challenge.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={nextChallenge}
                className="rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
              >
                Next Moment
              </button>

              <button
                onClick={randomChallenge}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/85 transition hover:bg-white/10"
              >
                <Shuffle size={18} />
                Surprise Us
              </button>

              <button
                onClick={() => setIsRunning((prev) => !prev)}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/85 transition hover:bg-white/10"
              >
                {isRunning ? "Pause Timer" : "Resume Timer"}
              </button>

              <button
                onClick={resetTimer}
                className="rounded-2xl border border-pink-400/20 bg-pink-500/10 px-5 py-3 font-semibold text-pink-200 transition hover:bg-pink-500/15"
              >
                Restart Timer
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
              <Sparkles size={16} />
              Best with eye contact and zero awkwardness.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoupleChallenges;  