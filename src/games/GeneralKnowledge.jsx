import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Users,
  Brain,
  CircleHelp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { generalKnowledgeQuestions } from "../data/generalKnowledgeData";
import useGame from "./tempGame";
import PlayerSetup from "./PlayerSetup";

function GeneralKnowledge() {
  const {
    players,
    currentPlayer,
    mode,
    setMode,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const getRandomQuestion = () => {
    const source = generalKnowledgeQuestions[mode];

  

    if (!source || source.length === 0) {
    
      return;
    }

    const random = source[Math.floor(Math.random() * source.length)];
    setCurrentQuestion(random);
    setSelectedAnswer("");
    setShowResult(false);
    setStep("question");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setCurrentQuestion(null);
    setSelectedAnswer("");
    setShowResult(false);
    setStep("ready");
  };

  const handleAnswerClick = (option) => {
    if (showResult) return;
    setSelectedAnswer(option);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    getRandomQuestion();
  };

  const handleNextPlayer = () => {
    setCurrentQuestion(null);
    setSelectedAnswer("");
    setShowResult(false);
    nextTurn();
    setStep("ready");
  };

  const handleReset = () => {
    setCurrentQuestion(null);
    setSelectedAnswer("");
    setShowResult(false);
    setStep("players");
    resetContextGame();
  };

  const isCorrect = selectedAnswer === currentQuestion?.answer;

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
            General Knowledge
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Pick a mode, answer the question, and see who in the group is actually smart.
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
                Choose the kind of chaos you want first.
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
                    Wrong answers get punished. Party knowledge only.
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
                    Same fun, no drinks needed. Just vibes and embarrassment.
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
                Ready for the question?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Tap below and let {currentPlayer} prove they’ve got brains.
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

          {step === "question" && currentQuestion && (
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
                <Brain size={16} />
                Answer the question correctly
              </div>

              <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-linear-to-br from-white/8 to-white/4 p-6 shadow-xl backdrop-blur-xl sm:p-8">
                <div className="mb-4 flex items-center justify-center gap-2 text-purple-300">
                  <CircleHelp size={18} />
                  <span className="text-sm uppercase tracking-[0.2em] text-white/50">
                    Question
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-white sm:text-2xl">
                  {currentQuestion.question}
                </p>
              </div>

              <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isAnswer = currentQuestion.answer === option;

                  let buttonClass =
                    "border-white/10 bg-white/5 text-white/90 hover:bg-white/10";

                  if (showResult) {
                    if (isAnswer) {
                      buttonClass =
                        "border-green-400/30 bg-green-500/20 text-green-200";
                    } else if (isSelected && !isCorrect) {
                      buttonClass =
                        "border-red-400/30 bg-red-500/20 text-red-200";
                    } else {
                      buttonClass =
                        "border-white/10 bg-white/5 text-white/60";
                    }
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAnswerClick(option)}
                      disabled={showResult}
                      className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition duration-300 sm:text-base ${buttonClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-8">
                  <div
                    className={`mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                      isCorrect
                        ? "border border-green-500/20 bg-green-500/10 text-green-300"
                        : "border border-red-500/20 bg-red-500/10 text-red-300"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 size={16} />
                        Correct answer
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        Wrong answer
                      </>
                    )}
                  </div>

                  <p className="mt-4 text-base text-white/75">
                    {!isCorrect && (
                      <>
                        Correct answer:{" "}
                        <span className="font-semibold text-green-300">
                          {currentQuestion.answer}
                        </span>
                      </>
                    )}
                  </p>

                  {!isCorrect && mode === "drinking" && (
                    <p className="mt-3 text-sm font-medium text-pink-300">
                      Take a sip 🍻
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Next Question
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

export default GeneralKnowledge;