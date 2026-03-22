import React from "react";
import { motion } from "framer-motion";
import { Droplets, Moon, Sparkles, Heart, Music4, Smile } from "lucide-react";

function HighTips() {
  const tips = [
    {
      icon: Droplets,
      title: "Stay Hydrated",
      desc: "Keep water near you. Tiny sips, good vibes, better trip.",
    },
    {
      icon: Moon,
      title: "Slow Down",
      desc: "No rush, no pressure. Sit back, breathe, and let the vibe flow.",
    },
    {
      icon: Music4,
      title: "Pick Your Sound",
      desc: "Soft beats, ambient loops, or trippy music can change everything.",
    },
    {
      icon: Smile,
      title: "Stay With Good Energy",
      desc: "Best high mode is with people, lights, and sounds that feel safe.",
    },
    {
      icon: Heart,
      title: "Be Kind To Yourself",
      desc: "You do not need to do anything big. Just enjoy the moment.",
    },
    {
      icon: Sparkles,
      title: "Protect The Vibe",
      desc: "Maybe don’t text your ex tonight. Let the universe rest.",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-sm text-pink-200 backdrop-blur-xl">
            <Sparkles size={16} />
            High Tips
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Keep The{" "}
            <span className="bg-linear-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Vibe Smooth
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Tiny reminders for a better, calmer, more fun high mode experience.
          </p>
        </motion.div>

        {/* tips grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
          {tips.map((tip, index) => {
            const Icon = tip.icon;

            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-fuchsia-500/5 to-cyan-400/10 opacity-80 transition duration-300 group-hover:opacity-100" />
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-pink-500/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-pink-200">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {tip.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* bottom quote / vibe box */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-12 overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10"
        >
          <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 via-fuchsia-500/5 to-cyan-400/10" />
          <div className="absolute left-1/4 top-0 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-lg font-semibold leading-8 text-white/90 sm:text-xl">
              “Drink water, breathe slow, enjoy the colors,
              <br className="hidden sm:block" /> and let the night be funny —
              not messy.”
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-fuchsia-200">
              <Sparkles size={16} />
              Premium high mode energy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HighTips;