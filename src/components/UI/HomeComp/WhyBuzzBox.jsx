import React from "react";
import { motion } from "framer-motion";
import { Layers, GlassWater, Zap, Users } from "lucide-react";

function WhyBuzzBox() {
  const features = [
    {
      icon: <Layers size={28} />,
      title: "All Games in One Place",
      desc: "No more jumping between websites. Everything you need for a fun session is right here.",
    },
    {
      icon: <GlassWater size={28} />,
      title: "Drinking + Normal Modes",
      desc: "Whether you're drinking or not, BuzzBox adapts to your vibe instantly.",
    },
    {
      icon: <Zap size={28} />,
      title: "Instant Play",
      desc: "No setup, no rules headache. Open, pick a game, and start the fun.",
    },
    {
      icon: <Users size={28} />,
      title: "Built for Friends",
      desc: "Designed to create chaos, laughter, and unforgettable moments with your group.",
    },
  ];

  return (
    <section className="relative bg-[#0b0b0f] text-white py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-60 h-60 bg-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-400 to-blue-500">
              BuzzBox?
            </span>
          </h2>

          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Everything you need for the perfect game night — fast, fun, and built for your squad.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 hover:scale-[1.03] transition duration-300 shadow-lg"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-md">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-white/70 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyBuzzBox;