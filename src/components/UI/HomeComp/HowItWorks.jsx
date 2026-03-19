import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, ToggleLeft, PartyPopper } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Gamepad2 size={28} />,
      title: "Choose Your Game",
      desc: "Pick from party favorites like Never Have I Ever, Truth or Dare, Rapid Fire, and more.",
    },
    {
      icon: <ToggleLeft size={28} />,
      title: "Select Your Mode",
      desc: "Going wild or keeping it chill? Switch between Drinking and Normal mode anytime.",
    },
    {
      icon: <PartyPopper size={28} />,
      title: "Start the Fun",
      desc: "Play instantly with friends, laugh harder, and keep the vibe going without any setup.",
    },
  ];

  return (
    <section className="bg-[#0b0b0f] text-white py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">✨ How It Works</h2>
          <p className="text-gray-400 mt-3">
            Jump into the fun in just three simple steps.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-7 overflow-hidden group"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10" />

              {/* Step Number */}
              <div className="absolute top-4 right-4 text-5xl font-bold text-white/5 select-none">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 mb-5 group-hover:scale-110 transition duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {step.desc}
                </p>
              </div>

              {/* Bottom line glow */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;