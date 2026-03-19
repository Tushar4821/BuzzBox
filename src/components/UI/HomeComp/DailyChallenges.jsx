import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  Flame,
  Sparkles,
  GlassWater,
  PartyPopper,
  Volume2,
  VolumeX,
} from "lucide-react";
import shuffleSound from '../../../assets/sounds/shuffle.mp3';
import toggleSound from '../../../assets/sounds/toggle.wav'

function DailyChallenge() {
  const drinkingChallenges = [
    "Take a sip if you have ever lied to get out of plans.",
    "Do your best dramatic speech or take 2 sips.",
    "Let the group choose one word you cannot say for 3 rounds.",
    "Reveal your most embarrassing school memory or take a sip.",
    "Speak in a fake accent for 2 minutes or take 2 sips.",
    "Show your last selfie or take a sip.",
    "Let someone post a harmless emoji from your phone story draft, or take 2 sips.",
    "Tell the group who would survive a zombie apocalypse first.",
  ];

  const normalChallenges = [
    "Do your funniest celebrity impression for 20 seconds.",
    "Talk in rhyme until your next turn.",
    "Reveal your most used emoji and why.",
    "Let the group choose a nickname for you for 5 minutes.",
    "Act like a movie villain until the next round.",
    "Say something nice about every player in 30 seconds.",
    "Do a dramatic catwalk across the room.",
    "Tell your most chaotic college story.",
  ];

  const [isDrinking, setIsDrinking] = useState(true);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const shuffleAudioRef = useRef(new Audio(shuffleSound));
  const toggleAudioRef = useRef(new Audio(toggleSound));

  const currentList = useMemo(
    () => (isDrinking ? drinkingChallenges : normalChallenges),
    [isDrinking]
  );

  const currentChallenge =
    currentList?.[challengeIndex] || "No challenge available";

  const playShuffleSound = () => {
    if (!soundOn) return;

    const audio = shuffleAudioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const playToggleSound = () => {
    if (!soundOn) return;

    const audio = toggleAudioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleShuffle = () => {
    if (!currentList || currentList.length <= 1) return;

    let newIndex = challengeIndex;
    while (newIndex === challengeIndex) {
      newIndex = Math.floor(Math.random() * currentList.length);
    }

    setChallengeIndex(newIndex);
    playShuffleSound();
  };

  const handleModeChange = (mode) => {
    if (mode === isDrinking) return;

    setIsDrinking(mode);
    setChallengeIndex(0);
    playToggleSound();
  };

  const toggleSoundMode = () => {
    setSoundOn((prev) => !prev);
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
            <Flame size={16} />
            Daily Fun Drop
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Your{" "}
            <span className="bg-linear-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Daily Challenge
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            One tap and the vibes begin. Switch between drinking and non-drinking
            mode to match the mood of the group.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => handleModeChange(true)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 sm:text-base ${
                isDrinking
                  ? "bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <GlassWater size={18} />
              Drinking
            </button>

            <button
              onClick={() => handleModeChange(false)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 sm:text-base ${
                !isDrinking
                  ? "bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <PartyPopper size={18} />
              Normal
            </button>
          </div>

          <button
            onClick={toggleSoundMode}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition duration-300 hover:bg-white/10 hover:text-white"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            {soundOn ? "Sound On" : "Sound Off"}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex min-h-70 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 sm:text-sm">
                Featured Challenge
              </span>
              <Sparkles className="text-pink-400" size={20} />
            </div>

            <div className="flex min-h-27.5 items-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentChallenge}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl"
                >
                  {currentChallenge}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleShuffle}
                className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-5 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-105"
              >
                <Shuffle size={18} />
                Shuffle Challenge
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white/90 transition duration-300 hover:bg-white/10">
                Play Now
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="mb-2 text-sm text-pink-300">Mode</p>
              <h4 className="mb-2 text-xl font-semibold">
                {isDrinking ? "Drinking Vibes 🍻" : "Normal Fun 🎉"}
              </h4>
              <p className="text-sm leading-relaxed text-white/70">
                Switch modes anytime based on your group. Same fun, different
                energy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="mb-2 text-sm text-blue-300">Why this section works</p>
              <h4 className="mb-2 text-xl font-semibold">Instant Engagement</h4>
              <p className="text-sm leading-relaxed text-white/70">
                Users don’t just scroll. They interact immediately, which makes
                the homepage feel alive and fun.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyChallenge;