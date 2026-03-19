import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Users,
  Split,
  Check,
} from "lucide-react";
import { wouldYouRatherQuestions } from "../data/wouldYouRatherData";
import useGame from "./tempGame";
import PlayerSetup from "./PlayerSetup";

function WouldYouRather() {
  const {
    players,
    currentPlayer,
    mode,
    setMode,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const getRandomPrompt = () => {
    const source = wouldYouRatherQuestions[mode];

    if (!source || source.length === 0) {
      console.log("No questions found for mode:", mode);
      return;
    }

    const random = source[Math.floor(Math.random() * source.length)];
    setCurrentPrompt(random);
    setSelectedOption("");
    setStep("question");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setCurrentPrompt(null);
    setSelectedOption("");
    setStep("ready");
  };

  const handleSelect = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
  };

  const handleNextPlayer = () => {
    setCurrentPrompt(null);
    setSelectedOption("");
    nextTurn();
    setStep("ready");
  };

  const handleReset = () => {
    setCurrentPrompt(null);
    setSelectedOption("");
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
            Would You Rather
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Pick your poison and defend your choice.
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
                Pick your vibe
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Choose your mode first.
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
                    Riskier choices for a messier night.
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
                    Spicy choices without the drinks.
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
                Ready to choose?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                No safe option. Just pick one.
              </p>

              <button
                type="button"
                onClick={getRandomPrompt}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                Start Round
              </button>
            </div>
          )}

          {step === "question" && currentPrompt && (
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
                <Split size={16} />
                Choose one and own it
              </div>

              <p className="mb-8 text-lg text-white/90 sm:text-2xl">
                {currentPrompt.question}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[currentPrompt.optionA, currentPrompt.optionB].map((option, index) => {
                  const isPicked = selectedOption === option;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`rounded-3xl border p-6 text-left transition duration-300 ${
                        isPicked
                          ? "border-pink-400/40 bg-linear-to-br from-pink-500/20 via-purple-500/10 to-transparent"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-base font-medium text-white/90 sm:text-lg">
                          {option}
                        </p>

                        {isPicked && (
                          <span className="rounded-full bg-pink-500/20 p-2 text-pink-300">
                            <Check size={16} />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedOption && (
                <div className="mt-8">
                  <div className="mx-auto inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                    You picked: {selectedOption}
                  </div>

                  {mode === "drinking" && (
                    <p className="mt-4 text-sm text-pink-300">
                      Anyone who would never choose this takes a sip 🍻
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={getRandomPrompt}
                  className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Next Prompt
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

export default WouldYouRather;