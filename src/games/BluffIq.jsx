import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { bluffIQQuestions } from "../data/bluffIqData";

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function prepareQuestions() {
  return shuffleArray(bluffIQQuestions).map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

function BluffIq() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(prepareQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const progress = useMemo(() => {
    return ((currentIndex + 1) / totalQuestions) * 100;
  }, [currentIndex, totalQuestions]);

  const handleSelect = (option) => {
    if (revealed) return;
    setSelected(option);
  };

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);

    if (selected === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected("");
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setQuestions(prepareQuestions());
    setStarted(false);
    setCurrentIndex(0);
    setSelected("");
    setRevealed(false);
    setScore(0);
  };

  const isGameOver = currentIndex === totalQuestions - 1 && revealed;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
          >
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Brain className="h-10 w-10 text-fuchsia-300" />
              </div>

              <h1 className="mt-6 text-4xl font-black sm:text-6xl">Bluff IQ</h1>
              <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
                Read the options, catch the fake, and prove your brain sees through the bluff.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                    Style
                  </p>
                  <p className="mt-2 text-lg font-semibold">Mind Tricks</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                    Players
                  </p>
                  <p className="mt-2 text-lg font-semibold">2+ Players</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                    Goal
                  </p>
                  <p className="mt-2 text-lg font-semibold">Spot the Bluff</p>
                </div>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-7 py-4 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.03]"
              >
                <Sparkles className="h-5 w-5" />
                Start Bluff IQ
              </button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + "-" + revealed}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-fuchsia-200">
                    <ShieldAlert className="h-4 w-4" />
                    Bluff Detector Mode
                  </div>
                  <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                    Question {currentIndex + 1} / {totalQuestions}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                      Score
                    </p>
                    <p className="mt-1 text-lg font-bold">{score}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                      Category
                    </p>
                    <p className="mt-1 text-lg font-bold">{currentQuestion.category}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                      Difficulty
                    </p>
                    <p className="mt-1 text-lg font-bold">{currentQuestion.difficulty}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 sm:p-8">
                <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {currentQuestion.question}
                </h3>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.answer;
                    const isSelected = selected === option;

                    let stateClass =
                      "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20";

                    if (revealed && isCorrect) {
                      stateClass =
                        "border-emerald-400/50 bg-emerald-500/15 shadow-emerald-500/20";
                    } else if (revealed && isSelected && !isCorrect) {
                      stateClass =
                        "border-red-400/50 bg-red-500/15 shadow-red-500/20";
                    } else if (isSelected) {
                      stateClass =
                        "border-fuchsia-400/50 bg-fuchsia-500/15 shadow-fuchsia-500/20";
                    }

                    return (
                      <motion.button
                        key={option}
                        whileHover={revealed ? {} : { y: -4, scale: 1.01 }}
                        whileTap={revealed ? {} : { scale: 0.98 }}
                        onClick={() => handleSelect(option)}
                        className={`rounded-3xl border p-5 text-left shadow-lg transition ${stateClass}`}
                      >
                        <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/40">
                          Option {String.fromCharCode(65 + index)}
                        </p>
                        <p className="text-lg font-semibold">{option}</p>
                      </motion.button>
                    );
                  })}
                </div>

                {!revealed ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={handleReveal}
                      disabled={!selected}
                      className="rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Reveal Answer
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                          Result
                        </p>
                        <h4
                          className={`mt-2 text-2xl font-black ${
                            selected === currentQuestion.answer
                              ? "text-emerald-300"
                              : "text-red-300"
                          }`}
                        >
                          {selected === currentQuestion.answer
                            ? "Correct. You caught the bluff."
                            : "Wrong. The bluff fooled you."}
                        </h4>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                          Correct Answer
                        </p>
                        <p className="mt-1 text-lg font-bold">{currentQuestion.answer}</p>
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-7 text-white/75">
                      {currentQuestion.explanation}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {!isGameOver ? (
                        <button
                          onClick={handleNext}
                          className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02]"
                        >
                          Next Question
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleRestart}
                          className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-yellow-400 to-orange-500 px-6 py-3 font-semibold text-black shadow-lg shadow-yellow-500/20 transition hover:scale-[1.02]"
                        >
                          <Trophy className="h-5 w-5" />
                          Play Again
                        </button>
                      )}

                      <button
                        onClick={handleRestart}
                        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        <RotateCcw className="h-5 w-5" />
                        Restart
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {isGameOver && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 rounded-[28px] border border-yellow-400/20 bg-yellow-500/10 p-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-400/10">
                    <Trophy className="h-8 w-8 text-yellow-200" />
                  </div>

                  <h3 className="mt-4 text-3xl font-black">Final Score</h3>
                  <p className="mt-3 text-lg text-white/80">
                    You got <span className="font-bold text-white">{score}</span> out of{" "}
                    <span className="font-bold text-white">{totalQuestions}</span>
                  </p>

                  <p className="mt-3 text-white/65">
                    {score >= 40
                      ? "Insane bluff radar. You are dangerous."
                      : score >= 30
                      ? "Very sharp. You read through most traps."
                      : score >= 20
                      ? "Solid brain game performance."
                      : score >= 10
                      ? "Not bad, but the bluff got you often."
                      : "The bluff absolutely cooked you. Run it back."}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

export default BluffIq;