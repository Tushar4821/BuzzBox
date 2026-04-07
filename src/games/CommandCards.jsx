import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  Heart,
  MessageCircleHeart,
  MoonStar,
  Shuffle,
  RotateCcw,
} from "lucide-react";
import { filthyCommandCardsData } from '../data/commandCardsData'; 

function CommandCards() {
  const [step, setStep] = useState("players");
  const [mode, setMode] = useState(""); // "tease", "hot", "filthy"
  const [players, setPlayers] = useState(["", ""]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]); // For "Deal 3" feature

  const currentPlayer = players[currentPlayerIndex];

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const handleStart = () => {
    const cleaned = players.map((p) => p.trim());
    if (!cleaned[0] || !cleaned[1]) {
      alert("Please enter both partner names");
      return;
    }
    setPlayers(cleaned);
    setStep("mode");
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setCurrentCard(null);
    setDrawnCards([]);
    setStep("ready");
  };

  const getRandomCard = () => {
    const source = filthyCommandCardsData[mode];
    if (!source || source.length === 0) return null;

    let randomCard;
    do {
      randomCard = source[Math.floor(Math.random() * source.length)];
    } while (drawnCards.includes(randomCard) && drawnCards.length < source.length);

    return randomCard;
  };

  const drawOneCard = () => {
    const card = getRandomCard();
    if (!card) return;

    setCurrentCard(card);
    setDrawnCards((prev) => [...prev, card]);
    setStep("card");
  };

  const drawThreeCards = () => {
    const newCards = [];
    for (let i = 0; i < 3; i++) {
      const card = getRandomCard();
      if (card) newCards.push(card);
    }
    setDrawnCards((prev) => [...prev, ...newCards]);
    setCurrentCard(newCards[0]); // Show first one
    setStep("card");
  };

  const handleNextCard = () => {
    const nextCard = getRandomCard();
    if (nextCard) {
      setCurrentCard(nextCard);
      setDrawnCards((prev) => [...prev, nextCard]);
    }
  };

  const handleNextPlayer = () => {
    setCurrentCard(null);
    setDrawnCards([]);
    setCurrentPlayerIndex((prev) => (prev === 0 ? 1 : 0));
    setStep("ready");
  };

  const handleReset = () => {
    setStep("players");
    setMode("");
    setCurrentCard(null);
    setDrawnCards([]);
    setPlayers(["", ""]);
    setCurrentPlayerIndex(0);
  };

  const getModeLabel = () => {
    if (mode === "tease") return "Tease Mode 🌸";
    if (mode === "hot") return "Hot Mode 🔥";
    if (mode === "filthy") return "Filthy Mode 😈";
    return "";
  };

  const getModeColor = () => {
    if (mode === "tease") return "pink";
    if (mode === "hot") return "rose";
    if (mode === "filthy") return "purple";
    return "pink";
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0f0a14] px-4 py-20 text-white sm:px-6 lg:px-10">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.16),transparent_30%),radial-gradient(circle_at_right,rgba(168,85,247,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            <Sparkles size={16} className="text-pink-300" />
            BuzzBox Couple Edition
          </div>

          <h1 className="bg-linear-to-r from-pink-200 via-white to-purple-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Filthy Command Cards
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Draw a card. Obey the command. Get closer... and dirtier.
          </p>
        </motion.div>

        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          {/* Players Step */}
          {step === "players" && (
            <div className="text-center">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                <Heart size={16} />
                Couple Only • 2 Players
              </div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Enter both names</h2>
              <p className="mt-3 text-sm text-white/60">This game is made for just the two of you.</p>

              <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-pink-400/15 bg-white/5 p-4 text-left">
                  <label className="mb-2 block text-sm text-white/55">Partner 1</label>
                  <input
                    type="text"
                    value={players[0]}
                    onChange={(e) => handlePlayerChange(0, e.target.value)}
                    placeholder="Enter name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-pink-400/40"
                  />
                </div>
                <div className="rounded-3xl border border-purple-400/15 bg-white/5 p-4 text-left">
                  <label className="mb-2 block text-sm text-white/55">Partner 2</label>
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
                className="mt-8 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Continue
              </button>
            </div>
          )}

          {/* Mode Selection */}
          {step === "mode" && (
            <div className="text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-200">
                  {players[0]} & {players[1]}
                </div>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">Choose your intensity</h2>
              <p className="mt-3 text-sm text-white/60">How naughty do you want to get?</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { key: "tease", label: "Tease Mode", icon: Heart, color: "pink", desc: "Playful & seductive warm-up" },
                  { key: "hot", label: "Hot Mode", icon: Flame, color: "rose", desc: "Steamy & intense" },
                  { key: "filthy", label: "Filthy Mode", icon: MessageCircleHeart, color: "purple", desc: "No limits. Pure filth 😈" },
                ].map(({ key, label, icon: Icon, color, desc }) => (
                  <button
                    key={key}
                    onClick={() => handleModeSelect(key)}
                    className={`group rounded-3xl border border-${color}-500/20 bg-linear-to-br from-${color}-500/20 to-transparent p-6 text-left transition hover:scale-[1.04] hover:border-${color}-400/40`}
                  >
                    <div className={`mb-4 inline-flex rounded-2xl bg-${color}-500/15 p-3 text-${color}-300 transition group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold">{label}</h3>
                    <p className="mt-2 text-sm text-white/65">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ready Screen */}
          {step === "ready" && (
            <div className="text-center">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
                  {currentPlayer}'s Turn
                </span>
                <span className={`rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-${getModeColor()}-300`}>
                  {getModeLabel()}
                </span>
              </div>

              <h2 className="text-3xl font-semibold">Ready to draw a dirty command?</h2>
              <p className="mt-4 text-white/60">The card will tell you exactly what to do...</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={drawOneCard}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-10 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  <Shuffle size={20} />
                  Draw One Card
                </button>

                <button
                  onClick={drawThreeCards}
                  className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
                >
                  Deal 3 Cards
                </button>
              </div>
            </div>
          )}

          {/* Card Display */}
          <AnimatePresence mode="wait">
            {step === "card" && currentCard && (
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -30 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className={`inline-flex rounded-2xl bg-${getModeColor()}-500/10 px-6 py-2 text-sm uppercase tracking-widest text-${getModeColor()}-300`}>
                    {getModeLabel()}
                  </div>
                </div>

                <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/10 p-10 backdrop-blur-xl">
                  <p className="text-xl leading-relaxed text-white sm:text-2xl">
                    {currentCard}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleNextCard}
                    className="rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Next Card
                  </button>

                  <button
                    onClick={handleNextPlayer}
                    className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
                  >
                    Next Partner's Turn
                  </button>

                  <button
                    onClick={handleReset}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white/70 hover:text-white"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                <p className="mt-6 text-xs text-white/50">
                  Perform the command together • Take turns being the giver
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default CommandCards;