import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Users,
  TimerReset,
  Zap,
  Crown,
} from "lucide-react";
import { categoryRushQuestions } from "../data/categoryRushData";
import useGame from "./tempGame";
import PlayerSetup from "./PlayerSetup";

function CategoryRush() {
  const {
    players,
    currentPlayer,
    mode,
    setMode,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [question, setQuestion] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

  const getRandomQuestion = () => {

    const source =
      mode === "drinking"
        ? categoryRushQuestions?.drinking
        : categoryRushQuestions?.nonDrinking;

   

    if (!source || source.length === 0) {
      console.log("No questions found for mode:", mode);
      return;
    }

    const random = source[Math.floor(Math.random() * source.length)];
    console.log("random question =", random);

    setQuestion(random);
    setTimeLeft(15);
    setIsRunning(false);
    setStep("question");
  };

  const handleModeSelect = (selectedMode) => {
    console.log("selectedMode =", selectedMode);
    setMode(selectedMode);
    setQuestion("");
    setTimeLeft(15);
    setIsRunning(false);
    setStep("ready");
  };

  const handleStartTimer = () => {
    if (!question) return;
    setIsRunning(true);
  };

  const handleNextQuestion = () => {
    getRandomQuestion();
  };

  const handleNextPlayer = () => {
    setQuestion("");
    setTimeLeft(15);
    setIsRunning(false);
    nextTurn();
    setStep("ready");
  };

  const handleBack = () => {
    setIsRunning(false);
    setTimeLeft(15);
    setStep("ready");
  };

  const handleReset = () => {
    setQuestion("");
    setTimeLeft(15);
    setIsRunning(false);
    setStep("players");
    resetContextGame();
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

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
            Category Rush
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Think fast, shout faster, and survive the countdown.
          </p>
        </motion.div>

        <div className="relative z-20 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          {step === "players" && <PlayerSetup onStart={() => setStep("mode")} />}

          {step === "mode" && (
            <div className="relative z-30 text-center">
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
                Pick your rush mode
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Choose the vibe before the timer starts.
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
                    Wilder party categories with more chaos.
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
                    Fast, savage, and fun for every group.
                  </p>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep("players")}
                className="mt-8 text-sm text-white/55 transition hover:text-white"
              >
                Edit players
              </button>
            </div>
          )}

          {step === "ready" && (
            <div className="relative z-30 text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Round
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {mode === "drinking" ? "Drinking Mode" : "Non-Drinking Mode"}
                </span>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Ready to beat the clock?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                You’ll get one category and only 25 seconds to name as many as
                possible.
              </p>

              <button
                type="button"
                onClick={getRandomQuestion}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                Start Round
              </button>
            </div>
          )}

          {step === "question" && (
            <div className="relative z-30 text-center">
              <div className="mb-4 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Round
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {mode === "drinking" ? "Drinking Mode" : "Non-Drinking Mode"}
                </span>
              </div>

              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
                <Crown size={16} />
                Say as many answers as you can before time runs out
              </div>

              <div className="mx-auto max-w-2xl rounded-4xl border border-white/10 bg-linear-to-br from-white/8 to-white/4 p-6 shadow-xl backdrop-blur-xl sm:p-8">
                <p className="text-lg leading-relaxed text-white sm:text-2xl">
                  {question}
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <div
                  className={`flex h-28 w-28 items-center justify-center rounded-full border text-3xl font-bold shadow-2xl backdrop-blur-xl transition-all duration-300 sm:h-32 sm:w-32 sm:text-4xl ${
                    timeLeft <= 5
                      ? "border-red-400/40 bg-red-500/10 text-red-300 animate-pulse"
                      : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  {timeLeft}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-white/55">
                <TimerReset size={16} />
                {isRunning ? "Timer is running..." : "Click start when ready"}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {!isRunning && timeLeft === 15 && (
                  <button
                    type="button"
                    onClick={handleStartTimer}
                    className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Zap size={16} />
                      Start Timer
                    </span>
                  </button>
                )}

                {!isRunning && timeLeft === 0 && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                  >
                    Next Question
                  </button>
                )}

                {!isRunning && timeLeft > 0 && timeLeft < 25 && (
                  <button
                    type="button"
                    onClick={handleStartTimer}
                    className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                  >
                    Resume Timer
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNextPlayer}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition duration-300 hover:bg-white/10"
                >
                  Next Player
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition duration-300 hover:bg-white/10"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition duration-300 hover:bg-white/10"
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

export default CategoryRush;