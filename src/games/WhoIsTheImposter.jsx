import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  Flame,
  GlassWater,
  EyeOff,
  Skull,
  ArrowRight,
  RotateCcw,
  UserCircle2,
} from "lucide-react";
import { whoIsTheImposterData } from "../data/whoIsTheImposterData";

function WhoIsTheImposter() {
  const [step, setStep] = useState("players");
  const [players, setPlayers] = useState(["", "", ""]);
  const [mode, setMode] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [secretWord, setSecretWord] = useState("");
  const [imposterIndex, setImposterIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    if (players.length >= 10) return;
    setPlayers([...players, ""]);
  };

  const removePlayer = (index) => {
    if (players.length <= 3) return;
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
  };

  const handleStart = () => {
    const cleaned = players.map((p) => p.trim()).filter(Boolean);

    if (cleaned.length < 3) {
      alert("Enter at least 3 players.");
      return;
    }

    setPlayers(cleaned);
    setStep("mode");
  };

  const handleModeSelect = (selectedMode) => {
    const source = whoIsTheImposterData[selectedMode];

    if (!source || source.length === 0) {
      alert("No words found for this mode.");
      return;
    }

    const randomWord = source[Math.floor(Math.random() * source.length)];
    const randomImposter = Math.floor(Math.random() * players.length);

    setMode(selectedMode);
    setSecretWord(randomWord);
    setImposterIndex(randomImposter);
    setCurrentPlayerIndex(0);
    setRevealed(false);
    setStep("reveal");
  };

  const handleRevealCard = () => {
    setRevealed(true);
  };

  const handleNextPlayer = () => {
    setRevealed(false);

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex((prev) => prev + 1);
    } else {
      setStep("discussion");
    }
  };

  const handleReset = () => {
    setStep("players");
    setPlayers(["", "", ""]);
    setMode("");
    setCurrentPlayerIndex(0);
    setSecretWord("");
    setImposterIndex(null);
    setRevealed(false);
  };

  const currentPlayerIsImposter = currentPlayerIndex === imposterIndex;

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-20 text-white sm:px-6 lg:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.14),transparent_28%),radial-gradient(circle_at_right,rgba(168,85,247,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_32%)]" />
        <div className="absolute -top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-24 -left-20 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            <Sparkles size={16} className="text-pink-300" />
            BuzzBox Party Game
          </div>

          <h1 className="bg-gradient-to-r from-pink-200 via-white to-purple-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Who Is The Imposter?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Everyone gets the same word… except one player. Find the fake before
            the fake survives.
          </p>
        </motion.div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          <AnimatePresence mode="wait">
            {step === "players" && (
              <motion.div
                key="players"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="text-center"
              >
                <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                  <Users size={16} />
                  3 to 10 Players
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Add your players
                </h2>

                <p className="mt-3 text-sm text-white/60 sm:text-base">
                  Minimum 3 players. One of you will secretly be the imposter.
                </p>

                <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left"
                    >
                      <label className="mb-2 block text-sm text-white/55">
                        Player {index + 1}
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={player}
                          onChange={(e) =>
                            handlePlayerChange(index, e.target.value)
                          }
                          placeholder="Enter name"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-pink-400/40"
                        />

                        {players.length > 3 && (
                          <button
                            onClick={() => removePlayer(index)}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition hover:bg-white/10"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={addPlayer}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:bg-white/10"
                  >
                    Add Player
                  </button>

                  <button
                    onClick={handleStart}
                    className="rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === "mode" && (
              <motion.div
                key="mode"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Choose your mode
                </h2>

                <p className="mt-3 text-sm text-white/60 sm:text-base">
                  Pick the vibe for your secret word list.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => handleModeSelect("drinking")}
                    className="rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.02] hover:border-pink-400/30"
                  >
                    <div className="mb-4 inline-flex rounded-2xl bg-pink-500/15 p-3 text-pink-300">
                      <Flame size={22} />
                    </div>
                    <h3 className="text-xl font-bold">Drinking Mode</h3>
                    <p className="mt-2 text-sm text-white/65">
                      Party words, chaos, flirting, nightlife, and messy vibes.
                    </p>
                  </button>

                  <button
                    onClick={() => handleModeSelect("nonDrinking")}
                    className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent p-6 text-left transition duration-300 hover:scale-[1.02] hover:border-purple-400/30"
                  >
                    <div className="mb-4 inline-flex rounded-2xl bg-purple-500/15 p-3 text-purple-300">
                      <GlassWater size={22} />
                    </div>
                    <h3 className="text-xl font-bold">Non-Drinking Mode</h3>
                    <p className="mt-2 text-sm text-white/65">
                      Fun general words for any group, anytime.
                    </p>
                  </button>
                </div>
              </motion.div>
            )}

            {step === "reveal" && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="text-center"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                  <UserCircle2 size={16} />
                  {currentPlayer}'s Turn
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Pass the phone to {currentPlayer}
                </h2>

                <p className="mt-3 text-sm text-white/60 sm:text-base">
                  Make sure no one else is looking.
                </p>

                {!revealed ? (
                  <div className="mt-8">
                    <button
                      onClick={handleRevealCard}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      <EyeOff size={18} />
                      Tap to Reveal
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mx-auto mt-8 max-w-2xl rounded-[32px] border p-8 shadow-2xl ${
                      currentPlayerIsImposter
                        ? "border-red-500/30 bg-gradient-to-br from-red-500/20 via-rose-500/10 to-transparent"
                        : "border-pink-500/25 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent"
                    }`}
                  >
                    {currentPlayerIsImposter ? (
                      <>
                        <div className="mb-4 inline-flex rounded-2xl bg-red-500/15 p-4 text-red-300">
                          <Skull size={28} />
                        </div>
                        <p className="text-sm uppercase tracking-[0.3em] text-red-200/70">
                          Secret Role
                        </p>
                        <h3 className="mt-3 text-3xl font-extrabold text-red-200">
                          You are the Imposter
                        </h3>
                        <p className="mt-3 text-white/70">
                          Blend in. Listen carefully. Don’t get caught.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="mb-4 inline-flex rounded-2xl bg-pink-500/15 p-4 text-pink-300">
                          <Sparkles size={28} />
                        </div>
                        <p className="text-sm uppercase tracking-[0.3em] text-pink-200/70">
                          Secret Word
                        </p>
                        <h3 className="mt-3 text-3xl font-extrabold">
                          {secretWord}
                        </h3>
                        <p className="mt-3 text-white/70">
                          Remember it. Act natural. Find the fake.
                        </p>
                      </>
                    )}
                  </motion.div>
                )}

                {revealed && (
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handleNextPlayer}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      {currentPlayerIndex === players.length - 1
                        ? "Start Discussion"
                        : "Next Player"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === "discussion" && (
              <motion.div
                key="discussion"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="text-center"
              >
                <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-200">
                  <Sparkles size={16} />
                  Discussion Round
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Now talk, hint, and expose the imposter
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                  Each player should describe the word vaguely without making it
                  too obvious. The imposter must fake it and survive the vote.
                </p>

                <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-pink-200">
                      Step 1
                    </p>
                    <p className="mt-2 text-white/75">
                      Everyone gives one hint.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-pink-200">
                      Step 2
                    </p>
                    <p className="mt-2 text-white/75">
                      Discuss who seems suspicious.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-pink-200">
                      Step 3
                    </p>
                    <p className="mt-2 text-white/75">
                      Vote out the imposter.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    <RotateCcw size={18} />
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default WhoIsTheImposter;