import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  GlassWater,
  Heart,
  MessageCircleHeart,
  MoonStar,
} from "lucide-react";
import { thisOrThatCouplesData } from "../data/thisOrThatCouplesData";

function ThisOrThatCouples() {
  const [step, setStep] = useState("players");
  const [mode, setMode] = useState("");
  const [players, setPlayers] = useState(["", ""]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [question, setQuestion] = useState("");

  const currentPlayer = players[currentPlayerIndex];

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const handleStart = () => {
    const cleaned = players.map((p) => p.trim());

    if (!cleaned[0] || !cleaned[1]) {
      alert("Enter both partner names");
      return;
    }

    setPlayers(cleaned);
    setStep("mode");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setQuestion("");
    setStep("ready");
  };

  const getRandomQuestion = () => {
    const source = thisOrThatCouplesData[mode];

    if (!source || source.length === 0) return;

    const random = source[Math.floor(Math.random() * source.length)];
    setQuestion(random);
    setStep("question");
  };

  const handleNextPlayer = () => {
    setQuestion("");
    setCurrentPlayerIndex((prev) => (prev === 0 ? 1 : 0));
    setStep("ready");
  };

  const handleReset = () => {
    setStep("players");
    setMode("");
    setQuestion("");
    setPlayers(["", ""]);
    setCurrentPlayerIndex(0);
  };

  const getModeLabel = () => {
    if (mode === "drinking") return "Drinking Mode";
    if (mode === "nonDrinking") return "Non Drinking";
    if (mode === "naughty") return "Naughty Mode 😈";
    return "Choose Mode";
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0f0a14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.16),transparent_30%),radial-gradient(circle_at_right,rgba(168,85,247,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            <Sparkles size={16} className="text-pink-300" />
            BuzzBox Couple Edition
          </div>

          <h1 className="bg-linear-to-r from-pink-200 via-white to-purple-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            This or That
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Pick one, explain why, and discover more about each other.
          </p>
        </motion.div>

        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          {step === "players" && (
            <div className="text-center">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                <Heart size={16} />
                Couple Only • 2 Players
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Enter both names
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                This game is made for just the two of you.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-pink-400/15 bg-white/5 p-4 text-left">
                  <label className="mb-2 block text-sm text-white/55">
                    Partner 1
                  </label>
                  <input
                    type="text"
                    value={players[0]}
                    onChange={(e) => handlePlayerChange(0, e.target.value)}
                    placeholder="Enter name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-pink-400/40"
                  />
                </div>

                <div className="rounded-3xl border border-purple-400/15 bg-white/5 p-4 text-left">
                  <label className="mb-2 block text-sm text-white/55">
                    Partner 2
                  </label>
                  <input
                    type="text"
                    value={players[1]}
                    onChange={(e) => handlePlayerChange(1, e.target.value)}
                    placeholder="Enter name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-purple-400/40"
                  />
                </div>
              </div>

              <button
                onClick={handleStart}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                Continue
              </button>
            </div>
          )}

          {step === "mode" && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-200">
                  {players[0]} & {players[1]}
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  2 Player Couple Mode
                </div>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Choose your vibe
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Pick how wild or chill you want this round to be.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => handleModeSelect("drinking")}
                  className="group rounded-3xl border border-pink-500/20 bg-linear-to-br from-pink-500/20 via-rose-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.04] hover:border-pink-400/40"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-pink-500/15 p-3 text-pink-300 transition group-hover:scale-110">
                    <Flame size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">Drinking Mode</h3>
                  <p className="mt-2 text-sm text-white/65">
                    Spicy, bold and perfect for party vibes.
                  </p>
                </button>

                <button
                  onClick={() => handleModeSelect("nonDrinking")}
                  className="group rounded-3xl border border-purple-500/20 bg-linear-to-br from-purple-500/20 via-blue-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.04] hover:border-purple-400/40"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-purple-500/15 p-3 text-purple-300 transition group-hover:scale-110">
                    <GlassWater size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">Non Drinking</h3>
                  <p className="mt-2 text-sm text-white/65">
                    Chill, romantic and meaningful choices.
                  </p>
                </button>

                <button
                  onClick={() => handleModeSelect("naughty")}
                  className="group relative overflow-hidden rounded-3xl border border-rose-500/30 bg-linear-to-br from-rose-500/25 via-pink-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.06] hover:border-rose-400/50"
                >
                  <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-pink-500/10 blur-xl" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex rounded-2xl bg-rose-500/20 p-3 text-rose-300 transition group-hover:scale-110">
                      <MessageCircleHeart size={22} />
                    </div>

                    <h3 className="text-xl font-semibold">Naughty Mode 😈</h3>

                    <p className="mt-2 text-sm text-white/65">
                      No filters. Bold, teasing & dangerously fun.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === "ready" && (
            <div className="text-center">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                  {currentPlayer}'s Turn
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {getModeLabel()}
                </span>
              </div>

              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <MoonStar size={16} className="text-purple-200" />
                Choose one, then explain why
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Ready for a couple choice?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Pick what feels more like you, then talk about it.
              </p>

              <button
                onClick={getRandomQuestion}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                Start
              </button>
            </div>
          )}

          {step === "question" && question && (
            <div className="text-center">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                  {currentPlayer}'s Turn
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {getModeLabel()}
                </span>
              </div>

              {(() => {
                const cleanedQuestion = question.replace(/\?$/, "");
                const [left, right] = cleanedQuestion.split(" or ");

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"
                  >
                    <div className="rounded-3xl border border-pink-500/20 bg-linear-to-br from-pink-500/20 to-transparent p-6 text-center transition hover:scale-[1.02]">
                      <p className="text-lg font-semibold">{left}</p>
                    </div>

                    <div className="text-center">
                      <span className="text-sm text-white/50">OR</span>
                    </div>

                    <div className="rounded-3xl border border-purple-500/20 bg-linear-to-br from-purple-500/20 to-transparent p-6 text-center transition hover:scale-[1.02]">
                      <p className="text-lg font-semibold">{right}</p>
                    </div>
                  </motion.div>
                );
              })()}

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={getRandomQuestion}
                  className="rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-3 font-semibold text-white"
                >
                  Next Question
                </button>

                <button
                  onClick={handleNextPlayer}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3"
                >
                  Next Partner
                </button>

                <button
                  onClick={handleReset}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3"
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

export default ThisOrThatCouples;