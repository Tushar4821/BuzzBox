import React from "react";
import { motion } from "framer-motion";
import { Wine, Smile } from "lucide-react";

function GameModes() {
  const modes = [
    {
      icon: <Wine size={30} />,
      title: "Drinking Mode",
      desc: "Turn up the chaos with bold prompts, spicy dares, and hilarious party moments made for wild nights.",
      points: ["Spicier questions", "Party-focused prompts", "More daring challenges"],
      badge: "For Party Nights",
    },
    {
      icon: <Smile size={30} />,
      title: "Normal Mode",
      desc: "Keep it fun and social with clean, friendly prompts that work for hangouts, college groups, and casual vibes.",
      points: ["Safe for everyone", "Fun without drinking", "Perfect for any group"],
      badge: "For Chill Vibes",
    },
  ];

  return (
    <section className="bg-[#0b0b0f] text-white py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">⚡ Pick Your Mode</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            BuzzBox adapts to your vibe. Go wild with drinking mode or keep it
            chill with normal mode.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111116] p-7 sm:p-8 group"
            >
              {/* glow background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10" />

              {/* top badge */}
              <div className="relative z-10 inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300 mb-5">
                {mode.badge}
              </div>

              {/* icon */}
              <div className="relative z-10 w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-pink-400 mb-5 group-hover:scale-110 transition duration-300">
                {mode.icon}
              </div>

              {/* title */}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-3">{mode.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {mode.desc}
                </p>
              </div>

              {/* points */}
              <div className="relative z-10 space-y-3 mb-7">
                {mode.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm sm:text-base text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    {point}
                  </div>
                ))}
              </div>

              {/* button */}
              <div className="relative z-10">
                <button className="px-5 py-2.5 rounded-xl bg-white text-black font-medium hover:scale-105 transition">
                  Explore {mode.title}
                </button>
              </div>

              {/* bottom gradient line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GameModes;