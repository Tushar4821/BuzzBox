import React from "react";
import { motion } from "framer-motion";
import { Cloud, Brain, Orbit, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

import chillImg from "../../../assets/highmode/chill.jpg";
import deepImg from "../../../assets/highmode/deep.jpg";
import cosmicImg from "../../../assets/highmode/cosmic.jpg";
import tranceImg from '../../../assets/highmode/trance.jpg';

function HighModeCards({ setMode, activeMode = "Chill" }) {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Chill",
      icon: <Cloud size={22} />,
      desc: "Soft prompts, light laughs, snack-energy vibes.",
      glow: "from-lime-300/25 via-emerald-300/15 to-cyan-300/20",
      border: "border-lime-300/20",
      text: "text-lime-200",
      img: chillImg,
      action: () => setMode("Chill"),
    },
    {
      title: "Deep",
      icon: <Brain size={22} />,
      desc: "Late-night thoughts, honest talks, emotional drift.",
      glow: "from-fuchsia-400/25 via-purple-400/15 to-pink-300/20",
      border: "border-fuchsia-300/20",
      text: "text-fuchsia-200",
      img: deepImg,
      action: () => setMode("Deep"),
    },
    {
      title: "Cosmic",
      icon: <Orbit size={22} />,
      desc: "Paradoxes, strange theories, mind-bending chaos.",
      glow: "from-cyan-300/25 via-blue-400/15 to-violet-400/20",
      border: "border-cyan-300/20",
      text: "text-cyan-200",
      img: cosmicImg,
      action: () => setMode("Cosmic"),
    },
    {
      title: "Trance",
      icon: <Waves size={22} />,
      desc: "Enter a separate zone with trance music and interactive activities.",
      glow: "from-violet-400/25 via-fuchsia-400/15 to-cyan-300/20",
      border: "border-violet-300/20",
      text: "text-violet-200",
      img: tranceImg,
      action: () => navigate("/trance-mode"),
    },
  ];

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Pick your
            <span className="ml-2 bg-linear-to-r from-lime-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              frequency
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            Switch the mood instantly. Chill, Deep, and Cosmic update this page.
            Trance opens a fully separate immersive zone.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => {
            const isActive = activeMode === card.title;

            return (
              <motion.button
                key={card.title}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -10, scale: 1.02, rotate: i % 2 === 0 ? 0.8 : -0.8 }}
                onClick={card.action}
                className={`group relative min-h-[340px] overflow-hidden rounded-[2rem] border p-6 text-left backdrop-blur-2xl transition duration-300 ${
                  isActive
                    ? `${card.border} bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]`
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-110 group-hover:rotate-1 saturate-150 contrast-110 hue-rotate-[10deg]"
                  />

                  <div className="absolute inset-0 bg-black/45" />

                  <div className={`absolute inset-0 bg-linear-to-br ${card.glow} opacity-80`} />

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_26%)]" />

                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:36px_36px]" />
                </div>

                <motion.div
                  animate={{
                    x: [0, 10, -8, 0],
                    y: [0, -8, 10, 0],
                    scale: [1, 1.06, 0.98, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-3xl"
                />

                <motion.div
                  animate={{
                    x: [0, -8, 8, 0],
                    y: [0, 10, -10, 0],
                    scale: [1, 0.95, 1.08, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18,
                  }}
                  className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/10 blur-3xl"
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`inline-flex rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl ${card.text}`}
                    >
                      {card.icon}
                    </div>

                    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl">
                      {card.title === "Trance" ? "portal" : "mode"}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-white sm:text-[28px]">
                      {card.title}
                    </h3>

                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-xl`}
                      >
                        {card.title === "Trance" ? "opens new zone" : "switch vibe"}
                      </span>

                      {isActive && card.title !== "Trance" && (
                        <span className="rounded-full border border-white/10 bg-white/12 px-3 py-1 text-xs font-semibold text-white">
                          active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HighModeCards;