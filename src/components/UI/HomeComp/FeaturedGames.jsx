import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import card1 from "../../../assets/homeImg/card1.jpg";
import card2 from "../../../assets/homeImg/card2.jpg";
import card3 from "../../../assets/homeImg/card3.jpg";
import card4 from "../../../assets/homeImg/card4.jpg";
import card5 from "../../../assets/homeImg/card5.jpg";
import card6 from "../../../assets/homeImg/card6.jpg";

function FeaturedGames() {
  const games = [
    {
      title: "Never Have I Ever",
      desc: "Reveal secrets and laugh with friends.",
      img: card1,
      path: "/games/never-have-i-ever",
    },
    {
      title: "Truth or Dare",
      desc: "Say it or do it. No backing out.",
      img: card2,
      path: "/games/truth-or-dare",
    },
    {
      title: "Most Likely To",
      desc: "Point fingers and expose your friends.",
      img: card3,
      path: "/games/most-likely-to",
    },
    {
      title: "Would You Rather",
      desc: "Choose your fate and defend it.",
      img: card4,
      path: "/games/would-you-rather",
    },
    {
      title: "Sip or Spill",
      desc: "Answer or face the consequence.",
      img: card5,
      path: "/games/sip-or-spill",
    },
    {
      title: "Rapid Fire",
      desc: "Fast questions. No thinking.",
      img: card6,
      path: "/games/rapid-fire",
    },
  ];

  return (
    <section className="bg-[#0b0b0f] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">🎮 Featured Games</h2>
          <p className="mt-3 text-gray-400">Pick your vibe. Play your way.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-[1400px]">
          {games.map((game, index) => (
            <NavLink key={index} to={game.path} className="block">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  rotateX: 8,
                  rotateY: index % 2 === 0 ? 8 : -8,
                  scale: 1.04,
                  y: -8,
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-72 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 transform-3d"
              >
                {/* Background image */}
                <img
                  src={game.img}
                  alt={game.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/60 transition duration-300 group-hover:bg-black/45" />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />

                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-linear-to-r from-pink-500/0 via-fuchsia-500/0 to-cyan-500/0 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100 group-hover:from-pink-500/20 group-hover:via-fuchsia-500/20 group-hover:to-cyan-500/20" />

                {/* Top shine */}
                <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-white/10 opacity-0 blur-xl transition duration-700 group-hover:left-full group-hover:opacity-100" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6 transform-[translateZ(40px)]">
                  <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-pink-400" />
                    Featured Pick
                  </div>

                  <h3 className="mb-2 text-xl font-semibold tracking-wide">
                    {game.title}
                  </h3>

                  <p className="mb-4 text-sm leading-6 text-gray-300">
                    {game.desc}
                  </p>

                  <div className="mb-4 flex gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                      Normal
                    </span>
                    <span className="rounded-full bg-pink-500/25 px-3 py-1 text-xs text-pink-100 backdrop-blur-sm">
                      Drinking
                    </span>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition duration-300 group-hover:bg-white/15 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]">
                    Play Now
                    <span className="transition duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

                {/* Bottom glow line */}
                <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGames;