import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Users,
  Split,
  Check,
  MessageCircleHeart,
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

  const getModeLabel = () => {
    if (mode === "drinking") return "Drinking Mode";
    if (mode === "nonDrinking") return "Non-Drinking Mode";
    if (mode === "naughty") return "Naughty Mode 😈";
    return "";
  };

  const getRandomPrompt = () => {
    const source = wouldYouRatherQuestions[mode];

    if (!source || source.length === 0) return;

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
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-pink-500/12 blur-3xl" />
        <div className="absolute top-28 -right-20 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* HEADER */}
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

          <h1 className="text-4xl font-bold sm:text-5xl">
            Would You Rather
          </h1>

          <p className="mt-4 text-white/65">
            Pick your poison and defend your choice.
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8">

          {/* PLAYER SETUP */}
          {step === "players" && (
            <PlayerSetup onStart={() => setStep("mode")} />
          )}

          {/* MODE SELECT */}
          {step === "mode" && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Pick your vibe</h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                {/* DRINKING */}
                <button
                  onClick={() => handleModeSelect("drinking")}
                  className="rounded-3xl border border-pink-500/20 bg-pink-500/10 p-6 hover:scale-[1.05]"
                >
                  <Flame className="mb-3 text-pink-400" />
                  Drinking Mode
                </button>

                {/* NON DRINKING */}
                <button
                  onClick={() => handleModeSelect("nonDrinking")}
                  className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 hover:scale-[1.05]"
                >
                  <GlassWater className="mb-3 text-blue-400" />
                  Non-Drinking
                </button>

                {/* NAUGHTY */}
                <button
                  onClick={() => handleModeSelect("naughty")}
                  className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 hover:scale-[1.08]"
                >
                  <MessageCircleHeart className="mb-3 text-rose-400" />
                  Naughty Mode 😈
                </button>

              </div>
            </div>
          )}

          {/* READY */}
          {step === "ready" && (
            <div className="text-center">
              <p className="mb-4">{currentPlayer}'s Turn</p>
              <p className="text-sm text-white/60">{getModeLabel()}</p>

              <button
                onClick={getRandomPrompt}
                className="mt-6 rounded-2xl bg-pink-500 px-6 py-3"
              >
                Start
              </button>
            </div>
          )}

          {/* QUESTION */}
          {step === "question" && currentPrompt && (
            <div className="text-center">
              <p className="mb-6 text-xl">{currentPrompt.question}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[currentPrompt.optionA, currentPrompt.optionB].map((option) => {
                  const isPicked = selectedOption === option;

                  return (
                    <button
                      onClick={() => handleSelect(option)}
                      className={`p-6 rounded-2xl border ${
                        isPicked ? "border-pink-400 bg-pink-500/10" : ""
                      }`}
                    >
                      {option}
                      {isPicked && <Check />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-3 justify-center">
                <button onClick={getRandomPrompt}>Next</button>
                <button onClick={handleNextPlayer}>Next Player</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WouldYouRather;