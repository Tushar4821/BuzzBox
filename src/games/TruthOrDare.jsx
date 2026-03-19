import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, GlassWater, Users, Plus, X } from "lucide-react";
import { truths, dares } from "../data/truthOrDareData";
import useGame from "./tempGame";

function TruthOrDare() {
  const {
    players,
    setPlayers,
    currentPlayer,
    mode,
    setMode,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [type, setType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [playerInputs, setPlayerInputs] = useState(["", ""]);

  const handlePlayerChange = (index, value) => {
    const updated = [...playerInputs];
    updated[index] = value;
    setPlayerInputs(updated);
  };

  const addPlayerField = () => {
    if (playerInputs.length >= 10) return;
    setPlayerInputs([...playerInputs, ""]);
  };

  const removePlayerField = (index) => {
    if (playerInputs.length <= 2) return;
    setPlayerInputs(playerInputs.filter((_, i) => i !== index));
  };

  const handleStartPlayers = () => {
    const cleanedPlayers = playerInputs
      .map((name) => name.trim())
      .filter((name) => name !== "");

    if (cleanedPlayers.length < 2) {
      alert("Enter at least 2 player names");
      return;
    }

    setPlayers(cleanedPlayers);
    setStep("mode");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setType("");
    setPrompt("");
    setStep("choice");
  };

  const getRandomPrompt = (selectedType) => {
    const source = selectedType === "truth" ? truths[mode] : dares[mode];
    if (!source || source.length === 0) {
      alert("No prompts found for this mode.");
      return;
    }

    const random = source[Math.floor(Math.random() * source.length)];
    setType(selectedType);
    setPrompt(random);
    setStep("prompt");
  };

  const handleNextPlayer = () => {
    setPrompt("");
    setType("");
    nextTurn();
    setStep("choice");
  };

  const handleEditPlayers = () => {
    setType("");
    setPrompt("");
    setMode("");
    setStep("players");
  };

  const handleReset = () => {
    setType("");
    setPrompt("");
    setPlayerInputs(["", ""]);
    setStep("players");
    resetContextGame();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-24 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 -left-25 h-72 w-72 rounded-full bg-pink-500/12 blur-3xl" />
        <div className="absolute top-32 -right-25 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
            <Sparkles size={16} className="text-pink-400" />
            BuzzBox Party Game
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Truth or Dare
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Choose your vibe, pick truth or dare, and let the chaos begin.
          </p>
        </motion.div>

        <div className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          {step === "players" && (
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                <Users size={16} className="text-pink-400" />
                Multiplayer Setup
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Who’s playing tonight?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:text-base">
                Add your group and BuzzBox will rotate turns automatically.
              </p>

              <div className="mx-auto mt-8 max-w-2xl space-y-3">
                {playerInputs.map((player, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white/70">
                      {index + 1}
                    </div>

                    <input
                      type="text"
                      value={player}
                      onChange={(e) =>
                        handlePlayerChange(index, e.target.value)
                      }
                      placeholder={`Player ${index + 1}`}
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-400/40"
                    />

                    {playerInputs.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePlayerField(index)}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/65 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={addPlayerField}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  <Plus size={16} />
                  Add Player
                </button>
              </div>

              <button
                type="button"
                onClick={handleStartPlayers}
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Continue
              </button>
            </div>
          )}

          {step === "mode" && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  <Users size={15} className="text-purple-300" />
                  {players.length} Players
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s turn starts first
                </div>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Are you drinking tonight?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Pick the mode first so the prompts match the vibe.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleModeSelect("drinking")}
                  className="group rounded-3xl border border-pink-500/20 bg-linear-to-br from-pink-500/20 via-purple-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.02] hover:border-pink-400/40"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-pink-500/20 p-3 text-pink-400 transition group-hover:scale-110">
                    <Flame size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">Yes, Drinking</h3>
                  <p className="mt-2 text-sm text-white/65">
                    Spicier truths, wilder dares, and more party chaos.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeSelect("nonDrinking")}
                  className="group rounded-3xl border border-blue-500/20 bg-linear-to-br from-blue-500/20 via-cyan-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.02] hover:border-blue-400/40"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-blue-500/20 p-3 text-blue-400 transition group-hover:scale-110">
                    <GlassWater size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">No, Not Drinking</h3>
                  <p className="mt-2 text-sm text-white/65">
                    Still fun, still bold, just without the sip-based prompts.
                  </p>
                </button>
              </div>

              <button
                type="button"
                onClick={handleEditPlayers}
                className="mt-8 text-sm text-white/55 transition hover:text-white"
              >
                Edit players
              </button>
            </div>
          )}

          {step === "choice" && (
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
                Truth or Dare?
              </h2>

              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Pick your challenge and see what BuzzBox throws at you.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => getRandomPrompt("truth")}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:scale-[1.02] hover:border-pink-400/30 hover:bg-white/10"
                >
                  <h3 className="text-2xl font-semibold text-pink-400">
                    Truth
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    Say what you really think.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => getRandomPrompt("dare")}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:scale-[1.02] hover:border-blue-400/30 hover:bg-white/10"
                >
                  <h3 className="text-2xl font-semibold text-blue-400">
                    Dare
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    Do something bold and own it.
                  </p>
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep("mode")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Change Mode
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {step === "prompt" && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Turn
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {mode === "drinking" ? "Drinking Mode" : "Non-Drinking Mode"}
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm capitalize text-pink-300">
                  {type}
                </span>
              </div>

              <div className="mx-auto max-w-2xl rounded-4xl border border-white/10 bg-linear-to-br from-white/8 to-white/4 p-6 shadow-xl backdrop-blur-xl sm:p-8">
                <p className="text-lg leading-relaxed text-white sm:text-2xl">
                  {prompt}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => getRandomPrompt(type)}
                  className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                >
                  Next {type}
                </button>

                <button
                  type="button"
                  onClick={handleNextPlayer}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Next Player
                </button>

                <button
                  type="button"
                  onClick={() => setStep("choice")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
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

export default TruthOrDare;