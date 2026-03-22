import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassWater, Shuffle, Flame, Volume2, VolumeX } from "lucide-react";
import { drinkChallenges } from "../data/drinkChallengeData";

import pourMp3 from "../assets/sounds/pouring.mp3";
import bellMp3 from "../assets/sounds/bell.mp3";
import clickMp3 from "../assets/sounds/click.mp3";

function DrinkChallenges() {
  const [index, setIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const challenge = useMemo(() => drinkChallenges[index], [index]);

  const pourAudioRef = useRef(null);
  const bellAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    pourAudioRef.current = new Audio(pourMp3);
    bellAudioRef.current = new Audio(bellMp3);
    clickAudioRef.current = new Audio(clickMp3);

    pourAudioRef.current.preload = "auto";
    bellAudioRef.current.preload = "auto";
    clickAudioRef.current.preload = "auto";

    pourAudioRef.current.volume = 1;
    bellAudioRef.current.volume = 1;
    clickAudioRef.current.volume = 1;

    console.log("Audio objects created");
    console.log("Pour src:", pourAudioRef.current.src);
    console.log("Bell src:", bellAudioRef.current.src);
    console.log("Click src:", clickAudioRef.current.src);
  }, []);

  const playAudio = (audioRef, name = "sound", duration = 3000) => {
  if (!soundOn || !audioRef.current) return;

  const audio = audioRef.current;

  audio.pause();
  audio.currentTime = 0;

  audio.play()
    .then(() => {
      console.log(`${name} played`);

      // ⏱️ stop after duration (3 sec default)
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, duration);

    })
    .catch((err) => {
      console.log(`${name} failed`, err);
    });
};

  const nextChallenge = () => {
    playAudio(clickAudioRef, "click");
    setIndex((prev) => (prev + 1) % drinkChallenges.length);
  };

  const randomChallenge = () => {
    playAudio(clickAudioRef, "click");
    let next = Math.floor(Math.random() * drinkChallenges.length);
    if (next === index) next = (next + 1) % drinkChallenges.length;
    setIndex(next);
  };

  useEffect(() => {
    if (!challenge) return;

    const combined =
      `${challenge.tag || ""} ${challenge.title || ""} ${challenge.text || ""}`.toLowerCase();

    if (
      combined.includes("shot") ||
      combined.includes("extreme") ||
      combined.includes("savage")
    ) {
      playAudio(bellAudioRef, "bell",1500);
    } else if (
      combined.includes("drink") ||
      combined.includes("sip") ||
      combined.includes("chug")
    ) {
      playAudio(pourAudioRef, "pour",3000);
    }
  }, [index, challenge]);

  return (
    <section className="min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
            <GlassWater size={16} />
            Drink & Dare
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Party mode is now
            <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              fully unlocked
            </span>
          </h1>
        </div>

        <div className="mb-4 flex justify-center">
          <button
            onClick={() => setSoundOn((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            Sound {soundOn ? "On" : "Off"}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl" />

          <div className="relative rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                {challenge.tag}
              </span>
              <span className="text-sm text-white/50">
                {index + 1} / {drinkChallenges.length}
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
                className="rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
              >
                Next Round
              </button>

              <button
                onClick={randomChallenge}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/85 transition hover:bg-white/10"
              >
                <Shuffle size={18} />
                Random Shot
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
              <Flame size={16} />
              Chaos increases with every click.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DrinkChallenges;