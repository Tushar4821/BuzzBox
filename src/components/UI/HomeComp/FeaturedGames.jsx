import React from "react";
import { motion } from "framer-motion";
import card1 from '../../../assets/homeImg/card1.jpg'
import card2 from '../../../assets/homeImg/card2.jpg'
import card3 from '../../../assets/homeImg/card3.jpg'
import card4 from '../../../assets/homeImg/card4.jpg'
import card5 from '../../../assets/homeImg/card5.jpg'
import card6 from '../../../assets/homeImg/card6.jpg'

function FeaturedGames() {
  const games = [
    {
      title: "Never Have I Ever",
      desc: "Reveal secrets and laugh with friends.",
      img : card1,
    },
    {
      title: "Truth or Dare",
      desc: "Say it or do it. No backing out.",
      img: card2,
    },
    {
      title: "Most Likely To",
      desc: "Point fingers and expose your friends.",
      img: card3,
    },
    {
      title: "Would You Rather",
      desc: "Choose your fate and defend it.",
      img: card4,
    },
    {
      title: "Sip or Spill",
      desc: "Answer or face the consequence.",
      img: card5,
    },
    {
      title: "Rapid Fire",
      desc: "Fast questions. No thinking.",
      img: card6,
    },
  ];

  return (
    <section className="bg-[#0b0b0f] text-white py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">🎮 Featured Games</h2>
          <p className="text-gray-400 mt-3">
            Pick your vibe. Play your way.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {games.map((game, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="relative h-65 rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={`${game.img}?auto=format&fit=crop&w=800&q=80`}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition" />

              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">

                <h3 className="text-xl font-semibold mb-2">
                  {game.title}
                </h3>

                <p className="text-sm text-gray-300 mb-4">
                  {game.desc}
                </p>

                {/* Modes */}
                <div className="flex gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    Normal
                  </span>
                  <span className="text-xs px-2 py-1 bg-pink-500/30 rounded-full">
                    Drinking
                  </span>
                </div>

                <button className="text-sm font-medium">
                  Play →
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default FeaturedGames;