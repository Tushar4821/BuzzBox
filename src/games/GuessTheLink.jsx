import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Users,
  Link2,
  Eye,
  EyeOff,
  Lightbulb,
} from "lucide-react";
import { guessTheLinkData } from "../data/guessTheLinkData";
import useGame from "./tempGame";
import PlayerSetup from "./PlayerSetup";

function GuessTheLink() {
  const {
    players,
    currentPlayer,
    mode,
    setMode,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [currentSet, setCurrentSet] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const getRandomSet = () => {
    const source = guessTheLinkData[mode];

    if (!source || source.length === 0) return;

    const random = source[Math.floor(Math.random() * source.length)];
    setCurrentSet(random);
    setShowAnswer(false);
    setStep("question");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setCurrentSet(null);
    setShowAnswer(false);
    setStep("ready");
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const handleHideAnswer = () => {
    setShowAnswer(false);
  };

  const handleNextPlayer = () => {
    setCurrentSet(null);
    setShowAnswer(false);
    nextTurn();
    setStep("ready");
  };

  const handleReset = () => {
    setCurrentSet(null);
    setShowAnswer(false);
    setStep("players");
    resetContextGame();
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-24 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-pink-500/12 blur-3xl" />
        <div className="absolute top-28 -right-20 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles size={16} className="text-pink-400" />
            BuzzBox Party Game
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Guess The Link
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Find the hidden connection between the clues before the answer is
            revealed.
          </p>
        </motion.div>

        <div className="relative z-20 rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          {step === "players" && <PlayerSetup onStart={() => setStep("mode")} />}

          {step === "mode" && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  <Users size={15} className="text-purple-300" />
                  {players.length} Players
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer} starts first
                </div>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Pick your mode
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Choose the kind of clues you want for this round.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleModeSelect("drinking")}
                  className="rounded-3xl border border-pink-500/20 bg-linear-to-br from-pink-500/20 via-purple-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.02] hover:border-pink-400/30"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-pink-500/20 p-3 text-pink-400">
                    <Flame size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">Drinking Mode</h3>
                  <p className="mt-2 text-sm text-white/65">
                    Party-style clues with a more chaotic vibe.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeSelect("nonDrinking")}
                  className="rounded-3xl border border-blue-500/20 bg-linear-to-br from-blue-500/20 via-cyan-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.02] hover:border-blue-400/30"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-blue-500/20 p-3 text-blue-400">
                    <GlassWater size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">Non-Drinking Mode</h3>
                  <p className="mt-2 text-sm text-white/65">
                    Fun clue rounds for everyone to guess together.
                  </p>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep("players")}
                className="mt-8 text-sm text-white/55 hover:text-white"
              >
                Edit players
              </button>
            </div>
          )}

          {step === "ready" && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Turn
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {mode === "drinking" ? "Drinking Mode" : "Non-Drinking Mode"}
                </span>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Ready to guess the link?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Read the clues carefully and figure out what connects them.
              </p>

              <button
                type="button"
                onClick={getRandomSet}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                Start Round
              </button>
            </div>
          )}

          {step === "question" && currentSet && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Turn
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {mode === "drinking" ? "Drinking Mode" : "Non-Drinking Mode"}
                </span>
              </div>

              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                <Link2 size={16} />
                Find the connection
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {currentSet.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-lg"
                  >
                    <p className="text-lg font-semibold text-white/90 sm:text-xl">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              {!showAnswer && (
                <div className="mt-8">
                  <p className="mb-4 text-sm text-white/60 sm:text-base">
                    Discuss with the group and try to guess the hidden link.
                  </p>

                  <button
                    type="button"
                    onClick={handleRevealAnswer}
                    className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                  >
                    <Eye size={18} />
                    Reveal Answer
                  </button>
                </div>
              )}

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8"
                >
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
                    <Lightbulb size={16} />
                    Answer Revealed
                  </div>

                  <div className="mt-4 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-yellow-200/70">
                      The link is
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      {currentSet.answer}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleHideAnswer}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <EyeOff size={16} />
                    Hide answer
                  </button>
                </motion.div>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={getRandomSet}
                  className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Next Link
                </button>

                <button
                  type="button"
                  onClick={handleNextPlayer}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85"
                >
                  Next Player
                </button>

                <button
                  type="button"
                  onClick={() => setStep("ready")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GuessTheLink;