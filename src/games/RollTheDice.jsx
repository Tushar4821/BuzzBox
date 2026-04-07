import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dice5,
  Sparkles,
  Shuffle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import useGame from "./tempGame";
import PlayerSetup from "./PlayerSetup";

const diceData = {
  actionDie: [
   "Kiss passionately",
    "Lick slowly in circles",
    "Suck hard and deep",
    "Nibble and gently bite",
    "Blow warm then cold air",
    "Massage firmly",
    "Stroke teasingly slow",
    "Finger or tongue deeply",
    "Spank",
    "Pinch and twist",
    "Whisper dirty talk",
    "Edge them hard"
  ],
  bodyPartDie: [
   "Neck and ears",
    "Lips and mouth",
    "Nipples",
    "Inner thighs",
    "Lower back",
    "Ass cheeks",
    "Breasts",
    "Stomach",
    "Clit / Head of cock",
    "Inside pussy / Deep throat",
    "Asshole",
    "Hair (pulling)"
  ],
  styleDie: [
    "Soft and sensual",
    "Teasing and slow",
    "Rough and dominant",
    "With eye contact",
    "While blindfolded",
    "With hands tied behind back",
    "In front of a mirror",
    "While talking dirty non-stop"
  ],
};

const rollFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function Dice3D({ title, value, accent = "pink", isRolling }) {
  const accentMap = {
    pink: {
      border: "border-pink-500/20",
      bg: "from-pink-500/20 via-pink-500/5 to-transparent",
      text: "text-pink-300",
      glow: "bg-pink-500/10",
    },
    purple: {
      border: "border-purple-500/20",
      bg: "from-purple-500/20 via-purple-500/5 to-transparent",
      text: "text-purple-300",
      glow: "bg-purple-500/10",
    },
    blue: {
      border: "border-blue-500/20",
      bg: "from-blue-500/20 via-blue-500/5 to-transparent",
      text: "text-blue-300",
      glow: "bg-blue-500/10",
    },
  };

  const styles = accentMap[accent];

  return (
    <div className="perspective">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={
          isRolling
            ? {
                rotateX: [0, 180, 360, 540],
                rotateY: [0, 120, 240, 360],
                scale: [1, 1.08, 0.96, 1],
              }
            : {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                opacity: 1,
                y: 0,
              }
        }
        transition={{
          duration: isRolling ? 1.1 : 0.35,
          ease: "easeInOut",
        }}
        className="transform-3d relative"
      >
        <div
          className={`relative min-h-50 rounded-[28px] border ${styles.border} bg-linear-to-br ${styles.bg} bg-white/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
        >
          <div
            className={`pointer-events-none absolute inset-0 rounded-[28px] opacity-60 blur-2xl ${styles.glow}`}
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium ${styles.text}`}
              >
                {title}
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <Dice5 size={18} className={styles.text} />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center py-8 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={value || `${title}-empty`}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  className="text-xl font-semibold leading-snug text-white sm:text-2xl"
                >
                  {value || "—"}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-2 opacity-70">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-full bg-white/10"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RollTheDice() {
  const {
    players,
    currentPlayer,
    nextTurn,
    resetGame: resetContextGame,
  } = useGame();

  const [step, setStep] = useState("players");
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState({
    action: "",
    body: "",
    style: "",
  });

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);

    setTimeout(() => {
      setResult({
        action: rollFrom(diceData.actionDie),
        body: rollFrom(diceData.bodyPartDie),
        style: rollFrom(diceData.styleDie),
      });
      setRolling(false);
      setStep("result");
    }, 1100);
  };

  const handleStartGame = () => {
    setStep("ready");
  };

  const handleNextPlayer = () => {
    setResult({ action: "", body: "", style: "" });
    nextTurn();
    setStep("ready");
  };

  const handleReset = () => {
    setResult({ action: "", body: "", style: "" });
    setStep("players");
    setRolling(false);
    resetContextGame();
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0b0b0f] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-24 -left-16 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.12),transparent_28%),radial-gradient(circle_at_right,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_30%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles size={16} className="text-pink-400" />
            BuzzBox Couple Game
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Roll The Dice
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            Roll three dice and let the game decide the action, body area, and vibe.
          </p>
        </motion.div>

        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          {step === "players" && (
            <PlayerSetup onStart={handleStartGame} />
          )}

          {step === "ready" && (
            <div className="text-center">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Turn
                </span>
              </div>

              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                <Shuffle size={16} />
                Three dice. One outcome.
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Dice3D title="Action Die" value="" accent="pink" isRolling={false} />
                <Dice3D title="Body Die" value="" accent="purple" isRolling={false} />
                <Dice3D title="Style Die" value="" accent="blue" isRolling={false} />
              </div>

              <button
                type="button"
                onClick={rollDice}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                <Dice5 size={20} />
                Roll Dice
              </button>
            </div>
          )}

          {(step === "result" || rolling) && (
            <div className="text-center">
              <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-300">
                  {currentPlayer}'s Turn
                </span>
              </div>

              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                <Sparkles size={16} />
                {rolling ? "Rolling the dice..." : "Here’s your combo"}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Dice3D
                  title="Action Die"
                  value={rolling ? "Rolling..." : result.action}
                  accent="pink"
                  isRolling={rolling}
                />
                <Dice3D
                  title="Body Die"
                  value={rolling ? "Rolling..." : result.body}
                  accent="purple"
                  isRolling={rolling}
                />
                <Dice3D
                  title="Style Die"
                  value={rolling ? "Rolling..." : result.style}
                  accent="blue"
                  isRolling={rolling}
                />
              </div>

              {!rolling && (
                <>
                  <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                      Final combo
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white sm:text-2xl">
                      {result.action} on {result.body} — {result.style}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      type="button"
                      onClick={rollDice}
                      className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white"
                    >
                      <Shuffle size={16} />
                      Roll Again
                    </button>

                    <button
                      type="button"
                      onClick={handleNextPlayer}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85"
                    >
                      <ArrowRight size={16} />
                      Next Player
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85"
                    >
                      <RotateCcw size={16} />
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RollTheDice;