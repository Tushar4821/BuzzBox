import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Users,
  BadgeAlert,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react";
import { hotTakesQuestions } from "../data/hotTakesData";
import useGame from "./tempGame";
import PlayerSetup from "./PlayerSetup";

function HotTakes() {
  const {
    players,
    currentPlayer,
    mode,
    setMode,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [take, setTake] = useState("");
  const [response, setResponse] = useState("");

  const getRandomTake = () => {
    const source = hotTakesQuestions[mode];

    if (!source || source.length === 0) return;

    const random = source[Math.floor(Math.random() * source.length)];
    setTake(random);
    setResponse("");
    setStep("question");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setTake("");
    setResponse("");
    setStep("ready");
  };

  const handleAgree = () => {
    setResponse("agree");
  };

  const handleDisagree = () => {
    setResponse("disagree");
  };

  const handleNextPlayer = () => {
    setTake("");
    setResponse("");
    nextTurn();
    setStep("ready");
  };

  const handleReset = () => {
    setTake("");
    setResponse("");
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
            Hot Takes
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Drop bold opinions, defend your take, and let the group go wild.
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
                Choose whether this debate gets messy or just loud.
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
                    Defend your take or make someone sip.
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
                    Pure debate, chaos, and strong opinions.
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
                Ready to offend the room?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                A hot take is coming. Pick a side and defend it.
              </p>

              <button
                type="button"
                onClick={getRandomTake}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                Start Round
              </button>
            </div>
          )}

          {step === "question" && take && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Turn
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {mode === "drinking" ? "Drinking Mode" : "Non-Drinking Mode"}
                </span>
              </div>

              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
                <BadgeAlert size={16} />
                Controversial opinion incoming
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-white/90 sm:text-2xl">
                  {take}
                </p>
              </div>

              {!response && (
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleAgree}
                    className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                  >
                    Agree
                  </button>

                  <button
                    type="button"
                    onClick={handleDisagree}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition duration-300 hover:bg-white/10"
                  >
                    Disagree
                  </button>
                </div>
              )}

              {response === "agree" && (
                <div className="mt-8">
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                    <ThumbsUp size={16} />
                    Hot take supported
                  </div>
                  <p className="mt-4 text-sm text-white/70 sm:text-base">
                    {currentPlayer} agrees. Now defend it to the group 😌
                  </p>
                  {mode === "drinking" && (
                    <p className="mt-2 text-sm text-pink-300">
                      Everyone who disagrees takes a sip 🍻
                    </p>
                  )}
                </div>
              )}

              {response === "disagree" && (
                <div className="mt-8">
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                    <ThumbsDown size={16} />
                    Opposition activated
                  </div>
                  <p className="mt-4 text-sm text-white/70 sm:text-base">
                    {currentPlayer} disagrees. Time to argue your side 😏
                  </p>
                  {mode === "drinking" && (
                    <p className="mt-2 text-sm text-pink-300">
                      The player defending the unpopular take takes a sip 🍻
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={getRandomTake}
                  className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Next Take
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

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                <div className="mb-2 flex items-center justify-center gap-2 text-white/80">
                  <MessageSquare size={15} />
                  Debate Rule
                </div>
                Give your reason in one line before the group reacts.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotTakes;