import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Crown,
  CheckCircle2,
  RefreshCcw,
  ArrowRight,
  Lock,
  Trophy,
} from "lucide-react";
import { howWellDoYouKnowMeQuestions } from '../data/howWellDoYouKnowMeData';

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function HowWellDoYouKnowMe() {
  const [step, setStep] = useState("setup");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [secretAnswer, setSecretAnswer] = useState("");
  const [guessAnswer, setGuessAnswer] = useState("");
  const [showReveal, setShowReveal] = useState(false);

  const [round, setRound] = useState(1);
  const [asker, setAsker] = useState(1); // 1 => player1 answers, player2 guesses
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
  });

  const questions = useMemo(() => shuffleArray(howWellDoYouKnowMeQuestions), []);
  const currentQuestion = questions[questionIndex];

  const askerName = asker === 1 ? player1 : player2;
  const guesserName = asker === 1 ? player2 : player1;

  const handleStart = () => {
    if (!player1.trim() || !player2.trim()) {
      alert("Please enter both player names.");
      return;
    }

    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      alert("Enter two different names.");
      return;
    }

    setStep("secret");
  };

  const handleSaveSecret = () => {
    if (!secretAnswer.trim()) {
      alert("Enter your answer first.");
      return;
    }
    setStep("guess");
  };

  const handleReveal = () => {
    if (!guessAnswer.trim()) {
      alert("Enter your guess first.");
      return;
    }
    setShowReveal(true);
    setStep("reveal");
  };

  const handlePoint = (pointToGuesser) => {
    if (pointToGuesser) {
      if (asker === 1) {
        setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
      } else {
        setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
      }
    }

    const isLastRound = round >= 10;

    if (isLastRound) {
      setStep("result");
      return;
    }

    setRound((prev) => prev + 1);
    setAsker((prev) => (prev === 1 ? 2 : 1));
    setQuestionIndex((prev) => prev + 1);
    setSecretAnswer("");
    setGuessAnswer("");
    setShowReveal(false);
    setStep("secret");
  };

  const resetGame = () => {
    setStep("setup");
    setPlayer1("");
    setPlayer2("");
    setQuestionIndex(0);
    setSecretAnswer("");
    setGuessAnswer("");
    setShowReveal(false);
    setRound(1);
    setAsker(1);
    setScores({ player1: 0, player2: 0 });
  };

  const getWinnerText = () => {
    if (scores.player1 === scores.player2) {
      return "It’s a tie — you both know each other dangerously well 💘";
    }
    return scores.player1 > scores.player2
      ? `${player1} wins this love battle 💖`
      : `${player2} wins this love battle 💖`;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-sm text-pink-200 backdrop-blur-xl">
            <Heart size={16} className="fill-pink-400 text-pink-400" />
            Couples Only
            <Sparkles size={15} />
          </div>

          <h1 className="bg-linear-to-r from-pink-300 via-rose-200 to-violet-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            How Well Do You Know Me?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            One partner answers secretly, the other tries to guess. Cute, romantic,
            and just competitive enough for BuzzBox.
          </p>
        </motion.div>

        {/* Scoreboard */}
        {step !== "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 grid grid-cols-2 gap-4"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                {player1}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-3xl font-bold">{scores.player1}</span>
                <Heart className="text-pink-400" size={22} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                {player2}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-3xl font-bold">{scores.player2}</span>
                <Crown className="text-yellow-300" size={22} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Card */}
        <AnimatePresence mode="wait">
          {step === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="rounded-4xl border border-pink-400/15 bg-white/7 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8"
            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl">Enter your names</h2>
                <p className="mt-2 text-white/65">
                  This game is designed for 2 players only.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  placeholder="Player 1 name"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-pink-400/40"
                />
                <input
                  type="text"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  placeholder="Player 2 name"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-pink-400/40"
                />
              </div>

              <button
                onClick={handleStart}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-violet-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.01]"
              >
                Start Love Quiz
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === "secret" && (
            <motion.div
              key="secret"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="rounded-4xl border border-pink-400/15 bg-white/7 p-6 backdrop-blur-2xl sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
                  Round {round}/10
                </span>
                <span className="rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
                  {askerName} answers secretly
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-pink-200/70">
                  <Lock size={15} />
                  Secret Answer Stage
                </p>
                <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {currentQuestion}
                </h2>
              </div>

              <textarea
                rows="4"
                value={secretAnswer}
                onChange={(e) => setSecretAnswer(e.target.value)}
                placeholder={`${askerName}, type your real answer here...`}
                className="mt-5 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-pink-400/40"
              />

              <button
                onClick={handleSaveSecret}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-fuchsia-500 to-pink-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.01]"
              >
                Save Secret Answer
                <ArrowRight size={18} />
              </button>

              <p className="mt-3 text-center text-sm text-white/50">
                Make sure the other person doesn’t look 👀
              </p>
            </motion.div>
          )}

          {step === "guess" && (
            <motion.div
              key="guess"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="rounded-4xl border border-pink-400/15 bg-white/7 p-6 backdrop-blur-2xl sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
                  Round {round}/10
                </span>
                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
                  {guesserName} guesses
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-violet-200/70">
                  Guess Their Answer
                </p>
                <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {currentQuestion}
                </h2>
              </div>

              <textarea
                rows="4"
                value={guessAnswer}
                onChange={(e) => setGuessAnswer(e.target.value)}
                placeholder={`${guesserName}, what do you think the answer is?`}
                className="mt-5 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/40"
              />

              <button
                onClick={handleReveal}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-500 to-fuchsia-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.01]"
              >
                Reveal Answers
                <Sparkles size={18} />
              </button>
            </motion.div>
          )}

          {step === "reveal" && showReveal && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="rounded-4xl border border-pink-400/15 bg-white/7 p-6 backdrop-blur-2xl sm:p-8"
            >
              <div className="mb-5 text-center">
                <h2 className="text-3xl font-bold">Reveal Time 💘</h2>
                <p className="mt-2 text-white/60">
                  Decide together if the guess was close enough to earn a point.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-pink-200/70">
                    Real Answer
                  </p>
                  <p className="text-lg font-semibold">{secretAnswer}</p>
                </div>

                <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-violet-200/70">
                    Guess
                  </p>
                  <p className="text-lg font-semibold">{guessAnswer}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => handlePoint(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-green-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.01]"
                >
                  <CheckCircle2 size={18} />
                  Close Enough — Give Point
                </button>

                <button
                  onClick={() => handlePoint(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  <ArrowRight size={18} />
                  Not Close — Next Round
                </button>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="rounded-4xl border border-pink-400/15 bg-white/7 p-6 text-center backdrop-blur-2xl sm:p-8"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-violet-500 shadow-xl">
                <Trophy size={34} />
              </div>

              <h2 className="text-3xl font-bold sm:text-4xl">Game Over</h2>
              <p className="mt-3 text-lg text-pink-200">{getWinnerText()}</p>

              <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                    {player1}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold">{scores.player1}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                    {player2}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold">{scores.player2}</p>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-violet-500 px-6 py-4 font-semibold text-white transition hover:scale-[1.01]"
              >
                <RefreshCcw size={18} />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default HowWellDoYouKnowMe;