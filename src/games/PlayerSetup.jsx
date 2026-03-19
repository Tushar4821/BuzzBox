import React, { useState } from "react";
import { Users, Plus, X, Sparkles } from "lucide-react";
import useGame from "./tempGame";

function PlayerSetup({ onStart }) {
  const { setPlayers } = useGame();
  const [inputs, setInputs] = useState(["", ""]);

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const addPlayer = () => {
    if (inputs.length >= 10) return;
    setInputs([...inputs, ""]);
  };

  const removePlayer = (index) => {
    if (inputs.length <= 2) return;
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    const cleaned = inputs.map((p) => p.trim()).filter(Boolean);

    if (cleaned.length < 2) {
      alert("Enter at least 2 player names");
      return;
    }

    setPlayers(cleaned);
    onStart();
  };

  return (
    <section className="relative z-20 px-4 py-8 sm:px-6">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-44 w-44 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/5 p-5 shadow-[0_0_60px_rgba(168,85,247,0.12)] backdrop-blur-2xl sm:p-8">
        {/* top badge */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-white/8 px-4 py-2 text-xs font-medium tracking-wide text-white/80 sm:text-sm">
            <Users size={16} className="text-pink-400" />
            Multiplayer Setup
          </div>
        </div>

        {/* heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build Your <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Party Squad</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Add your players and get ready for chaos, laughs, and zero excuses.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/70">
            <Sparkles size={14} className="text-yellow-300" />
            {inputs.length} / 10 players added
          </div>
        </div>

        {/* player fields */}
        <div className="mt-8 space-y-3">
          {inputs.map((player, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-pink-400/20 hover:bg-white/[0.07]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linearto-br from-pink-500/20 via-purple-500/20 to-blue-500/20 text-sm font-semibold text-white shadow-inner">
                {index + 1}
              </div>

              <input
                type="text"
                value={player}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`Enter player ${index + 1} name`}
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-300 focus:border-pink-400/40 focus:bg-black/30"
              />

              {inputs.length > 2 && (
                <button
                  type="button"
                  onClick={() => removePlayer(index)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/60 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* actions */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={addPlayer}
            disabled={inputs.length >= 10}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-pink-400/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add Player
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(168,85,247,0.45)] active:scale-[0.98]"
          >
            Continue to Game
          </button>
        </div>
      </div>
    </section>
  );
}

export default PlayerSetup;